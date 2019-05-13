import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"
import ModalAddTask from "./ModalAddTask"
import {Button, Alert} from "react-bootstrap"


class AddRemoveTask extends Component {
	AddRemoveTask = Radium(AddRemoveTask)
	constructor (props){
		super(props)
	}


	render(){

		return(
			<Consumer>
				{(context)=>{
					return(
						<div style = {styles.removeAndAdd} >
							<Button onClick={context.handleShow}><i className="fas fa-plus fa-3x" ></i></Button>
							<Button>
								<i onDragOver = {context.ondragover} 
								onDragEnter = {context.ondragenter}
								onDragLeave ={context.ondragleave} 
								onDrop={context.ondrop} className="fas fa-trash-alt fa-3x" id="rubbish"></i>
							</Button>
							<ModalAddTask
          					show={context.state.modalShow}
         					onHide={context.modalClose}
         					alertShow={context.alertShow}
       						 />		
       						 <Alert style={styles.alert} dismissible show={context.state.alertShow} onClose={context.alertHide} variant="success">
							  <Alert.Heading>You have successfully booked an appointment</Alert.Heading>
							  <div style={styles.alertBody}>
							  	 <p> Date : {context.state.date}</p>
							  	  <p> Time : {context.state.time}</p>
							  </div>
							</Alert>
							<Alert style={styles.alert} dismissible show={context.state.alertShowDanger} onClose={context.alertHideDanger} variant="danger" >
							  <Alert.Heading>You cannot book as you have already have an event at that time</Alert.Heading>
							  	<div style={styles.alertBody}>
							  	 <p> Date : {context.state.overbookedDate}</p>
							  	  <p> Time : {context.state.overbookedTime}</p>
							  	</div>
							</Alert>
							<Alert style={styles.alert} dismissible show={context.state.alertShowWorkout} onClose={context.alertHideWorkout} variant="success">
							  <Alert.Heading>You have added the workout into your Task</Alert.Heading>
							</Alert>

						</div>
						)
				}}
				

			</Consumer>
			);
	}
}

export default AddRemoveTask

let styles = {
	removeAndAdd:{
		marginTop:"20px",
		width:"100%",
		height:"100px",
		display:"flex",
		flexDirection: "row",
		flexWrap:"wrap",
		justifyContent:"space-around",

	},
	alert:{
		position:"fixed",
		top:"10%",
		left:"25%",
		zIndex:"10",
		width:"auto"
	},
	alertBody:{
		textAlign:"center"
	},

}