import React, { Component } from 'react';
import { Members } from './Members/Members';
import { Schedule } from './Schedule/Schedule';
import {useParams} from "react-router-dom";
import '../scss/Base.scss';
import '../scss/h5bp/normalize.scss';
import '../scss/h5bp/main.scss';
import axios from "axios";

function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        return <Component {...props} params={params} />
    }
    return ComponentWithRouter
}

class EventPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            event: undefined,
            schedules: [],
            streamers: undefined,
            error: null
        }
    }

    componentDidMount = async () => {
        const eventId = this.props.params.id;

        try {
            const response = await axios.get(process.env.RAZZLE_RUNTIME_API_URL + '/events?id=' + eventId);
            this.setState({
                id: eventId,
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

    static displayName = EventPage.name;

    render () {
        return (
            <>
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

const EventPageWithRouter = withRouter(EventPage)

export default EventPageWithRouter;
