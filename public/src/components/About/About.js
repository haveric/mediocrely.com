import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Container } from '../Base/Container';
import './About.scss';
import PropTypes from "prop-types";

export class About extends Component {
    render() {
        const primary = this.props.primary;
        const secondary = this.props.secondary;

        return (
            <div id="about" className="about">
                <Container>
                    <div className="about__split">
                        <h2 className="about__title">{primary.title}</h2>
                        <div className="about__text">{ ReactHtmlParser (primary.text)}</div>
                    </div>
                    <div className="about__split">
                        <h2 className="about__title">{secondary.title}</h2>
                        <div className="about__text">{ ReactHtmlParser (secondary.text)}</div>
                    </div>
                </Container>
            </div>
        );
    }
}

About.propTypes = {
    primary: PropTypes.object.isRequired,
    secondary: PropTypes.object.isRequired
};

export default About;
