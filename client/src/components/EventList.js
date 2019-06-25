import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EventList extends Component {
    state = {
        error: '',
        events: [],
        newEvent: {
            eventname: '',
            location: '',
            guest: '',
            picture: ''
        },
        redirectToHome: false,
        isEventFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('http://127.0.0.1:8000/api/v1/events/').then(res => {
            console.log(res.data)
            this.setState({ events: res.data })
        })
    }

    toggleEventForm = () => {
        this.setState((state, props) => {
            return ({ isEventFormDisplayed: !state.isEventFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewEvent = { ...this.state.newEvent }
        cloneNewEvent[e.target.name] = e.target.value
        this.setState({ newEvent: cloneNewEvent })
    }

    createEvent = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/v1/events/', this.state.newEvent)
            .then(res => {
                const eventsList = [...this.state.events]
                eventsList.unshift(res.data)
                this.setState({
                    newEvent: {
                        eventname: '',
                        location: '',
                        guest: '',
                        picture:''
                    },
                    isEventFormDisplayed: false,
                    events: eventsList
                })
            })
    }

    render() {

        const logoStyle = {
            margin: "10px",
            height: "250px"
        }

        const logosStyle = {
            display: "inline-block",
        }

        return (
            <div>
                {
                    this.state.isEventFormDisplayed
                        ? <div ><h1>Create {this.state.newEvent.eventname}</h1>
                            <div><img src={this.state.newEvent.picture} style={logoStyle} alt='' /></div>
                            <form onSubmit={this.createEvent}>
                                <div>
                                    <label htmlFor="eventname">Event Name: </label>
                                    <textarea
                                        id="eventname"
                                        type="text"
                                        name="eventname"
                                        onChange={this.handleChange}
                                        value={this.state.newEvent.eventname}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="location">Location: </label>
                                    <textarea
                                        id="location"
                                        type="text"
                                        name="location"
                                        onChange={this.handleChange}
                                        value={this.state.newEvent.location}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="picture">Image URL: </label>
                                    <textarea
                                        id="picture"
                                        type="text"
                                        name="picture"
                                        onChange={this.handleChange}
                                        value={this.state.newEvent.picture}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="guest">Guest Size: </label>
                                    <textarea
                                        id="guest"
                                        type="text"
                                        name="guest"
                                        onChange={this.handleChange}
                                        value={this.state.newEvent.guest}
                                    />
                                </div>
                                <button>Create Event {this.state.newEvent.eventname}</button>
                                <button onClick={this.toggleEventForm}>Cancel</button>
                            </form>
                        </div>
                        : <div>
                            <h1>EventS</h1>
                            {
                                this.state.events.map(event => {
                                    return (
                                        <div key={event.id} style={logosStyle}>
                                            <Link to={`/events/${event.id}`}><img src={event.picture} alt="" style={logoStyle} /></Link>
                                        </div>
                                    )
                                })
                            }
                            <div><button onClick={this.toggleEventForm}>Create New Event</button></div>
                        </div>
                }
            </div>
        )
    }
}

export default EventList;
