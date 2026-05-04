import React from "react";
import Hero from "./Hero"; // your improved component

const testimonials = [
  {
    name: "Sarah M.",
    feedback:
      "Incredible speeds! Setup was seamless, and now my whole smart home just works flawlessly.",
    location: "Knoxville, TN",
  },
  {
    name: "James W.",
    feedback:
      "Best internet provider I’ve ever had. No downtime, and gaming latency is near zero.",
    location: "Farragut, TN",
  },
];

const plans = [
  {
    title: "Starter",
    price: "$49/mo",
    speed: "Up to 300Mbps",
    features: ["Basic support", "Good for browsing", "No contracts"],
  },
  {
    title: "Pro",
    price: "$79/mo",
    speed: "Up to 1Gbps",
    features: ["Priority support", "Streaming & gaming", "Free router"],
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "$129/mo",
    speed: "Up to 2Gbps",
    features: ["24/7 monitoring", "Static IP", "Business SLA"],
  },
];

const LandingPage = () => {
  return (
    <main className="bg-black text-white font-sans">
      <Hero />

      {/* Features */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-900">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Ultra-Fast Speeds",
              desc: "Stream, game, and work with no buffering.",
            },
            {
              title: "Reliable Uptime",
              desc: "We guarantee 99.9% service uptime for homes and businesses.",
            },
            {
              title: "Smart Home Ready",
              desc: "Optimized for your smart lights, cameras, and assistants.",
            },
            {
              title: "No Data Caps",
              desc: "Unlimited bandwidth with zero throttling.",
            },
            {
              title: "Free Installation",
              desc: "We handle everything—no setup fees.",
            },
            {
              title: "24/7 Support",
              desc: "We're available anytime, anywhere.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">{feat.title}</h3>
              <p className="text-gray-300">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-4xl font-bold mb-12 text-center">Simple Pricing</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`w-full sm:w-[300px] p-6 rounded-xl border ${
                plan.highlight
                  ? "bg-blue-800/20 border-blue-500"
                  : "border-white/10 bg-white/5"
              } shadow-lg hover:scale-105 transition-all`}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-2">{plan.title}</h3>
              <p className="text-xl mb-4 text-white">{plan.price}</p>
              <p className="text-sm mb-4 text-gray-300">{plan.speed}</p>
              <ul className="text-gray-200 space-y-2 text-sm mb-6">
                {plan.features.map((f, idx) => (
                  <li key={idx}>✔ {f}</li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-800">
        <h2 className="text-4xl font-bold mb-12 text-center">Customer Reviews</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-6 rounded-xl max-w-sm text-left shadow-md"
            >
              <p className="text-gray-100 italic mb-4">“{t.feedback}”</p>
              <div className="text-blue-300 font-semibold">{t.name}</div>
              <div className="text-sm text-gray-400">{t.location}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Coverage */}
      <section className="py-20 text-center bg-gradient-to-t from-black to-gray-900 px-6">
        <h2 className="text-4xl font-bold mb-6">
          See If We Cover Your Area
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          Enter your zip code and check if Knoxville Technologies is available in your neighborhood.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition">
          Check Coverage
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 text-center text-gray-500 text-sm border-t border-gray-700">
        &copy; {new Date().getFullYear()} Knoxville Technologies. All rights reserved.
      </footer>
    </main>
  );
};

export default LandingPage;
