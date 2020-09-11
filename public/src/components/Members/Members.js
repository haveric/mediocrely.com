import React from 'react';
import { getTeamInfo } from 'extra-life-api';
import { Container } from '../Base/Container';
import Member from './Member';
import './Members.scss';
import PropTypes from "prop-types";

export class Members extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      donationAmount: 0,
    };
  }

  componentDidMount() {
    this.getDonationAmount();
  }

  getDonationAmount() {
    /*
    getTeamInfo(45491)
      .then((data) => {
        this.setState({ donationAmount: data.sumDonations });
      })
      .catch(() => {
        // console.log(e);
      });
     */
  }

  render() {
    const event = this.props.event;
    const streamers = this.props.streamers;

    return (
      <div id="members" className="members">
        <Container>
            <h2 className="members__totalraised">Total Raised so far: ${this.state.donationAmount}</h2>
            <h3 className="members__title">Team Mediocrely Members</h3>

            {
              streamers.map(streamer => (
                    <Member
                        key={"Streamer-" + streamer.id}
                        streamer={streamer}
                    />
                ))
            }

        </Container>
      </div>
    );
  }
}

Members.propTypes = {
  event: PropTypes.object.isRequired,
  streamers: PropTypes.array.isRequired
};

export default Members;
