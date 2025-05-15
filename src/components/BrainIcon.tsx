
import React from 'react';

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M30 7C25.3 7 21.7 10.6 21.7 15.3C21.7 17.1 22.3 18.8 23.3 20.2C21.2 22 20 24.6 20 27.5C20 29.3 20.5 31 21.3 32.5C19.2 34.3 18 37 18 40C18 41.9 18.5 43.6 19.5 45.1C17.3 46.9 16 49.6 16 52.5C16 53.3 16.1 54.1 16.3 54.8"
        stroke="#E7A8B0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.7 54.8C43.9 54.1 44 53.3 44 52.5C44 49.6 42.7 46.9 40.5 45.1C41.5 43.6 42 41.9 42 40C42 37 40.8 34.3 38.7 32.5C39.5 31 40 29.3 40 27.5C40 24.6 38.8 22 36.7 20.2C37.7 18.8 38.3 17.1 38.3 15.3C38.3 10.6 34.7 7 30 7"
        stroke="#E7A8B0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 25C27 27 28 28 30 30M30 30C32 28 33 27 35 25M30 30L30 45"
        stroke="#34C34A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="20" r="2" fill="#34C34A" />
      <circle cx="35" cy="20" r="2" fill="#34C34A" />
      <circle cx="22" cy="35" r="2" fill="#34C34A" />
      <circle cx="38" cy="35" r="2" fill="#34C34A" />
    </svg>
  );
};

export default BrainIcon;
