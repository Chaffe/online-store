import React from 'react';
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/SignIn">SignIn</Link></li>
                    <li><Link href="/SignUp">SignUp</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;