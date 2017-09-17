import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Container = styled.section`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${props => props.colour ? props.colour : 'transparent'};
    padding: 85px 25px 25px;
`;

const View = (props) => {
    const { colour, content } = props;
    
    return (
        <Container
            colour={colour}>
            <ReactMarkdown source={content} />
        </Container>
    );
}

export default View;


        