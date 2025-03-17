import Image from 'next/image';

interface ImageData {
    src: string;
    alt: string;
}

interface Props {
    images: ImageData[];
}

const ImageRow = ({ images }: Props) => {
    return (
        <div className={'mt-16 sm:mt-20'}>
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {images.map((image, index) => (
                    <div
                        key={image.src}
                        className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-sky-100 sm:w-72 sm:rounded-2xl dark:bg-sky-800 ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
                    >
                        <Image
                            alt={image.alt}
                            src={image.src}
                            fill
                            loading="lazy"
                            decoding="async"
                            sizes="(min-width: 640px) 18rem, 11rem"
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageRow;
