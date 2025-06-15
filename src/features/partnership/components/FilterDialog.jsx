import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const FilterDialog = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!isOpen) return null;

  const filterSections = [
    {
      title: "Partner Type",
      key: "types",
      description: "Filter partnerships by their organizational type",
      options: [
        "Research",
        "Community",
        "Government",
        "Corporate",
        "Non-profit",
      ],
    },
    {
      title: "Status",
      key: "statuses",
      description: "Filter by current partnership status",
      options: ["active", "expired", "pending"],
    },
    {
      title: "Duration",
      key: "durations",
      description: "Filter by partnership duration",
      options: ["Less than 1 year", "1-2 years", "More than 2 years"],
    },
  ];

  const handleOptionClick = (key, option) => {
    const currentOptions = filters[key];
    const newOptions = currentOptions.includes(option)
      ? currentOptions.filter((item) => item !== option)
      : [...currentOptions, option];

    onFilterChange({
      ...filters,
      [key]: newOptions,
    });
  };

  const toggleSection = (key) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  const getActiveFilterCount = (key) => {
    return filters[key].length;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Filter Partners
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Refine your partnership view
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {filterSections.map((section) => (
              <div
                key={section.key}
                className="border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {section.title}
                      </span>
                      {getActiveFilterCount(section.key) > 0 && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-[#004165] text-white rounded-full">
                          {getActiveFilterCount(section.key)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {section.description}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-800 transition-transform ${
                      expandedSection === section.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedSection === section.key && (
                  <div className="border-t p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2">
                      {section.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(section.key, option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                            ${
                              filters[section.key].includes(option)
                                ? "bg-[#004165] text-white shadow-md"
                                : "bg-white hover:bg-gray-100 text-gray-700 border"
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium bg-[#004165] text-white rounded-lg hover:bg-[#00334e] transition-colors shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;
