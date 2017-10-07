import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _isEqual from 'lodash/isEqual';

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
        sectionIndex: 0,
        viewIndex: 0,
    };

    menuItems = undefined;
    sections = undefined;
    routesLookup = {};
    routes = [];

    onMenuOpen = () => {
        const { isNavOpen } = this.state;

        this.setState({
            isNavOpen: !isNavOpen,
        });
    };

    onSectionIndexChange = (index, latestIndex) => {
        console.log(index, latestIndex)
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
    
    createLookups = (data) => {
        let routes_lookup = {};
        let routes = [];

        data.forEach((section, i) => {
            let new_section = {
                urlSegment: section.urlSegment,
                index: i,
            };

            if (section.views) {
                let new_views = {};

                section.views.forEach((view, i) => {
                    new_views[view.urlSegment] = i;
                });

                new_section.views = new_views;
            }
            
            routes_lookup[section.urlSegment] = new_section;
            routes.push(new_section);
        });

        return {
            routesLookup: routes_lookup,
            routes,
        };
    };

    componentWillReceiveProps(nextProps) {
        const { match, data } = this.props;

        if (!_isEqual(nextProps.data, data)) {
            const lookups = this.createLookups(nextProps.data.sections);
            this.routesLookup = lookups.routesLookup;;
            this.routes = lookups.routes;
            this.menuItems = this.createMenuItems(nextProps.data.sections);
            this.sections = this.createSections(nextProps.data.sections);
        }
        console.log(this.routesLookup)
        console.log(match.params)
        
        let currentSection = this.routesLookup[match.params.section];
        let sectionIndex = 0;

        if (currentSection !== undefined) {
            sectionIndex = currentSection.index;
        }
        
        let viewIndex = this.routesLookup[match.params.view];

        if (viewIndex === undefined) {
            viewIndex = 0;
        }
        console.log(sectionIndex, viewIndex)

        this.setState({
            sectionIndex,
            viewIndex,
        });
    }
    
    render() {
        const { sectionIndex, viewIndex } = this.state;
        const { data } = this.props;

        console.log(sectionIndex, viewIndex)

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
