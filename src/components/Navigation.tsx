'use client';

import {useState, useCallback} from 'react';
import {Menu, X} from 'lucide-react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
import {cn} from "@/lib/utils";

interface MenuItem {
    label: string;
    href: string;
}

interface NavItemProps {
    href: string;
    children: React.ReactNode;
}

const NavItem = ({href, children}: NavItemProps) => {
    return (
        <li>
            <Link
                href={href}
                className={cn(
                    'relative block px-3 py-2 transition whitespace-nowrap',
                    'hover:text-sky-500 dark:hover:text-sky-400',
                )}
            >
                {children}
            </Link>
        </li>
    )
}

interface DesktopNavigationProps {
    className: string;
    menuItems: MenuItem[];
}

const DesktopNavigation = ({className, menuItems}: DesktopNavigationProps) => {
    return (
        <nav className={className}>
            <ul className="flex rounded-full bg-white/90 px-3 font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                {menuItems.map((item) => (
                    <NavItem
                        key={item.href}
                        href={item.href}
                    >
                        {item.label}
                    </NavItem>
                ))}
            </ul>
        </nav>
    )
}


interface NavigationProps {
    menuItems: MenuItem[];
}

const Navigation: React.FC<NavigationProps> = ({menuItems}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Memoized toggle function for performance
    const toggleMenu = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    return (
        <nav className="p-4 flex items-center justify-between">
            <div className="hidden md:flex space-x-6">
                <DesktopNavigation
                    className="pointer-events-auto hidden md:block"
                    menuItems={menuItems}
                />
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex items-center gap-2 p-2 border rounded-lg shadow-sm"
                onClick={toggleMenu}
            >
                <Menu className="w-5 h-5"/>
                <span>Menu</span>
            </button>

            {/* Backdrop & Offcanvas Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 0.5}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                            className="fixed inset-0 bg-black z-40"
                            onClick={toggleMenu}
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{x: '100%'}}
                            animate={{x: 0}}
                            exit={{x: '100%'}}
                            transition={{duration: 0.3}}
                            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col z-50"
                        >
                            <button
                                className="self-end mb-4 p-2"
                                onClick={toggleMenu}
                            >
                                <X className="w-6 h-6"/>
                            </button>
                            <nav className="flex flex-col space-y-4">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-lg font-medium hover:underline"
                                        onClick={toggleMenu}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;
