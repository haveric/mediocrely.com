import React, { Component } from 'react';
import { Container } from '../Base/Container';
import './Header.scss';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <Container>
          <span className="header__link"><img src={process.env.RAZZLE_RUNTIME_STRAPI_URL + '/uploads/icon_home_003cdcd622.png'} alt="Home"/></span>
          <span className="header__link"><img src={process.env.RAZZLE_RUNTIME_STRAPI_URL + '/uploads/logo_team_mediocrely_897326596f.png'} alt="Home"/></span>
          <a className="header__link" href="#about">About</a>
          <a className="header__link" href="#members">Donate</a>
          <a className="header__link" href="#schedule">Schedule</a>
        </Container>
      </header>
    );
  }
}
