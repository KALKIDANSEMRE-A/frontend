/**
 * Filter partners based on search query
 * @param {Array} partners - List of partners
 * @param {string} searchQuery - Search query string
 * @returns {Array} - Filtered partners
 */
export const filterBySearch = (partners, searchQuery) => {
    if (!searchQuery.trim()) return partners;
    
    const query = searchQuery.toLowerCase().trim();
    return partners.filter(partner => 
      partner.name.toLowerCase().includes(query) ||
      partner.type.toLowerCase().includes(query) ||
      partner.contact.toLowerCase().includes(query) ||
      partner.status.toLowerCase().includes(query)
    );
  };
  
  /**
   * Filter partners based on multiple criteria
   * @param {Array} partners - List of partners
   * @param {Object} filters - Filter criteria
   * @returns {Array} - Filtered partners
   */
  export const applyFilters = (partners, filters) => {
    return partners.filter(partner => {
      // Filter by partner types
      if (filters.types.length > 0 && !filters.types.includes(partner.type)) {
        return false;
      }
      
      // Filter by status
      if (filters.statuses.length > 0 && !filters.statuses.includes(partner.status)) {
        return false;
      }
      
      // Filter by duration type
      if (filters.durations.length > 0) {
        const durationMatch = filters.durations.some(duration => {
          if (duration === 'Less than 1 year') {
            return getDurationInMonths(partner.duration) < 12;
          } else if (duration === '1-2 years') {
            const months = getDurationInMonths(partner.duration);
            return months >= 12 && months <= 24;
          } else if (duration === 'More than 2 years') {
            return getDurationInMonths(partner.duration) > 24;
          }
          return false;
        });
        
        if (!durationMatch) return false;
      }
      
      return true;
    });
  };
  
  /**
   * Sort partners by a specific column
   * @param {Array} partners - List of partners
   * @param {string} column - Column to sort by
   * @param {string} direction - Sort direction ('asc' or 'desc')
   * @returns {Array} - Sorted partners
   */
  export const sortPartners = (partners, column, direction) => {
    const sortedPartners = [...partners];
    
    sortedPartners.sort((a, b) => {
      let valueA, valueB;
      
      // Special handling for duration
      if (column === 'duration') {
        valueA = getDurationInMonths(a.duration);
        valueB = getDurationInMonths(b.duration);
      } else {
        valueA = a[column] ? String(a[column]).toLowerCase() : '';
        valueB = b[column] ? String(b[column]).toLowerCase() : '';
      }
      
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sortedPartners;
  };
  
  /**
   * Get pagination slice of partners
   * @param {Array} partners - List of partners
   * @param {number} page - Current page number
   * @param {number} itemsPerPage - Items per page
   * @returns {Array} - Paginated partners
   */
  export const paginatePartners = (partners, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    return partners.slice(startIndex, startIndex + itemsPerPage);
  };
  
  /**
   * Parse duration string to number of months
   * @param {string} duration - Duration string (e.g., "1 year", "5 Months")
   * @returns {number} - Duration in months
   */
  export const getDurationInMonths = (duration) => {
    const str = duration.toLowerCase();
    const value = parseFloat(str.match(/[\d.]+/)[0]);
    
    if (str.includes('year')) {
      return value * 12;
    } else if (str.includes('month')) {
      return value;
    } else {
      return 0;
    }
  };
  
  /**
   * Extracts unique values for a specific field from partners array
   * @param {Array} partners - List of partners
   * @param {string} field - Field name to extract values from
   * @returns {Array} - Array of unique values
   */
  export const getUniqueValues = (partners, field) => {
    const values = partners.map(partner => partner[field]);
    return [...new Set(values)];
  };
  
  /**
   * Save filter state to localStorage
   * @param {Object} filterState - Current filter state
   */
  export const saveFilterState = (filterState) => {
    try {
      localStorage.setItem('partnershipFilters', JSON.stringify(filterState));
    } catch (error) {
      console.error('Failed to save filter state:', error);
    }
  };
  
  /**
   * Load filter state from localStorage
   * @returns {Object|null} - Saved filter state or null
   */
  export const loadFilterState = () => {
    try {
      const savedState = localStorage.getItem('partnershipFilters');
      return savedState ? JSON.parse(savedState) : null;
    } catch (error) {
      console.error('Failed to load filter state:', error);
      return null;
    }
  };