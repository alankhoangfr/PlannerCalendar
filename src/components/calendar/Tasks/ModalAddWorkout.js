import React, {Component} from "react"
import Radium from "radium"
import {Modal, Button, Form} from "react-bootstrap"
import moment from "moment"
import TimePicker from 'react-times';
import uniqid from "uniqid"
import {Consumer} from "../../../MyContext"
import 'react-times/css/classic/default.css';



class ModalAddWorkout extends React.Component {
  ModalAddWorkout=Radium(ModalAddWorkout)
  constructor (props){
    super(props)
  }



  render() {
    return (
      <Consumer>
        {(context) => {


        	return(
      <Modal
        show = {context.state.modalShowWorkout}
        onHide = {context.modalCloseWorkout}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title >
            {context.state.doubleClickTask!==""? context.state.doubleClickTask.name:""  }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <b>Duration</b>: {context.state.doubleClickTask!==""? context.state.doubleClickTask.duration:""  } hours
            <br/>
            <b>Exercises</b>
            <br/>
            {context.state.doubleClickTask!==""? context.state.doubleClickTask.exercises:""  }
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={context.modalCloseWorkout}>Close</Button>
        </Modal.Footer>
      </Modal>)
      }}
    
      </Consumer>
    );
  }
}

export default ModalAddWorkout


let styles={

}