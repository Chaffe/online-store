import React from 'react';
import Header from "@/components/Header/Header";

type TLayout = {
    children: React.ReactNode;
}

const Layout = ({ children }: TLayout) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;