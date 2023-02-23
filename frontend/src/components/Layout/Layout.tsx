import React from 'react';
import Navigation from "@/components/Navigation/Navigation";

type TLayout = {
    children: React.ReactNode;
}

const Layout = ({ children }: TLayout) => {
    return (
        <>
            <Navigation />
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;