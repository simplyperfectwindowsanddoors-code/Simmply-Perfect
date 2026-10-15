import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdtemp, mkdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import nodemailer from "nodemailer";
import { PDFDocument } from "pdf-lib";

const require = createRequire(import.meta.url);
const nextPluginRequire = createRequire(require.resolve("@next/eslint-plugin-next"));
const { globSync } = nextPluginRequire("fast-glob");
const { getRootDirs } = nextPluginRequire("./utils/get-root-dirs.js");

// Next resolves these as filesystem directories; relative paths/trailing slashes are equivalent.
const resolveDirectories = (directories) => directories.map((directory) => path.resolve(directory)).sort();

test("the replacement glob engine preserves Next.js lint root discovery", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "simmply-glob-"));
  try {
    await mkdir(path.join(directory, "apps", "website"), { recursive: true });
    await mkdir(path.join(directory, "apps", "portal"));
    const expected = [path.join(directory, "apps", "portal"), path.join(directory, "apps", "website")];
    assert.deepEqual(resolveDirectories(globSync(`${directory}/apps/*`, { onlyDirectories: true })), expected);
    assert.deepEqual(getRootDirs({ cwd: directory, settings: {} }), [directory]);
    assert.deepEqual(resolveDirectories(getRootDirs({ cwd: directory, settings: { next: { rootDir: `${directory}/apps/*` } } })), expected);
    assert.deepEqual(resolveDirectories(getRootDirs({ cwd: directory, settings: { next: { rootDir: expected } } })), expected);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("the patched mailer preserves recipients, HTML and PDF attachments without SMTP", async () => {
  const document = await PDFDocument.create();
  document.addPage();
  const pdf = Buffer.from(await document.save());
  const transport = nodemailer.createTransport({ jsonTransport: true });
  try {
    const result = await transport.sendMail({
      from: { name: "Verification", address: "sender@example.com" },
      to: [{ name: "Customer", address: "customer@example.com" }],
      cc: "team@example.com",
      replyTo: "reply@example.com",
      subject: "Service booking verification",
      text: "Verification message",
      html: "<p>Verification message</p>",
      attachments: [{ filename: "booking.pdf", content: pdf, contentType: "application/pdf" }],
    });
    assert.deepEqual(result.envelope.to, ["customer@example.com", "team@example.com"]);
    const message = JSON.parse(result.message);
    assert.equal(message.subject, "Service booking verification");
    assert.equal(message.html, "<p>Verification message</p>");
    assert.equal(message.replyTo[0].address, "reply@example.com");
    assert.equal(message.attachments[0].filename, "booking.pdf");
    assert.equal(message.attachments[0].contentType, "application/pdf");
    assert.deepEqual(Buffer.from(message.attachments[0].content, "base64"), pdf);
  } finally {
    transport.close();
  }
});
