import React from 'react';

export interface Tab {
  name: string;
  href: string;
  disabled: boolean;
}

export interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabName: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = 'mb-2'
}) => {
  return (
    <div
      className={`text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 ${className}`}
    >
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <li key={tab.name} className="me-2">
            <a
              href="#"
              onClick={() => onTabChange(tab.name)} // handle tab change
              className={`inline-block p-4 rounded-t-lg border-b-2 ${
                activeTab === tab.name
                  ? 'text-primary border-appGreen'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              } ${tab.disabled ? 'text-gray-400 cursor-not-allowed dark:text-gray-500' : ''}`}
              aria-current={activeTab === tab.name ? 'page' : undefined}
              // Disable pointer events if the tab is disabled
              style={tab.disabled ? { pointerEvents: 'none' } : {}}
            >
              {tab.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabNavigation;
