import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CTALink.scss';

export class CTALink extends Component {
    render() {
        let link = this.props.link;
        const title = this.props.title;
        let type = this.props.type;

        if (!type) {
            type = "";
        }

        return (
            <>
            {link ? (
                <a href={link} className={"cta-link " + type}>
                    {title}
                </a>
            ) : (
                <div className={"cta-link " + type}>
                    {title}
                </div>
            )}
            </>
        );
    }
}

CTALink.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
}
