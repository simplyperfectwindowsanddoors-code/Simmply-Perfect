/** Read-only source audit. No application files or SEO assets are generated. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
function walk(directory) {
  return fs.readdirSync(path.join(root, directory), { withFileTypes: true })
    .flatMap((entry) => {
      const file = `${directory}/${entry.name}`;
      return entry.isDirectory() ? walk(file) : [file];
    });
}
if (process.argv.slice(2).some((arg) => arg !== "--check" && arg !== "--audit")) {
  console.error("Use npm run seo. This audit has no write or fix mode.");
  process.exitCode = 1;
} else {
  const sourceFiles = [...walk("app"), ...walk("components"), ...walk("lib"), ...walk("data")]
    .filter((file) => /\.[jt]sx?$/.test(file));
  const pages = sourceFiles.filter((file) => /\/page\.[jt]sx?$/.test(file));
  const routeFor = (file) => file.replace(/^app/, "").replace(/\/page\.[jt]sx?$/, "") || "/";
  const findings = [];
  const clients = [];
  const images = [];
  const links = new Set();
  const externalResources = [];
  for (const file of sourceFiles) {
    const text = read(file);
    const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    if (/^["']use client["']/.test(text)) clients.push(file);
    function visit(node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = node.tagName.getText(ast);
        const attrs = node.attributes.properties.filter(ts.isJsxAttribute);
        const attr = (name) => attrs.find((item) => item.name.getText(ast) === name);
        const literal = (name) => {
          const value = attr(name)?.initializer;
          return value && ts.isStringLiteral(value) ? value.text : undefined;
        };
        const line = ast.getLineAndCharacterOfPosition(node.getStart()).line + 1;
        if (tag === "img" || tag === "Image") {
          images.push({ file, line, tag, src: literal("src") ?? "dynamic" });
          if (!attr("alt")) findings.push(`${file}:${line}: image missing alt`);
        }
        if (["iframe", "script", "Script", "video"].includes(tag)) {
          const src = literal("src");
          if (src?.startsWith("https://")) externalResources.push({ file, line, tag, src });
        }
        const href = literal("href");
        if (href?.startsWith("/")) links.add(href);
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
  const metadata = pages.map((file) => {
    const layout = file.replace(/page\.[jt]sx?$/, "layout.tsx");
    const text = (fs.existsSync(path.join(root, layout)) ? read(layout) : "") + read(file);
    const route = routeFor(file);
    if (!/export const metadata|export (?:async )?function generateMetadata/.test(text)) {
      findings.push(`${route}: no page/layout metadata export detected`);
    }
    return { route, title: text.match(/title:\s*"([^"]+)"/)?.[1] ?? "dynamic/inherited" };
  });
  const titles = new Set();
  for (const page of metadata) {
    if (titles.has(page.title)) findings.push(`Duplicate source title: ${page.title}`);
    titles.add(page.title);
  }
  const routes = new Set(pages.map(routeFor));
  for (const href of links) {
    const pathname = href.split(/[?#]/)[0] || "/";
    if (!routes.has(pathname) && !fs.existsSync(path.join(root, "public", decodeURIComponent(pathname)))) {
      findings.push(`Unresolved literal internal link: ${href}`);
    }
  }
  const assets = walk("public").map((file) => ({ file, bytes: fs.statSync(path.join(root, file)).size }));
  const largeImages = assets.filter(({ file, bytes }) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file) && bytes > 500_000)
    .sort((a, b) => b.bytes - a.bytes);
  for (const file of ["app/robots.ts", "app/sitemap.ts", "app/llms.txt/route.ts"]) {
    if (!fs.existsSync(path.join(root, file))) findings.push(`Missing resource: ${file}`);
  }
  console.log(JSON.stringify({
    mode: "read-only",
    note: "Source heuristics; dynamic links/attributes need rendered validation. Source size is not browser payload or Core Web Vitals.",
    metadata,
    metadataBase: /metadataBase:/.test(read("app/layout.tsx")),
    canonicalHelper: /canonical:/.test(read("lib/seo.ts")),
    structuredDataFiles: sourceFiles.filter((file) => /application\/ld\+json/.test(read(file))),
    robots: read("app/robots.ts"),
    publicAssetCount: assets.length,
    publicAssetBytes: assets.reduce((total, asset) => total + asset.bytes, 0),
    largeImages,
    clientComponents: clients,
    imageCount: images.length,
    rawImageCount: images.filter((img) => img.tag === "img").length,
    externalResources,
    fontFiles: sourceFiles.filter((file) => /next\/font|fonts\.google/.test(read(file))),
    findings,
  }, null, 2));
  if (findings.length) process.exitCode = 1;
}
