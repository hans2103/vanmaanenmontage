import React from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="py-4 bg-gray-800 text-white text-center">
            <p>&copy; {new Date().getFullYear()} van Maanen Montage - website gemaakt door <Link
                href={'https://hkweb.nl'}
                className={cn(
                    'hover:text-sky-500 dark:hover:text-sky-400 underline underline-offset-4',
                )}
            >
                HKweb.nl
            </Link></p>
        </footer>
    )
};

export default Footer;
