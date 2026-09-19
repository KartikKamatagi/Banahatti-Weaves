import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-[#E5E1DB] max-w-md w-full overflow-hidden font-sans text-[#242424]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E1DB] bg-[#F7F6F3]">
          <div className="flex items-center gap-2.5 text-[#B84A4A]">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-semibold text-base text-[#242424]">{title || 'Confirm Delete'}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[#77716B] hover:text-[#242424] p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-2">
          <p className="text-sm text-[#242424] leading-relaxed">
            {message || 'Are you sure you want to delete this record?'}
          </p>
          <p className="text-xs text-[#B84A4A] font-medium bg-[#B84A4A]/10 p-2.5 rounded-lg border border-[#B84A4A]/20">
            ⚠️ This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E5E1DB] bg-[#F7F6F3]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#77716B] bg-white border border-[#E5E1DB] rounded-lg hover:bg-[#E5E1DB]/40 transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#B84A4A] rounded-lg hover:bg-[#9E3B3B] transition-colors shadow-xs cursor-pointer"
          >
            DELETE
          </button>
        </div>

      </div>
    </div>
  );
}
