import React from 'react';
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Link from 'next/link';
import {ThemeToggler} from "@/components/ThemeToggler";
import Navigation from "@/components/Navigation";

const menuItems = [
    {label: 'Home', href: '/'},
    {label: 'Diensten', href: '/diensten'},
    {label: 'Over mij', href: '/over-mij'},
    {label: 'Contact', href: '/contact'},
];

const Header = () => {
    return (
        <Container className={'pt-6 w-full'}>
            <div className="relative flex gap-4">
                <div className="flex flex-1">
                    <Link href={'/'} className={'w-56 md:w-96 lg:w-104'}>
                        <Logo className={'max-w-10/10 max-h-10/10'}/>
                    </Link>
                </div>
                <div className="hidden flex flex-1 justify-end md:justify-center">
                    <Navigation menuItems={menuItems}/>
                </div>
                <div className="flex justify-end md:flex-1">
                    <div className="pointer-events-auto">
                        <ThemeToggler/>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Header;
