import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LocationList extends Component {
    state = {
        error: '',
        locations: [],
        newLocation: {
            address: '',
            picture: '',
            guestsize: '',
            email: '',
        },
        redirectToHome: false,
        isLocationFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('http://127.0.0.1:8000/api/v1/locations/').then(res => {
            console.log(res.data)
            this.setState({ locations: res.data })
        })
    }

    toggleLocationForm = () => {
        this.setState((state, props) => {
            return ({ isLocationFormDisplayed: !state.isLocationFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewLocation = { ...this.state.newLocation }
        cloneNewLocation[e.target.name] = e.target.value
        this.setState({ newLocation: cloneNewLocation })
    }

    createLocation = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/v1/locations/', this.state.newLocation)
            .then(res => {
                const locationsList = [...this.state.locations]
                locationsList.unshift(res.data)
                this.setState({
                    newLocation: {
                        address: '',
                        picture: '',
                        guestsize: '',
                        email: '',
                    },
                    isLocationFormDisplayed: false,
                    locations: locationsList
                })
            })
    }
    // createLocation = (e) => {
    //     e.preventDefault()
    //     console.log(this.state.newLocation.address)
    //     axios.post('/api/v1/locations/', {
    //             address: this.state.newLocation.address,
    //             picture: this.state.newLocation.picture,
    //             guestsize: this.state.newLocation.guestsize,
    //             email: this.state.newLocation.email,
    //         })
    //         .then(res => {
    //             const locationsList = [...this.state.locations]
    //             locationsList.unshift(res.data)
    //             this.setState({
    //                 newLocation: {
    //                     address: '',
    //                     picture: '',
    //                     guestsize: '',
    //                     email: '',
    //                 },
    //                 isLocationFormDisplayed: false,
    //                 locations: locationsList
    //             })
    //         })

    // }

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
                    this.state.isLocationFormDisplayed
                        ? <div ><h1>Create {this.state.newLocation.address}</h1>
                            <div><img src={this.state.newLocation.picture} style={logoStyle} alt='' /></div>
                            <form onSubmit={this.createLocation}>
                                <div>
                                    <label htmlFor="address">Address: </label>
                                    <textarea
                                        id="address"
                                        type="text"
                                        name="address"
                                        onChange={this.handleChange}
                                        value={this.state.newLocation.address}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="picture">Image URL: </label>
                                    <textarea
                                        id="picture"
                                        type="text"
                                        name="picture"
                                        onChange={this.handleChange}
                                        value={this.state.newLocation.picture}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email: </label>
                                    <textarea
                                        id="email"
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.newLocation.email}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="guestsize">Guest size: </label>
                                    <textarea
                                        id="guestsize"
                                        type="text"
                                        name="guestsize"
                                        onChange={this.handleChange}
                                        value={this.state.newLocation.guestsize}
                                    />
                                </div>                               
                                 <button>Create Location {this.state.newLocation.address}</button>
                                <button onClick={this.toggleLocationForm}>Cancel</button>
                            </form>
                        </div>
                        : <div>
                            <h1>LocationS</h1>
                            {
                                this.state.locations.map(location => {
                                    return (
                                        <div key={location.id} style={logosStyle}>
                                            <Link to={`/locations/${location.id}`}><img src={location.picture} alt="" style={logoStyle} /></Link>
                                        </div>
                                    )
                                })
                            }
                            <div><button onClick={this.toggleLocationForm}>Create New Location</button></div>
                        </div>
                }
            </div>
        )
    }
}

export default LocationList;
