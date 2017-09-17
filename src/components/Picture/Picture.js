import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import Loading from '../Loading';

const Container = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    border: #f2f2f2 solid 1px;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const BGImage = styled.div`
    position: absolute;
    width: ${props => props.width};
    height: ${props => props.height};
    background-position: center center;
    background-size: cover;
    background-image: url(${props => props.url});
    opacity: ${props => props.opacity};
    transition: opacity 500ms ease-out;
`;

class Picture extends Component {

    state = {
        isLoading: true,
        url: '',
    };

    image = undefined;

    onImageLoaded = () => {

        const isLoading = true;
        const url = this.image.src;

        this.setState({isLoading, url});
    };

    componentWillMount = () => {
    
        const { url, width, height } = this.props;

        this.image = new Image(width, height);
        this.image.addEventListener('load', this.onImageLoaded, false);
        this.image.src = url;
    };

    render = () => {
    
        const { url, width, height } = this.props;
        let content = undefined;

        if (this.state.url === '') {
            content = (
                <Loading />
            );
        }

        return (
            <Container width={width} height={height}>
                <BGImage url={this.state.url} opacity={this.state.url === '' ? 0 : 1} width={width} height={height} />
                {content}
            </Container>
        );
    };
}

const { number, string } = PropTypes;

Picture.propTypes = {
    url: string.isRequired,
    width: string,
    height: string,
};

Picture.defaultProps = {
    width: '300px',
    height: '200px',
};

export default Picture;