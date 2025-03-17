import ImageRow from "@/components/ImageRow";
import AboutMe from "@/components/AboutMe";

const images = [
    {
        src: "/images/references/100_5864.jpeg",
        alt: "",
    },
    {
        src: "/images/references/100_5867.jpeg",
        alt: "",
    },
    {
        src: "/images/references/100_5868.jpeg",
        alt: "",
    },
    {
        src: "/images/references/100_5873.jpeg",
        alt: "",
    },
    {
        src: "/images/references/100_5874.jpeg",
        alt: "",
    },
    // Add more images here
];

export default function Home() {
    return (
        <main className={'flex-auto text-sky-950 dark:text-sky-200'}>

            <AboutMe
                className={"mt-16 sm:mt-32"}
                title={"van Maanen Montage, uw ervaren klusser in de Kempen."}
                portraitImage={'/images/dirk.jpg'}
            >
                <p>Van Maanen Montage helpt met alle bouw- en montageklussen. Betrouwbaar, professioneel en
                    vakkundig.</p>
                <p>Ik werk nog steeds bij elk project mee op de bouw. Als u met van Maanen Montage werkt, heeft u mij
                    dan
                    ook in alle fases als rechtstreeks aanspreekpunt.</p>
                <p>Hierdoor kunnen we snel inspringen op wijzigingen of gewijzigde planningen en is aan elk probleem wel
                    een
                    mouw te passen. Verder waarborg ik op deze manier de kwaliteit.</p>
            </AboutMe>

            <ImageRow
                images={images}
            />
        </main>
    );
}
