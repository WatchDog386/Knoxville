import React from "react";
import { motion } from "framer-motion";
import { Zap, CheckCircle } from "lucide-react";

const PriceCard = ({ plan, isPopular }) => (
  <motion.div
    className={`p-8 rounded-xl border-2 ${
      isPopular ? "border-blue-600 bg-blue-50" : "border-gray-200"
    } transition-all`}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center gap-2 mb-6">
      <Zap className="w-6 h-6 text-blue-600" />
      <h3 className="text-2xl font-bold">{plan.speed}</h3>
      {isPopular && (
        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
          Most Popular
        </span>
      )}
    </div>

    <div className="mb-6">
      <span className="text-4xl font-bold">${plan.price}</span>
      <span className="text-gray-600">/month</span>
    </div>

    <ul className="space-y-4 mb-8">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>

    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      Select Plan
    </button>
  </motion.div>
);

export default PriceCard;
