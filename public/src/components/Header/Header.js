import React, { Component } from 'react';
import { Container } from '../Base/Container';
import './Header.css';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <Container>
          <span className="header__link"><img src="http://localhost:1337/uploads/icon_home_003cdcd622.png" alt="Home"/></span>
          <span className="header__link"><img src="http://localhost:1337/uploads/logo_team_mediocrely_897326596f.png" alt="Home"/></span>
          <a className="header__link" href="#about">About</a>
          <a className="header__link" href="#members">Donate</a>
          <a className="header__link" href="#schedule">Schedule</a>
        </Container>
      </header>
    );
  }
}
