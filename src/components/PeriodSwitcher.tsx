
import React from 'react';

type Period = 'day' | 'week' | 'month' | 'year';

interface PeriodSwitcherProps {
  activePeriod: Period;
  onPeriodChange: (period: Period) => void;
  currentDate: Date;
  onDateChange: (direction: 'prev' | 'next') => void;
}

const PeriodSwitcher: React.FC<PeriodSwitcherProps> = ({ 
  activePeriod, 
  onPeriodChange,
  currentDate,
  onDateChange
}) => {
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {};
    
    switch (activePeriod) {
      case 'day':
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        break;
      case 'week':
        return `${new Intl.DateTimeFormat('en-US', { 
          month: 'long', 
          day: 'numeric',
          year: 'numeric'
        }).format(currentDate)}(Week)`;
      case 'month':
        options.year = 'numeric';
        options.month = 'long';
        break;
      case 'year':
        options.year = 'numeric';
        break;
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(currentDate);
  };

  return (
    <div className="w-full px-4 mb-6">
      <div className="w-full flex rounded-md overflow-hidden border border-[#E8ECEF]">
        {(['day', 'week', 'month', 'year'] as Period[]).map((period) => (
          <button 
            key={period}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${
              activePeriod === period 
                ? 'bg-[#20B47B] text-white' 
                : 'bg-white text-[#6E7D9A]'
            }`}
            onClick={() => onPeriodChange(period)}
            aria-label={`View ${period} statistics`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="flex items-center justify-center mt-3">
        <button 
          className="w-8 h-8 flex items-center justify-center text-[#6E7D9A]"
          onClick={() => onDateChange('prev')}
          aria-label="Previous period"
        >
          ‹
        </button>
        <span className="text-sm font-medium text-[#6E7D9A]">{formatDate()}</span>
        <button 
          className="w-8 h-8 flex items-center justify-center text-[#6E7D9A]"
          onClick={() => onDateChange('next')}
          aria-label="Next period"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default PeriodSwitcher;
