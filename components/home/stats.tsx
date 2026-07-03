export default function Stats() {
  const stats = [
    { value: "3000+", label: "Projects Completed" },
    { value: "8+ years", label: "Years Experience" },
    { value: "99.12%", label: "Client Satisfaction" },
    { value: "4", label: "Business Divisions" },
  ];

  return (
    <section className="bg-[#0A2E6F] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 text-center">
          {stats.map((item) => (
            <div key={item.label}>
              <h3 className="text-5xl font-bold text-white">
                {item.value}
              </h3>

              <p className="text-gray-300 mt-3">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
