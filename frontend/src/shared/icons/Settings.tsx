import React from 'react';

interface SettingsProps {
  className?: string;
}

export const Settings: React.FC<SettingsProps> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.22 2H11.78C10.64 2 9.5 2.4 8.61 3.2L7.8 4.02C7.38 4.44 6.8 4.8 6.15 4.8C5.5 4.8 4.92 4.44 4.5 4.02L3.69 3.2C2.8 2.4 1.66 2 0.52 2H0.12C0.05 2 0 2.05 0 2.12V3.6C0 3.67 0.05 3.72 0.12 3.72H0.52C1.66 3.72 2.8 4.12 3.69 4.92L4.5 5.74C4.92 6.16 5.5 6.52 6.15 6.52C6.8 6.52 7.38 6.16 7.8 5.74L8.61 4.92C9.5 4.12 10.64 3.72 11.78 3.72H12.22C13.36 3.72 14.5 4.12 15.39 4.92L16.2 5.74C16.62 6.16 17.2 6.52 17.85 6.52C18.5 6.52 19.08 6.16 19.5 5.74L20.31 4.92C21.2 4.12 22.34 3.72 23.48 3.72H23.88C23.95 3.72 24 3.67 24 3.6V2.12C24 2.05 23.95 2 23.88 2H23.48C22.34 2 21.2 2.4 20.31 3.2L19.5 4.02C19.08 4.44 18.5 4.8 17.85 4.8C17.2 4.8 16.62 4.44 16.2 4.02L15.39 3.2C14.5 2.4 13.36 2 12.22 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
); 