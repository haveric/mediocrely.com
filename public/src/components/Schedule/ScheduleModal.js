import React from 'react';
import PropTypes from 'prop-types';
import './ScheduleModal.scss';

class ScheduleModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const game = this.props.game;
        if (!this.props.show) {
            return null;
        }

        return (
            <>
            <div ref={this.props.innerRef} className="schedule-modal">
                <div className="schedule-modal__main">
                    <div className="schedule-modal__image">
                        <img src={process.env.RAZZLE_RUNTIME_STRAPI_URL + (game.image != null ? game.image.url : '/uploads/unknown_b0a896addf.png')} />
                    </div>
                </div>
                <div className="schedule-modal__details">
                    <h2 className="schedule-modal__title">{game.name}</h2>
                    <div className="schedule-modal__links">
                        {
                            game.websiteUrl ?
                                <a className="schedule-modal__link" href={game.websiteUrl}/>
                            : ""
                        }
                        {
                            game.steamUrl ?
                                <a className="schedule-modal__link" href={game.steamUrl}/>
                                : ""
                        }
                        {
                            game.epicUrl ?
                                <a className="schedule-modal__link" href={game.epicUrl}/>
                                : ""
                        }
                    </div>
                </div>
            </div>
            <div className="schedule-modal__bgcover" />
            </>
        );
    }
}

ScheduleModal.propTypes = {
    game: PropTypes.shape({
        image: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        websiteUrl: PropTypes.string,
        steamUrl: PropTypes.string,
        epicUrl: PropTypes.string,
    }),
    show: PropTypes.bool.isRequired,
};

export default React.forwardRef((props, ref) => <ScheduleModal
    innerRef={ref} {...props}
/>);
