import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"
import EachTask from "./EachTask"
import ModalAddWorkout from "./ModalAddWorkout"


class Tasks extends Component {
	Tasks = Radium(Tasks)


	render(){

		return(
			<Consumer>
				{(context) => {
					const eachTasks = context.state.tasks.map((task)=>
						<div 
							draggable = {true}
							onDoubleClick = {context.onDoubleClick}
							onDragStart  = {context.ondragstartTask.bind(this,task)} 
							style={styles.eachTask}
							id = {task.id}
							key={task.id}>
								<EachTask 
									duration = {task.duration}
									exercises = {task.exercises}
									taskName={task.name}/>
						</div>)

					return(
						<div onDragOver = {context.ondragover} 
							onDrop = {context.ondrop} 

							 onDragEnter = {context.ondragenter}
							 onDragLeave ={context.ondragleave}
							 className = "task" 
							 style={context.state.insideTask===true?styles.attetion:styles.outside}>
							<div style={styles.title}>
								<p>Tasks</p>
							
							</div>	
							{eachTasks}
							<ModalAddWorkout
          					show={context.state.modalShowWorkout}
         					onHide={context.modalCloseWorkout}
         					info = {context.info}
       						 />	
						</div>
						)
				}}
		
			</Consumer>
			);
	}
}


export default Tasks

let styles = {
	outside:{
		border:"1px solid black",
		height:"auto",
		minHeight:"50%",
		marginTop:"20px",
		display:"flex",
		flexDirection: "row",
		flexWrap:"wrap",
		justifyContent:"space-around",
		zIndex:"3",
		overflowY: "scroll",
	},
	title:{
		width:"100%",
		height:"10%",
		zIndex:"1",
	},
	eachTask:{
		padding:"10px",
		fontSize:"80%",
		height:"40%",
		width:"40%",
		border:"1px solid black",
		zIndex:"1",

	},
	attetion:{
		border:"4px solid green",
		height:"auto",
		minHeight:"50%",
		marginTop:"20px",
		display:"flex",
		flexDirection: "row",
		flexWrap:"wrap",
		justifyContent:"space-around",
		zIndex:"3",
		overflowY: "scroll",
	}
}