import { NavItems } from './NavItems';

export function SidebarNav() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pt-14 lg:pb-4">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <NavItems />
      </div>
    </aside>
  );
}
