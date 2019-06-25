import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Event extends Component {

    state = {
        event: {
          places: []
        }
    }

    componentDidMount() {
        const eventId = this.props.match.params.id;
        this.fetchEvent(eventId)
    }

    fetchEvent = async (eventId) => {
        try {
            const eventResponse = await axios.get(`http://127.0.0.1:8000/api/v1/events/${eventId}`)
            this.setState({
              event: eventResponse.data
            })
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }

    deleteEvent = () => {
        axios.delete(`http://127.0.0.1:8000/api/v1/events/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const cloneEvent = { ...this.state.event }
        cloneEvent[e.target.name] = e.target.value
        this.setState({ event: cloneEvent })
    }

    updateEvent = (e) => {
        e.preventDefault()
        axios
            .put(`http://127.0.0.1:8000/api/v1/events/${this.props.match.params.id}/`, this.state.event)
            .then(res => {
                this.setState({ event: res.data, isEditFormDisplayed: false })
            })
    }

    render() {

        if (this.state.redirectToHome) {
            return (<Redirect to="/events" />)
        }

        const logoStyle = {
            margin: "10px",
            height: "200px"
        }

        const logosStyle = {
            display: "inline-block",
            margin: "10px",
            height: "250px"
        }

        return (

            <div>
                {
                    this.state.isEditFormDisplayed
                        ? <div><h1>Update {this.state.event.eventname}</h1>
                            <div><img src={this.state.event.picture} alt='' style={logoStyle} /></div>
                            <form onSubmit={this.updateEvent}>
                                <div>
                                    <label htmlFor="eventname">Event Name: </label>
                                    <textarea
                                        id="eventname"
                                        type="text"
                                        name="eventname"
                                        onChange={this.handleChange}
                                        value={this.state.event.eventname}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="location">Location: </label>
                                    <textarea
                                        id="location"
                                        type="text"
                                        name="location"
                                        onChange={this.handleChange}
                                        value={this.state.event.location}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="picture">Image URL: </label>
                                    <textarea
                                        id="picture"
                                        type="text"
                                        name="picture"
                                        onChange={this.handleChange}
                                        value={this.state.event.picture}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="guest">Guest Size: </label>
                                    <textarea
                                        id="guest"
                                        type="text"
                                        name="guest"
                                        onChange={this.handleChange}
                                        value={this.state.event.guest}
                                    />
                                </div>
                                
                                <button>Update Event</button>
                                <button onClick={this.toggleEditForm}>Cancel</button>
                            </form>
                        </div>
                        : <div>
                            <img src={this.state.event.picture} alt="" style={logosStyle} />
                            {/* {this.state.user.events.map(team => (
                                <div key={event.id} style={logosStyle}>
                                    <Link to={`/events/${event.id}`}><img src={event.picture} alt="" style={logoStyle} /></Link>
                                    <h2>{event.eventname}</h2>
                                </div>
                            ))} */
                            // this.state.events.map(event => {
                            //     return (
                            //         <div key={event.id} style={logosStyle}>
                            //             <Link to={`/events/${event.id}`}><img src={event.picture} alt="" style={logoStyle} /></Link>
                            //         </div>
                            //     )
                            // })
                            
                            }
                            <div>
                                <Link to="/events"><button>Back to Event</button></Link>
                                <button onClick={this.toggleEditForm}>Update Event</button>
                                <button onClick={this.deleteEvent}>Delete Event</button>
                            </div>
                        </div>
                }
            </div>


        );
    }
}

export default Event;