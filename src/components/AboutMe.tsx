import Container from "@/components/Container";
import Image from 'next/image';

interface Props {
    children: React.ReactNode,
    title: string,
    portraitImage?: string,
    className?: string
}

const AboutMe = ({children, title ='', portraitImage = '', className}: Props) => {
    return (
        <Container className={className}>
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                    <div className="max-w-xs px-2.5 lg:max-w-none relative">
                        <Image
                            src={portraitImage}
                            alt=""
                            width={400}
                            height={400}
                            className="aspect-square rotate-3 rounded-2xl bg-sky-100 object-cover dark:bg-sky-800"
                        />
                    </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-sky-800 dark:text-sky-100 sm:text-5xl">
                        {title}
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-sky-700 dark:text-sky-200">
                        {children}
                    </div>

                </div>
            </div>
        </Container>
    )
}

export default AboutMe
