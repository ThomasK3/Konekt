'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  count,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      {/* Header (Clickable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 flex items-center gap-2 text-konekt-black/50 dark:text-white/50 hover:text-konekt-black dark:hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        )}

        <span className="flex-1 text-left truncate">{title}</span>

        {count !== undefined && count > 0 && (
          <span className="text-xs text-konekt-black/40 dark:text-white/40">
            {count}
          </span>
        )}
      </button>

      {/* Content (Collapsible) */}
      {isOpen && (
        <div className="animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
}
