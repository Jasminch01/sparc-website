'use client';

import Footer from "./Footer";
// import Header from "./Header";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex flex-col min-h-screen">
            {/* <Header /> */}
            <main className="grow">{children}</main>
            <Footer />
        </div>
    );
}