import React, { Component } from 'react';
import { Header } from './Header/Header';
import { InfoCarousel } from './InfoCarousel/InfoCarousel';
import { About } from './About/About';
import { DonateHeader } from './DonateHeader/DonateHeader';
import { Members } from './Members/Members';
import { Schedule } from './Schedule/Schedule';
import '../scss/Base.scss';
import '../scss/h5bp/normalize.scss';
import '../scss/h5bp/main.scss';
import axios from "axios";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: undefined,
      schedules: [],
      streamers: undefined,
      infoCarousel: undefined,
      error: null
    };
  }

  componentDidMount = async () => {
    try {
      const homeResponse = await axios.get(process.env.RAZZLE_RUNTIME_API_URL + '/home');
      this.setState({
        infoCarousel: homeResponse.data.info_carousel
      });

      const response = await axios.get(process.env.RAZZLE_RUNTIME_API_URL + '/events?id=' + homeResponse.data.event.id);
      this.setState({
        event: response.data[0],
        schedules: response.data[0]['schedules']
      });

      const streamersPromises = this.state.schedules.map(async schedule => {
        const streamerResponse = await axios.get(process.env.RAZZLE_RUNTIME_API_URL + '/streamers?id=' + schedule.streamer);

        return streamerResponse.data[0];
      })

      const streamers = await Promise.all(streamersPromises);
      this.setState({
        streamers: streamers
      })
    } catch (error) {
      this.state.error = error;
    }
  }

  static displayName = Home.name;

  render () {
    return (
        <>
          <Header />
          {this.state.infoCarousel !== undefined ?
            <InfoCarousel
              key={"InfoCarousel-" + this.state.infoCarousel.id}
              slides={this.state.infoCarousel.slides}
            />
            : ""
          }
          <About />
          {this.state.event !== undefined ?
            <DonateHeader
              key="DonateHeader-1"
              event={this.state.event}
            />
            : ""
          }
          {this.state.streamers !== undefined ?
            <>
              <Members
                key="Member-1"
                event={this.state.event}
                streamers={this.state.streamers}
              />
              <Schedule
                key="Schedule-1"
                event={this.state.event}
                streamers={this.state.streamers}
                schedules={this.state.schedules}
              />
            </>
            : ""
          }
      </>
    );
  }
}
