import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #ffffff;
    transition: transform 300ms ease;
    transform: ${props => props.isOpen ? 'transform: translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)'};
    overflow: hidden;
    justify-content: center;
    align-items: center;
    display: flex;
    z-index: 1;
`;

const MainContent = (props) => {

    const { isOpen, children } = props;
    
    return (
        <Container
            isOpen={isOpen}>
            {children}
        </Container>
    );
}

export default MainContent;


        