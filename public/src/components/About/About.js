import React, { Component } from 'react';
import { Container } from '../Base/Container';
import './About.css';

export class About extends Component {
    render() {
        return (
            <div id="about" className="about">
                <Container>
                    <div className="about__split">
                        <h2 className="about__title">What is Extra Life?</h2>
                        <div className="about__text">
                            <p><strong>Extra Life</strong> unites thousands of gamers around the world to play games in support of their local Children's Miracle Network Hospital®. Since its inception in 2008, Extra Life has raised over $50 million USD for sick and injured kids. Donate to a local team  today so they can dedicate a day of their play for kids in your community!</p>
                            <p><strong>Children’s Miracle Network Hospitals</strong> raises funds and awareness for 170 member hospitals that provide 32 million treatments each year to kids across the U.S. and Canada. Each location treats thousands of kids annually, regardless of their illness, injury or family's ability to pay.</p>
                            <p><strong>Your donation is tax-deductible</strong> and will make miracles happen for families who desperately need them.</p>
                        </div>
                    </div>
                    <div className="about__split">
                        <h2 className="about__title">&ldquo;Mission Team Mediocrely&rdquo;</h2>
                        <div className="about__text">
                            <p>A few years ago a small group of us local Milwaukee gamers got together and formed Team Mediocrely.</p>
                            <p><strong>Our mission</strong> is to help children in need of medical care by raising donations through participating in the Extra Life 24-hour gaming marathon on November 2, 2019. Starts at 8:00 AM.</p>
                            <p><strong>100% of our donations</strong> will go to the Children’s Hospital of Wisconsin and fund critical treatments and healthcare services, pediatric medical equipment and charitable care when you <strong>donate through our Extra Life pages</strong>.</p>
                            <p>Last year, we raised a total of $2,234.50.
                                <br/>
                                Our team goal this year is to raise $3,000 and with your support we can do it!
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}
