import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserList extends Component {
    state = {
        error: '',
        users: [],
        newUser: {
            firstname: '',
            lastname: '',
            picture: '',
            phonenumber: '',
            email: '',
        },
        redirectToHome: false,
        isUserFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('http://127.0.0.1:8000/api/v1/users/').then(res => {
            console.log(res.data)
            this.setState({ users: res.data })
        })
    }

    toggleUserForm = () => {
        this.setState((state, props) => {
            return ({ isUserFormDisplayed: !state.isUserFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewUser = { ...this.state.newUser }
        cloneNewUser[e.target.name] = e.target.value
        this.setState({ newUser: cloneNewUser })
    }

    createUser = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/v1/users/', this.state.newUser)
            .then(res => {
                const usersList = [...this.state.users]
                usersList.unshift(res.data)
                this.setState({
                    newUser: {
                        firstname: '',
                        lastname: '',
                        picture: '',
                        phonenumber: '',
                        email: '',
                    },
                    isUserFormDisplayed: false,
                    users: usersList
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
                    this.state.isUserFormDisplayed
                        ? <div ><h1>Create {this.state.newUser.firstname}</h1>
                            <div><img src={this.state.newUser.picture} style={logoStyle} alt='' /></div>
                            <form onSubmit={this.createUser}>
                                <div>
                                    <label htmlFor="firstname">First Name: </label>
                                    <textarea
                                        id="firstname"
                                        type="text"
                                        name="firstname"
                                        onChange={this.handleChange}
                                        value={this.state.newUser.firstname}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastname">Last Name: </label>
                                    <textarea
                                        id="lastname"
                                        type="text"
                                        name="lastname"
                                        onChange={this.handleChange}
                                        value={this.state.newUser.lastname}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="picture">Image URL: </label>
                                    <textarea
                                        id="image"
                                        type="text"
                                        name="picture"
                                        onChange={this.handleChange}
                                        value={this.state.newUser.picture}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email: </label>
                                    <textarea
                                        id="email"
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.newUser.email}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phonenumber">Phone Number: </label>
                                    <textarea
                                        id="phonenumber"
                                        type="text"
                                        name="phonenumber"
                                        onChange={this.handleChange}
                                        value={this.state.newUser.phonenumber}
                                    />
                                </div>
                                <button>Create User {this.state.newUser.firstname}</button>
                                <button onClick={this.toggleUserForm}>Cancel</button>
                            </form>
                        </div>
                        : <div>
                            <h1>UserS</h1>
                            {
                                this.state.users.map(user => {
                                    return (
                                        <div key={user.id} style={logosStyle}>
                                            <Link to={`/users/${user.id}`}><img src={user.picture} alt="" style={logoStyle} /></Link>
                                        </div>
                                    )
                                })
                            }
                            <div><button onClick={this.toggleUserForm}>Create New User</button></div>
                        </div>
                }
            </div>
        )
    }
}

export default UserList;
