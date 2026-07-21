import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, amount, subtext, icon: Icon, trendPercentage, isPositive, accentColor = '#18352C' }) => {
  return (
    <div className="bg-[#DDE3D8] hover:bg-[#DDE3D8]/90 p-6 rounded-2xl border border-[#18352C]/20 shadow-cream flex flex-col justify-between relative overflow-hidden group transition-all duration-200">
      {/* Background Subtle Gradient Glow */}
      <div 
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity"
        style={{ backgroundColor: accentColor }}
      />

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider text-[#18352C]/80 uppercase">{title}</span>
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#18352C]/20 bg-[#F4F1E8] text-[#18352C] group-hover:border-[#B69A6A] transition-colors"
          >
            {Icon && <Icon className="w-5 h-5 text-[#18352C]" />}
          </div>
        </div>

        <h3 className="text-2xl lg:text-3xl font-bold font-['Cinzel'] text-[#1D2722] tracking-tight">
          {amount}
        </h3>
      </div>

      <div className="mt-4 pt-3 border-t border-[#18352C]/15 flex items-center justify-between text-xs">
        <span className="text-[#18352C]/70">{subtext || 'vs last month'}</span>
        {trendPercentage !== undefined && (
          <div className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-800' : 'text-amber-900'}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{trendPercentage}%</span>
          </div>
        )}
      </div>
    </div>
  );
};
