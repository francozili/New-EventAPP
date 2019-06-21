import React from 'react'
import './App.css';
import CustomLayout from './containers/layout'
import 'antd/dist/antd.css';
import EventList from './containers/Eventlist'

function App() {
  return (
    <div className="App">
      <CustomLayout>
        <EventList/>
      </CustomLayout>
    </div>
  );
}

export default App;
