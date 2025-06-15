import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const TableHeader = ({ columns, sortConfig, onSort }) => {
  const getNextSortDirection = (columnName) => {
    if (sortConfig?.column !== columnName) return "asc";
    return sortConfig.direction === "asc" ? "desc" : "asc";
  };

  const getSortIcon = (columnName) => {
    if (sortConfig?.column !== columnName) return null;

    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
    ) : (
      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
    );
  };

  const getColumnWidth = (key) => {
    switch (key) {
      case "logo":
        return "w-12 sm:w-16 md:w-20"; // Responsive width for logo
      case "name":
        return "w-28 sm:w-40 md:w-48 lg:w-64"; // Responsive width for name
      case "type":
        return "w-20 sm:w-28 md:w-32"; // Responsive width for type
      case "duration":
        return "w-20 sm:w-28 md:w-32"; // Responsive width for duration
      case "contact":
        return "w-24 sm:w-32 md:w-40"; // Responsive width for contact
      case "status":
        return "w-20 sm:w-28 md:w-32"; // Responsive width for status
      case "actions":
        return "w-22 sm:w-30 md:w-37"; // Responsive width for actions
      default:
        return "w-auto";
    }
  };

  const getColumnLabel = (column) => {
    // For mobile screens, show shorter labels
    if (column.key === "name") return "NAME";
    if (column.key === "type") return "TYPE";
    if (column.key === "duration") return "DURATION";
    if (column.key === "contact") return "CONTACT";
    if (column.key === "status") return "STATUS";
    if (column.key === "actions") return "ACTIONS";
    return column.label;
  };

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-4 p-2 sm:p-3 md:p-4 border-b-0.5 text-gray-600 font-medium shadow-md text-[10px] xs:text-xs sm:text-sm">
      {columns.map((column) => {
        const widthClass = getColumnWidth(column.key);
        const isSortable = column.key !== "logo" && column.key !== "actions";

        return (
          <div
            key={column.key}
            className={`${widthClass} flex items-center ${
              column.key === "logo"
                ? "justify-center"
                : column.key === "actions"
                ? "justify-end"
                : ""
            } gap-0.5 sm:gap-1 ${
              isSortable ? "cursor-pointer hover:text-[#004165]" : ""
            } transition-colors ${
              sortConfig?.column === column.key ? "text-[#004165]" : ""
            }`}
            onClick={() =>
              isSortable && onSort(column.key, getNextSortDirection(column.key))
            }
          >
            <span className="truncate font-semibold">
              {getColumnLabel(column)}
            </span>
            {isSortable && getSortIcon(column.key)}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
