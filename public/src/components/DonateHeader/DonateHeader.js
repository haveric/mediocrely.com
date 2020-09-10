import React, { Component } from 'react';
import { Container } from '../Base/Container';
import { CTALink } from '../CTALink/CTALink';
import './DonateHeader.css';
import DateUtils from "../../utils/DateUtil";
import PropTypes from "prop-types";
import Member from "../Members/Member";
import Schedule from "../Schedule/Schedule";

export class DonateHeader extends Component {
    render() {
        const event = this.props.event;
        return (
            <div className="donate-header">
                <Container>
                    <div className="donate-header__text"><img src={process.env.RAZZLE_RUNTIME_API_URL + '/uploads/icon_star_22d28033f9.png'} alt=""/> Support Our Mission <img src={process.env.RAZZLE_RUNTIME_API_URL + '/uploads/icon_star_22d28033f9.png'} alt=""/></div>
                    <div className="donate-header__donate">
                        <CTALink
                            link='#members'
                            title='Donate'
                            type='secondary'
                        />
                    </div>

                    <div className="donate-header__text"><img src={process.env.RAZZLE_RUNTIME_API_URL + '/uploads/icon_star_22d28033f9.png'} alt=""/> {event.start ? DateUtils.getFormattedStartTime(event.start) : ''} <img src={process.env.RAZZLE_RUNTIME_API_URL + 'http://localhost:1337/uploads/icon_star_22d28033f9.png'} alt=""/></div>
                </Container>
            </div>
        );
    }
}

DonateHeader.propTypes = {
  event: PropTypes.object.isRequired
};

export default DonateHeader;
