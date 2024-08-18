import { SearchBarProps } from '@/utils/types';
import React from 'react';



const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search here...', className }) => (
  <div className={`relative ${className}`}>
    <input
      type="text"
      placeholder={placeholder}
      className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <span className="absolute left-3 top-2 text-gray-500">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 4.5a7.5 7.5 0 014.65 12.15z"></path>
      </svg>
    </span>
  </div>
);

export default SearchBar;
