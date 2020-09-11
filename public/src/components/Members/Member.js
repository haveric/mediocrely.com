import React from 'react';
import PropTypes from 'prop-types';
import { getUserInfo } from 'extra-life-api';
import { TwitchEmbed } from 'react-twitch-embed';
import { CTALink } from '../CTALink/CTALink';

class Member extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sumDonations: 0,
      numDonations: 0,
    };
  }


  componentDidMount() {
    this.getUserDonation();
  }

  getUserDonation() {
    if (this.props.streamer.extraLifeUserId) {
      getUserInfo(this.props.streamer.extraLifeUserId)
        .then((data) => {
          this.setState({sumDonations: data.sumDonations, numDonations: data.numDonations});
        })
        .catch((e) => {
          //console.log(e);
        });
    }
  }

  render() {
    const streamer = this.props.streamer;

    return (
      <div className="member clearfix">
          <div className="member__icon"><img src={process.env.RAZZLE_RUNTIME_API_URL + streamer.avatar.url} alt={streamer.name} /></div>
          <div className="member__details">
              <h3 className="member__name">{streamer.fullName}</h3>
              <p className="member__bio">{streamer.bio}</p>
              <div className="member__donations">
                  <span className="member__donation-raised">
                      {this.state.sumDonations} USD Raised
                  </span>
                  <span className="member__donation-num">
                      {this.state.numDonations} Donations Received
                  </span>
                  <div className="member__donate">
                      <CTALink
                          link={"https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=" + streamer.extraLifeUserId}
                          title='Donate'
                      />
                  </div>
              </div>
          </div>
          <div className="member__inplay">
              <div className={"twitchembed-" + streamer.twitchHandle}/>
            {
                <TwitchEmbed
                    channel={streamer.twitchHandle}
                    id={streamer.twitchHandle}
                    width="390px"
                    height="219px"
                    theme="dark"
                    withChat={false}
                    muted
                />
            }
          </div>
      </div>
    );
  }
}

Member.propTypes = {
  streamer: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    twitchHandle: PropTypes.string,
    avatar: PropTypes.object.isRequired,
    extraLifeUserId: PropTypes.string,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default Member;
