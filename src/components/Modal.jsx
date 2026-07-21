import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2722]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#F4F1E8] border border-[#18352C]/30 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#18352C]/20 bg-[#DDE3D8]">
          <h2 className="text-lg font-bold font-['Playfair_Display'] text-[#1D2722]">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#18352C]/70 hover:text-[#1D2722] hover:bg-[#18352C]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-[#1D2722]">
          {children}
        </div>
      </div>
    </div>
  );
};
