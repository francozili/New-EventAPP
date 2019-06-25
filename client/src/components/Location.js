import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Location extends Component {

    state = {
        location: {
            locations: [],
            address: '',
            picture: '',
            guestsize: '',
            email: '',
        }
    }

    componentDidMount() {
        const locationId = this.props.match.params.id;
        this.fetchLocation(locationId)
    }

    fetchLocation = async (locationId) => {
        try {
            const locationResponse = await axios.get(`http://127.0.0.1:8000/api/v1/locations/${locationId}`)
            this.setState({
                location: locationResponse.data
            })
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }

    deleteLocation = () => {
        axios.delete(`http://127.0.0.1:8000/api/v1/locations/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const cloneLocation = { ...this.state.location }
        cloneLocation[e.target.name] = e.target.value
        this.setState({ location: cloneLocation })
    }

    updateLocation = (e) => {
        e.preventDefault()
        axios
            .put(`http://127.0.0.1:8000/api/v1/locations/${this.props.match.params.id}/`, this.state.location)
            .then(res => {
                this.setState({ location: res.data, isEditFormDisplayed: false })
            })
    }

    render() {

        if (this.state.redirectToHome) {
            return (<Redirect to="/locations" />)
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
                        ? <div><h1>Update {this.state.location.address}</h1>
                            <div><img src={this.state.location.picture} alt='' style={logoStyle} /></div>
                            <form onSubmit={this.updateLocation}>
                                <div>
                                    <label htmlFor="address">Address: </label>
                                    <textarea
                                        id="address"
                                        type="text"
                                        name="address"
                                        onChange={this.handleChange}
                                        value={this.state.location.address}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="picture">Image URL: </label>
                                    <textarea
                                        id="picture"
                                        type="text"
                                        name="picture"
                                        onChange={this.handleChange}
                                        value={this.state.location.picture}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="picture">Image URL: </label>
                                    <textarea
                                        id="image"
                                        type="text"
                                        name="picture"
                                        onChange={this.handleChange}
                                        value={this.state.location.picture}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email: </label>
                                    <textarea
                                        id="email"
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.location.email}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="guestsize">Guest size: </label>
                                    <textarea
                                        id="guestsize"
                                        type="text"
                                        name="guestsize"
                                        onChange={this.handleChange}
                                        value={this.state.location.guestsize}
                                    />
                                </div>
                                <button>Update Location</button>
                                <button onClick={this.toggleEditForm}>Cancel</button>
                            </form>
                        </div>
                        : <div>
                            <img src={this.state.location.picture} alt="" style={logosStyle} />
                            {/* {this.state.user.events.map(event => (
                                <div key={event.id} style={logosStyle}>
                                    <Link to={`/events/${event.id}`}><img src={event.picture} alt="" style={logoStyle} /></Link>
                                    <h2>{event.eventname}</h2>
                                </div>
                            ))} */}
                            <div>
                                <Link to="/locations"><button>Back to Location</button></Link>
                                <button onClick={this.toggleEditForm}>Update Location</button>
                                <button onClick={this.deleteLocation}>Delete Location</button>
                            </div>
                        </div>
                }
            </div>


        );
    }
}

export default Location;