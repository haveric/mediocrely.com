import React from 'react';
import PropTypes from 'prop-types';
import DateUtils from '../../utils/DateUtil';
import {Container} from '../Base/Container';
import './Schedule.scss';
import ScheduleModal from "./ScheduleModal";

export class Schedule extends React.Component {
    constructor(props) {
        super(props);
        const self = this;

        this.state = {
            activeTab: "1",
            showCurrentTime: false,
            currentTimeTop: 0,
            error: null,
            showScheduleModal: false,
            scheduleModalIsVisible: false,
            scheduleModalGame: null
        };

        this.scheduleModal = React.createRef();

        this.hideScheduleModal = e => {
            if (self.state.scheduleModalIsVisible) {
                if (self.scheduleModal && !self.scheduleModal.current.contains(e.target)) {
                    self.setState({
                        showScheduleModal: false,
                        scheduleModalIsVisible: false
                    });
                }
            }
        };

        this.showScheduleModal = (e, game) => {
            if (!self.state.scheduleModalIsVisible) {
                self.setState({
                    showScheduleModal: true,
                    scheduleModalGame: game
                });

                setTimeout(() => {
                    self.setState({
                        scheduleModalIsVisible: true
                    });
                }, 20);
            }
        };
    }

    componentDidMount() {
        const event = this.props.event;

        this.checkCurrentTime(event);
        this.startCurrentTimeTimer(event);

        document.addEventListener('click', this.hideScheduleModal, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hideScheduleModal, false);
    }

    checkCurrentTime(event) {
        const now = new Date(2020, 10, 7, 22);

        const start = new Date(event.start);
        const end = new Date(event.end);

        //if (now >= start && now <= end) {
            this.setState({
                showCurrentTime: true
            });

            this.setState({
                currentTimeTop: ((now - start) / (end - start) * 100) + "%"
            });
        //}
    }

    startCurrentTimeTimer(event) {
        const self = this;
        const now = new Date();
        const end = new Date(event.end);
        if (now <= end) {
            setInterval(function () {
                self.checkCurrentTime(event);
            }, 30000);
        }
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
            <>
            <ScheduleModal ref={this.scheduleModal} show={this.state.showScheduleModal} game={this.state.scheduleModalGame}/>
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
                            <div className="schedule__rows-inn">
                                <div className={"schedule__currentTime" + (this.state.showCurrentTime ? " active" : "")} style={{top: this.state.currentTimeTop}}/>
                                {rowsHtml}
                            </div>
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
                                        <a className="schedule__watch-link" href={"https://www.twitch.tv/" + (streamers.length > index ? streamers[index].twitchHandle : '')}>
                                            <img src={process.env.RAZZLE_RUNTIME_STRAPI_URL + '/uploads/watch_d933c1ba52.png'} alt="Watch"/></a>
                                        {
                                            streamers.length > index ? streamers[index].extraLifeUserId ?
                                                <a className="schedule__donate-link" href={"https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=" + (streamers.length > index ? streamers[index].extraLifeUserId : '')}>
                                                    <img src={process.env.RAZZLE_RUNTIME_STRAPI_URL + '/uploads/donate_23ec62920b.png'} alt="Donate"/>
                                                </a>
                                                : '' : ''
                                        }
                                    </div>
                                    {
                                        schedule['timeSlots'].map((timeSlot, index) => (
                                            <div key={"timeSlot-" + index} className="schedule__game" style={{
                                                backgroundImage: 'url(' + process.env.RAZZLE_RUNTIME_STRAPI_URL + (timeSlot.game.image != null ? timeSlot.game.image.url : '/uploads/unknown_b0a896addf.png') + ')',
                                                height: getHeightBetween(timeSlot.start, timeSlot.end) + "px",
                                                '--height': getHeightBetweenMin(timeSlot.start, timeSlot.end) + "px",
                                                top: getAbsoluteTop(event.start, timeSlot.start)
                                            }}
                                            onClick={(e => {
                                                this.showScheduleModal(e, timeSlot.game);
                                            })}>
                                            </div>
                                        ), this)
                                    }
                                </div>
                            ), this)
                        }
                        <div className="schedule__col schedule__col-extra">
                            <div className="schedule__heading"/>
                            <div className="schedule__inplay"/>
                        </div>
                    </div>
                </Container>
            </div>
            </>
        );
    }
}

Schedule.propTypes = {
    event: PropTypes.object.isRequired,
    streamers: PropTypes.array.isRequired,
    schedules: PropTypes.array.isRequired
};

export default Schedule;
