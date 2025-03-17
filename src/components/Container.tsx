import { forwardRef, ReactNode } from 'react';
import { cn } from "@/lib/utils";

type ContainerProps = {
    className?: string;
    children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

// OuterContainer component
const OuterContainer = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn('sm:px-8', className)} {...props}>
            <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
        </div>
    )
);
OuterContainer.displayName = 'OuterContainer';

// InnerContainer component
const InnerContainer = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn('relative px-4 sm:px-8 lg:px-12', className)} {...props}>
            <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
        </div>
    )
);
InnerContainer.displayName = 'InnerContainer';

// Main Container component (combining OuterContainer and InnerContainer)
const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, className, ...props }, ref) => (
        <OuterContainer ref={ref} className={className} {...props}>
            <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
    )
);
Container.displayName = 'Container';

// Explicitly type the Container component with Outer and Inner properties
interface ContainerWithSubcomponents extends React.ForwardRefExoticComponent<ContainerProps> {
    Outer: typeof OuterContainer;
    Inner: typeof InnerContainer;
}

// Add subcomponents to the Container component
const ContainerWithSubcomponents = Container as ContainerWithSubcomponents;
ContainerWithSubcomponents.Outer = OuterContainer;
ContainerWithSubcomponents.Inner = InnerContainer;

export default ContainerWithSubcomponents;
