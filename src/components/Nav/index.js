import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    top: 0;
    padding: 0 15px 0 25px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    z-index: 3;
`;

const Title = styled.h1`
    font-size: 1em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.8);
    margin: 0;
    padding: 0;
`;

const MenuButton = styled.button`
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    display: flex;
    z-index: 4;

    svg {
        fill: #000000;
    }

    &:focus {
        background-color: #333333;
        outline: none;
    }
`;

const Nav = (props) => {
    
    const { onOpen } = props;
    
    return (
        <Container>
            <Title>React Portfolio</Title>
            
            <MenuButton
                onClick={onOpen} />
        </Container>
    );
}

export default Nav;


        