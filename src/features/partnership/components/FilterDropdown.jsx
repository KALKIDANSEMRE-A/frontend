import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const FilterDropdown = ({ 
  label, 
  options, 
  selectedOptions = [], 
  onChange, 
  buttonClassName = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionClick = (option) => {
    let newSelection;
    if (selectedOptions.includes(option)) {
      newSelection = selectedOptions.filter(item => item !== option);
    } else {
      newSelection = [...selectedOptions, option];
    }
    onChange(newSelection);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all 
          ${selectedOptions.length > 0 
            ? 'bg-[#004165] text-white' 
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} 
          ${buttonClassName}`}
      >
        {label}
        {selectedOptions.length > 0 && (
          <span className="flex items-center justify-center bg-white text-[#004165] rounded-full w-5 h-5 text-xs">
            {selectedOptions.length}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg border border-gray-200 animate-fadeIn">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{option}</span>
                {selectedOptions.includes(option) && (
                  <Check className="h-4 w-4 text-[#004165]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;