import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiMapPin, FiClock } from "react-icons/fi";

const COVERAGE_DATA = {
  active: [
    { name: "Malindi", coverage: "Full", rollout: "Q3 2023" },
    { name: "Watamu", coverage: "Full", rollout: "Q4 2023" },
    { name: "Gede", coverage: "Partial", rollout: "Q1 2024" },
  ],
  planned: [
    { name: "Kakuyuni", coverage: "Planned", rollout: "Q2 2024" },
    { name: "Marereni", coverage: "Planned", rollout: "Q3 2024" },
    { name: "Mambrui", coverage: "Planned", rollout: "Q4 2024" },
  ],
};

const fuzzyMatch = (input, options) => {
  const cleanInput = input.toLowerCase().trim();
  return options
    .filter((option) => option.name.toLowerCase().includes(cleanInput))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export default function EligibilityChecker() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    if (inputValue.length > 1) {
      const matches = fuzzyMatch(inputValue, [
        ...COVERAGE_DATA.active,
        ...COVERAGE_DATA.planned,
      ]);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const checkEligibility = async () => {
    if (!inputValue.trim()) {
      setStatus({ type: "error", message: "Please enter a location" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allAreas = [...COVERAGE_DATA.active, ...COVERAGE_DATA.planned];
    const match = allAreas.find(
      (area) => area.name.toLowerCase() === inputValue.trim().toLowerCase()
    );

    if (match) {
      setSelectedArea(match);
      setStatus({
        type: match.coverage === "Planned" ? "warning" : "success",
        message:
          match.coverage === "Full"
            ? "Full coverage available!"
            : `Coverage ${match.coverage.toLowerCase()} - Estimated rollout ${
                match.rollout
              }`,
      });
    } else {
      setStatus({
        type: "error",
        message: "Location not in our service network",
      });
    }

    setIsLoading(false);
  };

  const handleSuggestionClick = (area) => {
    setInputValue(area.name);
    setSelectedArea(area);
    setSuggestions([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Coverage Checker</h2>
        <p className="text-gray-300">
          Verify your area's network availability and expansion plans
        </p>
      </div>

      <div className="relative mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter your town (e.g., Malindi)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkEligibility()}
              className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-gray-700 rounded-lg shadow-lg">
                {suggestions.map((area) => (
                  <div
                    key={area.name}
                    onClick={() => handleSuggestionClick(area)}
                    className="p-3 hover:bg-gray-600 cursor-pointer transition-colors
                             border-b border-gray-600 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-blue-400" />
                      <span className="text-white">{area.name}</span>
                      <span className="text-sm text-gray-400 ml-auto">
                        {area.coverage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={checkEligibility}
            disabled={isLoading}
            className={`px-6 py-4 rounded-lg font-medium transition-all
                      ${
                        isLoading
                          ? "bg-blue-600 opacity-75 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }
                      flex items-center gap-2`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Checking...
              </>
            ) : (
              "Check Coverage"
            )}
          </button>
        </div>
      </div>

      {status.type && (
        <div
          className={`p-4 rounded-lg border ${
            status.type === "success"
              ? "border-green-500 bg-green-500/10"
              : status.type === "warning"
              ? "border-yellow-500 bg-yellow-500/10"
              : "border-red-500 bg-red-500/10"
          }`}
        >
          <div className="flex items-center gap-3">
            {status.type === "success" ? (
              <FiCheckCircle className="text-green-500 text-xl" />
            ) : status.type === "warning" ? (
              <FiClock className="text-yellow-500 text-xl" />
            ) : (
              <FiXCircle className="text-red-500 text-xl" />
            )}
            <span className="text-white">{status.message}</span>
          </div>
        </div>
      )}

      {selectedArea && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-3">
            {selectedArea.name} Coverage Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="flex items-center gap-2">
                <FiMapPin className="text-blue-400" />
                <span>Coverage Status:</span>
              </p>
              <p className="text-white mt-1">{selectedArea.coverage}</p>
            </div>
            <div>
              <p className="flex items-center gap-2">
                <FiClock className="text-blue-400" />
                <span>Rollout Estimate:</span>
              </p>
              <p className="text-white mt-1">{selectedArea.rollout}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Service Coverage Areas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="text-green-400 font-medium mb-3">Active Coverage</h4>
            <ul className="space-y-2">
              {COVERAGE_DATA.active.map((area) => (
                <li
                  key={area.name}
                  className="flex justify-between text-gray-300"
                >
                  <span>{area.name}</span>
                  <span className="text-green-400">{area.coverage}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="text-yellow-400 font-medium mb-3">
              Planned Expansion
            </h4>
            <ul className="space-y-2">
              {COVERAGE_DATA.planned.map((area) => (
                <li
                  key={area.name}
                  className="flex justify-between text-gray-300"
                >
                  <span>{area.name}</span>
                  <span className="text-yellow-400">{area.coverage}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
