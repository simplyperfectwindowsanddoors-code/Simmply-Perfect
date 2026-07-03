export default function Stats() {

  const stats = [

    { value: "3000+", label: "Projects Delivered" },

    { value: "8+", suffix: "Years", label: "Industry Experience" },

    { value: "99.12%", label: "Client Satisfaction" },

    { value: "4", suffix: "+", label: "Business Divisions" },

  ];

  return (

    <section className="bg-[#F8FAFC] py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="overflow-hidden rounded-[32px] bg-white border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200">

            {stats.map((item) => (

              <div

                key={item.label}

                className="

                  group

                  relative

                  px-8

                  py-12

                  flex

                  flex-col

                  items-center

                  justify-center

                  text-center

                  transition-all

                  duration-500

                  hover:bg-gradient-to-br

                  hover:from-[#0A2E6F]

                  hover:to-[#123C8F]

                "

              >

                {/* Decorative Glow */}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">

                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-3xl" />

                </div>

                <div className="relative z-10">

                  <h3 className="text-5xl lg:text-6xl font-black tracking-tight text-[#0A2E6F] group-hover:text-white transition-colors duration-300">

                    {item.value}

                    {item.suffix && (

                      <span className="text-3xl ml-1">

                        {item.suffix}

                      </span>

                    )}

                  </h3>

                  <div className="w-14 h-1 rounded-full bg-[#0A2E6F] mx-auto mt-5 group-hover:bg-white transition-colors duration-300" />

                  <p className="mt-5 text-sm lg:text-base uppercase tracking-[0.18em] font-semibold text-slate-500 group-hover:text-blue-100 transition-colors duration-300">

                    {item.label}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}