import { X } from 'lucide-react';
import { NavItems } from './NavItems';
import { cn } from '../lib/cn';
import { useEffect } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-gray-200">
          <span className="font-bold text-lg text-gray-900">Menu</span>
          <button onClick={onClose} className="p-2 -mr-2 rounded-md hover:bg-gray-100">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="py-4">
          <NavItems onItemClick={onClose} />
        </div>
      </div>
    </>
  );
}
