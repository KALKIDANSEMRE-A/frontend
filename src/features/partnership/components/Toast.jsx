import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': 
        return <CheckCircle className="h-5 w-5 text-white" />;
      case 'error': 
        return <AlertCircle className="h-5 w-5 text-white" />;
      case 'info': 
        return <Info className="h-5 w-5 text-white" />;
      default: 
        return <CheckCircle className="h-5 w-5 text-white" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg text-white
        transform transition-all duration-300 ${getBackgroundColor()}
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <div className="mr-3">
        {getIcon()}
      </div>
      <div className="flex-1">
        {message}
      </div>
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(), 300);
        }}
        className="ml-3 p-1 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};

export default Toast;