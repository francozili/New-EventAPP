import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class User extends Component {

    state = {
        user: {
            users: [],
            firstname: '',
            lastname: '',
            picture: '',
            phonenumber: '',
            email: '',
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.fetchUser(userId)
    }

    fetchUser = async (userId) => {
        try {
            const userResponse = await axios.get(`http://127.0.0.1:8000/api/v1/users/${userId}`)
            this.setState({
                user: userResponse.data
            })
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }

    deleteUser = () => {
        axios.delete(`http://127.0.0.1:8000/api/v1/users/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const cloneUser = { ...this.state.user }
        cloneUser[e.target.name] = e.target.value
        this.setState({ user: cloneUser })
    }

    updateUser = (e) => {
        e.preventDefault()
        axios
            .put(`http://127.0.0.1:8000/api/v1/users/${this.props.match.params.id}/`, this.state.user)
            .then(res => {
                this.setState({ user: res.data, isEditFormDisplayed: false })
            })
    }

    render() {

        if (this.state.redirectToHome) {
            return (<Redirect to="/users" />)
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
                        ? <div><h1>Update {this.state.user.firstname}</h1>
                            <div><img src={this.state.user.picture} alt='' style={logoStyle} /></div>
                            <form onSubmit={this.updateUser}>
                                <div>
                                    <label htmlFor="firstname">First Name: </label>
                                    <textarea
                                        id="firstname"
                                        type="text"
                                        name="firstname"
                                        onChange={this.handleChange}
                                        value={this.state.user.firstname}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastname">Last Name: </label>
                                    <textarea
                                        id="lastname"
                                        type="text"
                                        name="lastname"
                                        onChange={this.handleChange}
                                        value={this.state.user.lastname}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="picture">Image URL: </label>
                                    <textarea
                                        id="image"
                                        type="text"
                                        name="picture"
                                        onChange={this.handleChange}
                                        value={this.state.user.picture}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email: </label>
                                    <textarea
                                        id="email"
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.user.email}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phonenumber">Phone Number: </label>
                                    <textarea
                                        id="phonenumber"
                                        type="text"
                                        name="phonenumber"
                                        onChange={this.handleChange}
                                        value={this.state.user.phonenumber}
                                    />
                                </div>
                                <button>Update User</button>
                                <button onClick={this.toggleEditForm}>Cancel</button>
                            </form>
                        </div>
                        : <div>
                            <img src={this.state.user.picture} alt="" style={logosStyle} />
                            {/* {this.state.user.events.map(event => (
                                <div key={event.id} style={logosStyle}>
                                    <Link to={`/events/${event.id}`}><img src={event.picture} alt="" style={logoStyle} /></Link>
                                    <h2>{event.eventname}</h2>
                                </div>
                            ))} */}
                            <div>
                                <Link to="/users"><button>Back to User</button></Link>
                                <button onClick={this.toggleEditForm}>Update User</button>
                                <button onClick={this.deleteUser}>Delete User</button>
                            </div>
                        </div>
                }
            </div>


        );
    }
}

export default User;