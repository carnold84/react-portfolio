import React, { Component, Children, cloneElement } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

const Container = styled.section`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
`;

const Nav = styled.nav`
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2;
`;

const Button = styled.button`
    &:disabled {
        opacity: 0.5;
    }
`;

class Section extends Component {

    static DIRECTIONS = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    };

    state = {
        slideIndex: 0,
    };
    
    onChangeIndex = (index, indexLatest) => {
        this.setState({
            slideIndex: index,
        });
    };

    onPrevClick = () => {
        let slideIndex = this.state.slideIndex;

        if (slideIndex > 0) {
            slideIndex--;
        }

        this.setState({slideIndex});
    };
    
    onNextClick = () => {
        const { children } = this.props;

        let slideIndex = this.state.slideIndex;

        if (slideIndex < children.length - 1) {
            slideIndex++;
        }

        this.setState({slideIndex});
    };

    render() {
        const { slideIndex } = this.state;
        const { showNav, children, direction, isActive } = this.props;
            
        const num_sections = children.length;

        const views = Children.map(children, (view, i) => {
            return cloneElement(view, {
                isActive: slideIndex === i,
            });
        });
    
        return (
            <Container>
    
                {showNav &&
                    <Nav>
                        <Button
                            disabled={isActive && slideIndex === 0}
                            onClick={this.onPrevClick}>
                            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
                            </svg>
                        </Button>
                        <Button
                            disabled={isActive && slideIndex === num_sections - 1}
                            onClick={this.onNextClick}>
                            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" fill="#010101"/>
                            </svg>
                        </Button>
                    </Nav>
                }
    
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.onChangeIndex}
                    axis={direction === Section.DIRECTIONS.HORIZONTAL ? 'x' : 'y'}
                    enableMouseEvents={true}
                    resistance={true}
                    style={{height: '100%'}}
                    containerStyle={{height: '100%'}}
                    slideStyle={{height: '100%'}}>
                    {views}
                </SwipeableViews>
    
            </Container>
        );
    }
}

const { oneOf, bool } = propTypes;

Section.propTypes = {
    direction: oneOf([Section.DIRECTIONS.HORIZONTAL, Section.DIRECTIONS.VERTICAL]),
    showNav: bool,
    isActive: bool,
};

Section.defaultProps = {
    direction: Section.DIRECTIONS.HORIZONTAL,
    showNav: true,
    isActive: true,
};

export default Section;


        