import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import HomeField from "./components/Home"
import Location from "./components/Location"
import LocationList from "./components/LocationList"
import User from "./components/User"
import UserList from "./components/UserList"
import Event from "./components/Event"
import EventList from "./components/EventList"
import "./App.css";
import axios from 'axios'
import world from './components/Images/world.png'

class App extends Component {
    state = {
        weather: [],
        temp: [],
        icon: []
    }
    componentDidMount = () => {
        this.weatherAPI();
    }

    weatherAPI = () => {
        axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=33&lon=-84`)
            .then(res => {
                console.log(res.data['weather'])
                let weather = document.getElementById('sky').innerHTML = res.data['weather'][0]['main']
                let icon = document.getElementById('icon').innerHTML = res.data['weather'][0]['icon']
                let temp = document.getElementById('hot').innerHTML = res.data['main']['temp']
                this.setState({ type: weather, temp: temp, icon: icon })
            })
    }
    render() {
        const imgStyle = {
            width: "9%",
            // height:"%",
            margin: "20px",
            borderRadius: "100px"
          }
        return (
            <Router>
                <div className="App">
                <div className="temp">
                        <h4 id="sky"> </h4>
                        <img id="icon"style={imgStyle}src={world} alt="weather icon" />
                        <h4 id="hot"> degrees</h4>
                        
                    </div>

                    <div>
                        <Link to="/"><h1>Eventify!</h1></Link>
                        <div>
                            <div className="toplink"><Link to="/events/">Events</Link></div>
                            <div className="toplink"><Link to="/locations/">Locations</Link></div>
                            <div className="toplink"><Link to="/users/">Users</Link></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={HomeField}/>
                      <Route exact path="/events" component={EventList}/>
                      <Route exact path="/events/:id" component={Event}/>
                      <Route exact path="/locations" component={LocationList}/>
                      <Route path="/locations/:id" component={Location}/>
                      <Route exact path="/users" component={UserList}/>
                      <Route path="/users/:id" component={User}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;