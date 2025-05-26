'use client';

import { usePathname } from 'next/navigation';
import SidebarLeft from "../components/sidebar_left/SidebarLeft";
import SidebarRight from "../components/sidebar_right/SidebarRight";

export default function DynamicLayout({ children }) {
  const pathname = usePathname();
  const showSidebars = pathname === '/';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {showSidebars && (
        <div className="md:col-span-1">
          <SidebarLeft />
        </div>
      )}
      <main className={showSidebars ? "md:col-span-2" : "md:col-span-4"}>
        {children}
      </main>
      {showSidebars && (
        <div className="md:col-span-1">
          <SidebarRight />
        </div>
      )}
    </div>
  );
}