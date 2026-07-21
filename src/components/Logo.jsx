import React from 'react';

export const Logo = ({ size = 'md', variant = 'full', className = '', darkText = false }) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  };

  const svgSizes = {
    sm: 'w-4 h-4',
    md: 'w-5.5 h-5.5',
    lg: 'w-7 h-7',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Emblem */}
      <div className={`${iconSizeClasses[size]} bg-gradient-to-br from-[#18352C] via-[#21473B] to-[#0F241C] border border-[#B69A6A]/40 flex items-center justify-center shadow-lg shadow-[#18352C]/15 relative group overflow-hidden shrink-0`}>
        {/* Subtle shine highlight */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#B69A6A]/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
        
        {/* Custom Stylized Shield & V-Vault Emblem */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className={`${svgSizes[size]} text-[#B69A6A] relative z-10 transition-transform group-hover:scale-110 duration-300`}
        >
          {/* Outer Shield/Vault outline */}
          <path 
            d="M12 2L4 5V11.5C4 16.5 7.5 20.8 12 22C16.5 20.8 20 16.5 20 11.5V5L12 2Z" 
            stroke="currentColor" 
            strokeWidth="1.8" 
            strokeLinejoin="round"
            fill="url(#logoGlow)"
            fillOpacity="0.15"
          />
          {/* Inner Golden V emblem */}
          <path 
            d="M7.5 8.5L12 15L16.5 8.5" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Central Security Node / Diamond */}
          <circle cx="12" cy="18" r="1.2" fill="currentColor" />

          <defs>
            <linearGradient id="logoGlow" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B69A6A" />
              <stop offset="1" stopColor="#18352C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Name & Subtitle */}
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className={`font-['Cinzel'] font-bold ${textSizeClasses[size]} tracking-wider ${darkText ? 'text-[#18352C]' : 'text-[#F4F1E8]'}`}>
            V.SAVE
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-[#8A6A4A] mt-0.5 block">
            Financial Vault
          </span>
        </div>
      )}
    </div>
  );
};
