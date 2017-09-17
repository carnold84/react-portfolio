import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
    display: flex;
`;

const Link = styled.a`
    font-size: 3em;
    line-height: 1.7em;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.8);
`;

const MenuItem = (props) => {
    
    const { onClick, children } = props;
    
    return (
        <Container>
            <Link onClick={onClick}>
                {children}
            </Link>
        </Container>
    );
}

export default MenuItem;


        