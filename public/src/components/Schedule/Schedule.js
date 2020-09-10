import React from 'react';
import PropTypes from 'prop-types';
import DateUtils from '../../utils/DateUtil';
import { Container } from '../Base/Container';
import './Schedule.css';

export class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      error: null
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const event = this.props.event;
    const streamers = this.props.streamers;
    const schedules = this.props.schedules;

    function getHeightBetween(start, end) {
      const hours = DateUtils.getHoursBetween(start, end);
      const hours_min1 = hours - 1;
      const height = hours * 55;
      let margins = 0;
      if (hours_min1 > 0) {
       margins = hours_min1 * 10;
      }

      return (height + margins);
    }

    function getHeightBetweenMin(start, end) {
      const height = getHeightBetween(start, end);
      return Math.max(height, 100);
    }

    function getAbsoluteTop(eventStart, start) {
      const hours = DateUtils.getHoursBetween(eventStart, start);
      const hours_min1 = hours - 1;
      const height = hours * 55;
      const margins = hours_min1 * 10;
      return (145 + 10 + height + margins) + "px";
    }

    const times = [];
    const hours = DateUtils.getHoursBetween(event.start, event.end);
    DateUtils.resetLastTimezone();
    for (let i = 0; i < hours; i++) {
      times.push(DateUtils.getTime(event.start, i));
    }

    const timesHtml = times.map(function (time, index) {
      return (
        <div key={"timesHtml-" + index} className="schedule__timerow"><span>{time}</span></div>
      );
    });

    const rowsHtml = times.map((row, index) => {
      return (
        <div key={"rowsHtml-" + index} className="schedule__row"/>
      );
    });


    return (
      <div id="schedule" className="schedule">
        <Container>
          <div className="schedule__header clearfix">
              <h2 className="schedule__title">Game Schedule</h2>
              <h3 className="schedule__date">{event.start ? DateUtils.getFormattedStartTime(event.start) : ''}</h3>
          </div>
          <div className="schedule__cols">
            <div className="schedule__rows">
              <div className="schedule__heading"/>
              <div className="schedule__inplay"/>
              {rowsHtml}
            </div>
            <div className="schedule__time schedule__col">
              <div className="schedule__heading">Time</div>
              <div className="schedule__inplay">In Play</div>
              {timesHtml}
            </div>
            {
              schedules.map((schedule, index) => (
                <div key={"schedule-" + index} className="schedule__col">
                  <div className="schedule__heading">{streamers.length > index ? streamers[index].firstName : ''}</div>
                  <div className="schedule__inplay">
                      <a className="schedule__watch-link" href={"https://www.twitch.tv/" + (streamers.length > index ? streamers[index].twitchHandle : '')}><img src={process.env.RAZZLE_RUNTIME_API_URL + '/uploads/watch_d933c1ba52.png'} alt="Watch"/></a>
                      <a className="schedule__donate-link" href={"https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=" + (streamers.length > index ? streamers[index].extraLifeUserId : '')}><img src={process.env.RAZZLE_RUNTIME_API_URL + '/uploads/donate_23ec62920b.png'} alt="Donate"/></a>
                  </div>
                  {
                    schedule['timeSlots'].map((timeSlot, index) => (
                      <div key={"timeSlot-" + index} className="schedule__game" style={{backgroundImage: 'url(' + process.env.RAZZLE_RUNTIME_API_URL + (timeSlot.game.image != null ? timeSlot.game.image.url : '/uploads/unknown_b0a896addf.png') + ')', height: getHeightBetween(timeSlot.start, timeSlot.end) + "px", '--height': getHeightBetweenMin(timeSlot.start, timeSlot.end) + "px", top: getAbsoluteTop(event.start, timeSlot.start)}}>
                        <a className="schedule__game-link" href="#"/>
                      </div>
                    ), this)
                  }
                </div>
              ), this)
            }
            <div className="schedule__col schedule__col-extra">
              <div className="schedule__heading"> </div>
              <div className="schedule__inplay"> </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Schedule.propTypes = {
  event: PropTypes.object.isRequired,
  streamers: PropTypes.array.isRequired,
  schedules: PropTypes.array.isRequired
};

export default Schedule;
