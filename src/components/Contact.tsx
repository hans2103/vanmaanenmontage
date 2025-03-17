import React from "react";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import {Mail, Phone} from "lucide-react";

interface Props {
    className?: string;
}

const Contact = ({className}: Props) => {
    return (
        <Container className={className}>
            <div className="max-w-screen-xl mt-24 mb-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto
                bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100 rounded-lg shadow-lg transition-colors">

                <div className="flex items-center">
                    <div className="max-w-xs px-2.5 lg:max-w-none">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Mail me!</h2>
                        <p className="text-sky-700 dark:text-sky-300 mt-8">
                            Vragen, offerte nodig of een klus bespreken? Stuur me een bericht!
                        </p>
                        <ul className="mt-5 space-y-3">
                            <li className="flex items-center space-x-3">
                                <Mail className="w-6 h-6 text-sky-700 dark:text-sky-300"/>
                                <a href="mailto:info@vanmaanenmontage.nl"
                                   className="text-sky-800 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200 hover:underline">
                                    info@vanmaanenmontage.nl
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-6 h-6 text-sky-700 dark:text-sky-300"/>
                                <a href="tel:+31 6 54221912"
                                   className="text-sky-800 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200 hover:underline">
                                    +31 6 54221912
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <ContactForm/>
                </div>
            </div>
        </Container>
    );
};

export default Contact;
