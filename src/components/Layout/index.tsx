import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

            <main
                className={`flex-1 transition-all duration-300 ${
                    isSidebarExpanded ? 'ml-64' : 'ml-16'
                }`}
            >
                <div className="p-4">{children}</div>
            </main>
        </div>
    );
}