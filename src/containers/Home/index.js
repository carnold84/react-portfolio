import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getData } from '../../store/data/reducer';

import Loading from '../../components/Loading';
import Nav from '../../components/Nav';
import Menu from '../../components/Menu';
import MenuItem from '../../components/MenuItem';
import MainContent from '../../components/MainContent';
import Section from '../../components/Section';
import View from '../../components/View';

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    display: flex;
    z-index: 3;
`;

class Home extends Component {
    
    state = {
        isNavOpen: false,
    };

    menuItems = undefined;
    sections = undefined;
    sectionLookup = {};

    onMenuOpen = () => {
        const { isNavOpen } = this.state;

        this.setState({
            isNavOpen: !isNavOpen,
        });
    };
    
    createSection = (data) => {
        let section = undefined;
        let views = undefined;

        switch (data.type) {
            case 'text':
                section = (
                    <View
                        key={data.id}
                        colour={data.colour}
                        content={data.text}
                    />
                );
                break;
                
            case 'code':
                views = data.views.map((view, i) => {
                    return (
                        <View
                            key={`${data.id}-view-${i}`}
                            colour={view.colour}
                            content={view.text}
                        />
                    );
                });
                section = (
                    <Section
                        key={data.id}
                        direction={Section.DIRECTIONS.HORIZONTAL}>
                        {views}
                    </Section>
                );
                break;
                
            case 'work':
                views = data.views.map((view, i) => {
                    return (
                        <View
                            key={`${data.id}-view-${i}`}
                            content={view.text}
                        />
                    );
                });
                section = (
                    <Section
                        key={data.id}
                        direction={Section.DIRECTIONS.HORIZONTAL}>
                        {views}
                    </Section>
                );
                break;
                
            case 'contact':
                section = (
                    <View
                        key={data.id}   
                        colour={data.colour}
                        content={data.text}
                    />
                );
                break;

            default:
                break;
        }

        return section;
    };

    createSections = (data) => {
        return data.map((section, i) => {
            this.sectionLookup[section.urlSegment] = i;
            return this.createSection(section);
        });
    };
    
    createMenuItems = (data) => {
        return data.map((section) => {
            return (
                <MenuItem 
                    key={section.id}
                    href={section.urlSegment}>
                    {section.title}
                </MenuItem>
            );
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.menuItems = this.createMenuItems(nextProps.data.sections);
            this.sections = this.createSections(nextProps.data.sections);
        }
    }
    
    render() {
        const { match, data } = this.props;

        console.log(match.params)
        console.log(this.sectionLookup)

        let sectionIndex = this.sectionLookup[match.params.section];

        if (sectionIndex === undefined) {
            sectionIndex = 0;
        }
        
        let pageIndex = this.sectionLookup[match.params.page];

        if (pageIndex === undefined) {
            pageIndex = 0;
        }
        console.log(pageIndex)

        let nav = undefined;
        let menu = undefined;
        let content = undefined;

        if (data === undefined) {
            content = (
                <Loading />
            );
        } else {
            nav = (
                <Nav onOpen={this.onMenuOpen} />
            );
            menu = (
                <Menu isOpen={this.state.isNavOpen}>
                    {this.menuItems}
                </Menu>
            );
            content = (
                <Section
                    index={sectionIndex}
                    direction={Section.DIRECTIONS.VERTICAL}
                    showNav={false}>
                    {this.sections}
                </Section>
            );
        }
        
        return (
            <Container>
                {nav}
                
                {menu}
        
                <MainContent isOpen={!this.state.isNavOpen}>

                    {content}

                </MainContent>
            </Container>
        );
    }
}

function mapStateToProps(state) {
  return {
    data: getData(state),
  };
}

export default connect(mapStateToProps)(Home);
