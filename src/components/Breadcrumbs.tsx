import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { FileType } from '../types';

interface BreadcrumbsProps {
  fileType: FileType;
  currentPageTitle: string;
  onNavigateHome: () => void;
  onNavigateCategory: (type: FileType) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  fileType,
  currentPageTitle,
  onNavigateHome,
  onNavigateCategory,
}) => {
  const categoryLabel = fileType === 'image' ? 'Image Tools' : 'PDF Tools';

  return (
    <nav aria-label="Breadcrumb" className="w-full mb-6 text-xs text-slate-500 dark:text-slate-400">
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </button>
        </li>

        <li className="flex items-center gap-1.5" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </li>

        <li className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onNavigateCategory(fileType)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
          >
            {categoryLabel}
          </button>
        </li>

        <li className="flex items-center gap-1.5" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </li>

        <li className="flex items-center font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs sm:max-w-none" aria-current="page">
          <span>{currentPageTitle}</span>
        </li>
      </ol>
    </nav>
  );
};
