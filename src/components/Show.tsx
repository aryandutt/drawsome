import React, { ReactNode } from 'react';
import { ShowProps } from '../util/types';

const Show: React.FC<ShowProps> & {
    When: React.FC<{ isTrue: boolean; children: ReactNode }>;
} = ({ children }) => {
    let when: ReactNode = null;

    React.Children.forEach(children, (child) => {
        if (
            !when &&
            React.isValidElement(child) &&
            (child as React.ReactElement<{ isTrue?: boolean }>).props.isTrue
        ) {
            when = child;
        }
    });

    return <>{when}</>;
};

const When: React.FC<{ isTrue: boolean; children: ReactNode }> = ({
    isTrue,
    children,
}) => (isTrue ? <>{children}</> : null);

Show.When = When;

export { Show };
