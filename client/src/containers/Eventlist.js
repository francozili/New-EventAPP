import React from 'react';
import Events from '../components/Event';
import axios from 'axios';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

class EventList extends React.Component{
    state ={
        events: []
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/v1/events/')
        .then(res =>{
            this.setState({
                events:res.data
            })
            console.log(res.data)
        })
    }
    render(){
        return (
            <Events data={this.state.events}/>
        )
    }
}

export default EventList;