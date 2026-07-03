"use client";

import CountUp from "react-countup";

const stats = [
  { value: 3000, suffix: "+", label: "Projects" },
  { value: 8, suffix: "+ years", label: "Years Experience" },
  { value: 99.12, suffix: "%", label: "Client Satisfaction", decimals: 2 },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function StatsCounter() {
  return (
    <section className="py-24 bg-[#0A2E6F]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 text-center">
          {stats.map((item) => (
            <div key={item.label}>
              <h2 className="text-6xl font-black text-white">
                <CountUp
                  end={item.value}
                  duration={3}
                  decimals={item.decimals ?? 0}
                />
                {item.suffix}
              </h2>

              <p className="text-white/70 mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
