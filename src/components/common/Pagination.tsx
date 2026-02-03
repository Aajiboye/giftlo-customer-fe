'use client';

import clsx from 'clsx';

type PageItem = number | '...';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const range = (start: number, end: number): number[] =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const getPages = (): PageItem[] => {
    const totalNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalNumbers) {
      return range(1, totalPages);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      return [
        ...range(1, 3 + siblingCount * 2),
        '...',
        totalPages,
      ];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      return [
        1,
        '...',
        ...range(totalPages - (2 + siblingCount * 2), totalPages),
      ];
    }

    return [
      1,
      '...',
      ...range(leftSibling, rightSibling),
      '...',
      totalPages,
    ];
  };

  const pages = getPages();

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-8 w-8 rounded bg-gray-300 text-white disabled:opacity-50"
      >
        ‹
      </button>

      {/* Pages */}
      {pages.map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-gray-400"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              'h-8 w-8 rounded border',
              page === currentPage
                ? 'border-secondary text-secondary'
                : 'border-transparent text-secondary hover:border-purple-300'
            )}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-8 w-8 rounded bg-secondary text-white disabled:opacity-50"
      >
        ›
      </button>
    </div>
  );
}
