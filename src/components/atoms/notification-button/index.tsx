import { IconButtonProps } from '@/utils/types';
import React, { useState, useEffect, useRef } from 'react';


const IconButton: React.FC<IconButtonProps> = ({ icon, notifications, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button onClick={toggleDropdown} className="p-3 rounded-full focus:outline-none bg-gray-200 hover:bg-gray-300 relative">
        {icon}
        {unreadCount > 0 && (
          <span className="absolute top-[-5px] right-[-5px] inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-2 px-4 text-gray-800 font-semibold">Notifications</div>
          <hr />
          {notifications.length > 0 ? (
            <ul className="py-1 max-h-80 overflow-y-auto">
              {notifications.map(notification => (
                <li key={notification.id} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${notification.isRead ? 'text-gray-500' : 'text-gray-800 font-bold'}`}>
                <div className="flex justify-between">
                  <span>{notification.message}</span>
                  <span className="text-sm text-gray-400">{notification.type}</span>
                </div>
              </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500">No new notifications</div>
          )}
          <div className="py-2 px-4 border-t text-center">
            <a href="/notifications" className="text-blue-600 hover:underline">View All Notifications</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconButton;
