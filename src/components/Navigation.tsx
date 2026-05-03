'use client';

import {useCallback, useEffect, useId, useRef, useState} from 'react';
import {Menu, X} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {cn} from "@/lib/utils";

interface MenuItem {
    label: string;
    href: string;
}

interface NavItemProps {
    href: string;
    current: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

const NavItem = ({href, current, onClick, children}: NavItemProps) => {
    return (
        <li>
            <Link
                href={href}
                aria-current={current ? 'page' : undefined}
                onClick={onClick}
                className={cn(
                    'relative block rounded-full px-3 py-2 transition whitespace-nowrap',
                    'hover:text-sky-500 dark:hover:text-sky-400',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500',
                    current && 'text-sky-600 dark:text-sky-400',
                )}
            >
                {children}
            </Link>
        </li>
    );
};

interface DesktopNavigationProps {
    className: string;
    menuItems: MenuItem[];
    pathname: string;
}

const DesktopNavigation = ({className, menuItems, pathname}: DesktopNavigationProps) => {
    return (
        <ul className={cn(
            'flex rounded-full bg-white/90 px-3 font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10',
            className,
        )}>
            {menuItems.map((item) => (
                <NavItem
                    key={item.href}
                    href={item.href}
                    current={pathname === item.href}
                >
                    {item.label}
                </NavItem>
            ))}
        </ul>
    );
};

interface NavigationProps {
    menuItems: MenuItem[];
}

const Navigation = ({menuItems}: NavigationProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const panelId = useId();
    const shouldReduceMotion = useReducedMotion();

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        document.addEventListener('keydown', onKey);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = previousOverflow;
            window.clearTimeout(focusTimer);
            triggerRef.current?.focus();
        };
    }, [isOpen, close]);

    const motionDuration = shouldReduceMotion ? 0 : 0.3;

    return (
        <nav className="p-4 flex items-center justify-between" aria-label="Hoofdnavigatie">
            <div className="hidden md:flex space-x-6">
                <DesktopNavigation
                    className="pointer-events-auto hidden md:flex"
                    menuItems={menuItems}
                    pathname={pathname}
                />
            </div>

            <button
                ref={triggerRef}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-haspopup="dialog"
                onClick={open}
                className="md:hidden inline-flex min-h-11 min-w-11 items-center gap-2 rounded-lg border border-sky-200 dark:border-sky-700 bg-white/80 dark:bg-sky-900/80 px-3 py-2 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
                <Menu className="w-5 h-5" aria-hidden="true"/>
                <span>Menu</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 0.5}}
                            exit={{opacity: 0}}
                            transition={{duration: motionDuration}}
                            className="fixed inset-0 bg-black z-40"
                            onClick={close}
                            aria-hidden="true"
                        />

                        <motion.div
                            id={panelId}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu"
                            initial={{x: '100%'}}
                            animate={{x: 0}}
                            exit={{x: '100%'}}
                            transition={{duration: motionDuration}}
                            style={{paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)'}}
                            className="fixed top-0 right-0 z-50 flex h-[100dvh] w-72 max-w-[85vw] flex-col bg-white dark:bg-sky-900 p-6 shadow-2xl"
                        >
                            <button
                                ref={closeRef}
                                type="button"
                                onClick={close}
                                aria-label="Sluit menu"
                                className="self-end inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                            >
                                <X className="w-6 h-6" aria-hidden="true"/>
                            </button>
                            <ul className="mt-2 flex flex-col gap-1">
                                {menuItems.map((item) => {
                                    const current = pathname === item.href;
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                aria-current={current ? 'page' : undefined}
                                                onClick={close}
                                                className={cn(
                                                    'block rounded-md px-3 py-3 text-lg font-medium',
                                                    'hover:bg-sky-50 dark:hover:bg-sky-800',
                                                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500',
                                                    current && 'text-sky-600 dark:text-sky-400',
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;
