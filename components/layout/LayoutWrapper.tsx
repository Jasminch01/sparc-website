'use client';

import { usePathname } from 'next/navigation';
import Footer from "./Footer";
import Header from "./Header";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isStudio = pathname.startsWith('/studio');

    if (isStudio) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
        </div>
    );
}