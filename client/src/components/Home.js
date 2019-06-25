import React, { Component } from 'react'
import homebk from './Images/apple.png'

class HomeField extends Component {

  render() {
    const imgStyle = {
        width: "75%",
        margin: "20px",
        borderRadius: "100px"
      }
      const sportsStyle = {
        fontSize: "30px",
        fontWeight: "bold",
        margin: "0px"
      }
    return (
        <div>
          <img src={homebk} style={imgStyle} alt="events"/>
          <p style={sportsStyle}>Look foward to manging your events!</p>
        </div>
    )
  }
}
    export default HomeField