// import React from 'react'
// import './App.css';
// import CustomLayout from './containers/layout'
// import 'antd/dist/antd.css';
// import EventList from './containers/Eventlist'

// function App() {
//   return (
//     <div className="App">
//       <CustomLayout>
//         <EventList/>
//       </CustomLayout>
//     </div>
//   );
// }

// export default App;

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

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

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