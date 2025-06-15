import React from 'react';

const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button 
      className={`rounded-full text-xs px-4 py-1 h-8 transition-all duration-200 
        ${isActive 
          ? 'bg-white text-[#004165] font-medium shadow-sm' 
          : 'text-white hover:bg-white/20'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FilterButton;