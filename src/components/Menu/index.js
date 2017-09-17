import React from 'react';
import styled from 'styled-components';

const Container = styled.nav`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    padding: 85px 25px 25px;
    list-style: none;
    transition: transform 300ms ease;
    transform: ${props => props.isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'};
    z-index: 2;
`;

const Menu = (props) => {
    
    const { isOpen, children } = props;
    
    return (
        <Container
            isOpen={isOpen}>
            {children}
        </Container>
    );
}

export default Menu;


        