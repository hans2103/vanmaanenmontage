import { forwardRef, ReactNode } from 'react';
import { cn } from "@/lib/utils";

type ContainerProps = {
    className?: string;
    children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const OuterContainer = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('sm:px-8', className)} {...props}>
                <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
            </div>
        );
    }
);

OuterContainer.displayName = 'OuterContainer';

const InnerContainer = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('relative px-4 sm:px-8 lg:px-12', className)}
                {...props}
            >
                <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
            </div>
        );
    }
);

InnerContainer.displayName = 'InnerContainer';

const Container = Object.assign(forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, ...props }, ref) => {
        return (
            <OuterContainer ref={ref} {...props}>
                <InnerContainer>{children}</InnerContainer>
            </OuterContainer>
        );
    }
), { Outer: OuterContainer, Inner: InnerContainer });

Container.displayName = 'Container'; // Manually set displayName

export default Container;
