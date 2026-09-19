import React from 'react';
import { X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-[8px] border border-[#E5E0D9] shadow-lg max-w-sm w-full overflow-hidden font-sans text-[#242424]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E0D9] bg-[#F7F5F1]">
          <h3 className="font-bold text-[16px] text-[#242424]">{title || 'Delete Saree?'}</h3>
          <button 
            onClick={onClose}
            className="text-[#77716B] hover:text-[#242424]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-[14px] text-[#77716B] leading-relaxed">
            {message || 'This action cannot be undone.'}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-[#E5E0D9] bg-[#F7F5F1]">
          <button
            onClick={onClose}
            className="btn-admin-secondary h-[38px] text-[13px] px-4"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn-admin-danger h-[38px] text-[13px] px-4"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
