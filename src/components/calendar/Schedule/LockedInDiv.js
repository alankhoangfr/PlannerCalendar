import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"
import moment from "moment"



class LockedInDiv extends Component{
	LockedInDiv = Radium(LockedInDiv)

	render(){	

		return(
			<Consumer>
				{(context)=>{
					let midnight=Object.assign({},moment().startOf("day"))
					let i = this.props.interval
					let task = this.props.task
					let lockedInDivId = i*1000 
					let date = this.props.date
					if(this.props.drag ===false){
						return(
						
						<div  	
				 			draggable={true} 
				 			onDragStart = {context.ondragstartLockedInDiv.bind(this,[task,date])}  
				 			className = "lockedInDiv" 
				 			onDoubleClick = {context.onDoubleClick1.bind(this,task)}
				 			id = {lockedInDivId} 
				 			style={task.name==="Appointment"?{...styles.appointment,height:17*task.duration*4}:{...styles.lockedInDiv,height:17*task.duration*4}}>
								<p style={{...styles.taskName}} className = "lockedInDiv lockedInDivP" >{task.name}</p>									
								<p style={{...styles.taskName}} className = "lockedInDiv lockedInDivP">
									{moment(midnight).add(parseInt(i-1)/4,"hour").format("h:mm") + " "} 
										to {moment(midnight).add(parseFloat((i-1)/4 + task.duration),"hour").format("h:mm")}</p>

						</div>
						)
					}else{
						return(
						
						<div  	className = "lockedInDiv" 
				 			id = {lockedInDivId} 
				 			style={{...styles.drag,height:17*task.duration*4}}>
								<p style={{...styles.taskName}} className = "lockedInDiv lockedInDivP" >{task.name}</p>									
								<p style={{...styles.taskName}} className = "lockedInDiv lockedInDivP">
									{moment(midnight).add(parseInt(i-1)/4,"hour").format("h:mm") + " "} 
										to {moment(midnight).add(parseFloat((i-1)/4 + task.duration),"hour").format("h:mm")}</p>

						</div>
						)
					}
					
				}}	
			</Consumer>
			);
	}
}

export default LockedInDiv	

let styles = {
	drag:{
		float:"right", 	 		
		width :"70%",
		backgroundColor : "	red",
		margin:"0 auto",
		color:"black",
		zIndex:"2",
		position:"relative",
	},
	lockedInDiv:{
		float:"right", 	 		
		width :"70%",
		backgroundColor : "	green",
		margin:"0 auto",
		color:"black",
		zIndex:"2",
		position:"relative",
	},
	taskName:{
		position:"relative",
		fontSize: "10px",
		padding:"0",
		textAlign: "center",
		color:"black",
		marginBottom:"5px",
		zIndex:"1",
		
	},
	appointment:{
		float:"right", 	 		
		width :"70%",
		backgroundColor : "	yellow",
		margin:"0 auto",
		color:"black",
		zIndex:"2",
		position:"relative",
	},
	
}