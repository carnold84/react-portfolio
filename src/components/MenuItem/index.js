import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Container = styled.li`
    display: flex;
`;

const StyledLink = styled(Link)`
    font-size: 3em;
    line-height: 1.7em;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.8);
`;

const MenuItem = (props) => {
    
    const { href, children } = props;
    
    return (
        <Container>
            <StyledLink to={href}>{children}</StyledLink>
        </Container>
    );
}

export default MenuItem;


        