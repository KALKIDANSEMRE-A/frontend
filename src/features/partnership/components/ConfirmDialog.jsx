import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  title, 
  message, 
  confirmLabel = "Confirm", 
  cancelLabel = "Cancel",
  confirmButtonStyle = "bg-red-600 hover:bg-red-700",
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onCancel}
      ></div>
      
      <div className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all animate-fadeIn">
        <div className="flex items-center mb-4">
          <div className="mr-3 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        
        <div className="mt-2 mb-6">
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${confirmButtonStyle}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;