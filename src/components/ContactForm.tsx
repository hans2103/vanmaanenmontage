'use client';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';
    const [state, handleSubmit] = useForm(formspreeId);

    if (state.succeeded) {
        return <p className="text-sky-700 dark:text-sky-300">Thanks for contacting us!</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white dark:bg-sky-950 rounded-lg shadow-md transition-colors">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">Naam</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md transition-colors"
                        required
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">e-Mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md transition-colors"
                        required
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-medium">Bericht</label>
                    <textarea
                        id="message"
                        name="message"
                        className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md transition-colors"
                        required
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-sky-600 dark:bg-sky-700 text-white p-3 rounded-md hover:bg-sky-700 dark:hover:bg-sky-600 focus:outline-none transition-colors"
                    disabled={state.submitting}
                >
                    {state.submitting ? 'Verzenden...' : 'Stuur bericht'}
                </button>

                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500" />
            </form>
        </div>
    );
};

export default ContactForm;
