import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"
import Row from "./Row"


class Column extends Component{
	Column = Radium(Column)
	render(){	
		return(
			<Consumer>
				{(context)=>{
					let invalidDivs = context.invalidDivsCalendarMemory(context.state.calendarMemory,this.props.scheduleColumnId)
					
					let tempInvalidDivs = []
					let dropIdForTheDay = []
					let dropIdInvalid = []
					context.state.tempInvalidDiv.filter((day)=>{
						if(day.date===this.props.scheduleColumnId){
							tempInvalidDivs = day["invalid"]
							dropIdForTheDay = day["dropIdForTheDay"]
							dropIdInvalid = day["dropIdInvalid"]
					}})
					return(
						<div 
							key={this.props.scheduleColumnId}
							id = {this.props.scheduleColumnId}
							onDragEnter = {context.ondragenter}
							onDragOver = {context.ondragover} 
							onDragLeave ={context.ondragleave} 
							className= "scheduleColumn" 
							style={styles.scheduleColumn}>
								<Row scheduleColumnId = {this.props.scheduleColumnId}
								dropIdForTheDay={dropIdForTheDay}
								invalidDivs = {invalidDivs}
								tempInvalidDivs = {tempInvalidDivs}
								dropIdInvalid={dropIdInvalid}/>
					</div>)
				}}	
			</Consumer>
			);
	}
}

export default Column	


let styles = {
	scheduleColumn:{
		height:"100%",
		width:"14.28%",
		margin:"0 10px",
		zIndex: "3",
}
}