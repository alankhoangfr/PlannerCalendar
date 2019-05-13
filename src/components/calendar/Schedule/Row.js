import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"
import LockedInDiv from "./LockedInDiv"


class Row extends Component{
	Row = Radium(Row)

	render(){	

		return(
			<Consumer>
				{(context)=>{
					let lockedInDiv = (drag,drop,selectedTask,dragId,dropId,dayId,insideSchedule, currentCalendarMemory ,calendarMemory,scheludeColumnId,interval)=>{
						let result = null
						let match = ""
						calendarMemory.length>0?match = calendarMemory.filter((day)=>{return day.date === scheludeColumnId}):match = ""
						//dragging
						if(drag===true&&selectedTask!==""&&dayId===scheludeColumnId&&parseInt(dragId)===parseInt(interval)){
							result =  <LockedInDiv drag = {true} task={selectedTask} interval = {interval}/>
						}
						else if(drop===true&&drag===false&&selectedTask!==""&&dayId===scheludeColumnId&&parseInt(dragId)===parseInt(interval)){
							result =  <LockedInDiv drag = {false} task={selectedTask} interval = {interval}/>
						}
						else if (match.length===1){	
							let filteredTask = match[0]["tasks"].filter((task)=>{return task["dropId"][0]===interval})
							if(filteredTask.length===1){
								result =  <LockedInDiv 
												drag = {false}
												task={filteredTask[0]["task"]} 
												date = {scheludeColumnId} 	
												interval = {interval}
											/>
							}else{
								result = null}
							
						}else{
							result = null
						}
						return result

					}	
					const {drag,drop,calendarMemory,currentCalendarMemory,selectedTask,dragId,dropId,dayId,insideSchedule} = context.state
				
					const timeRow = []
					let totalInvalidDivs = [...this.props.invalidDivs,...this.props.tempInvalidDivs]

					totalInvalidDivs.sort((a,b)=>a-b)
					totalInvalidDivs = totalInvalidDivs.filter((number,index,self)=>self.indexOf(number,index+1)===-1)
					let dropIdForTheDay = this.props.dropIdForTheDay.filter((number,index,self)=>self.indexOf(number,index+1)===-1)
					totalInvalidDivs=totalInvalidDivs.filter((number)=>dropIdForTheDay.indexOf(number)===-1)	
					let dropIdInvalid = []
					let dropIdInvalids =this.props.dropIdInvalid

					dropIdInvalids===undefined?dropIdInvalid=[]:dropIdInvalid=dropIdInvalids
					for (let i = 1; i<97;i++){
						if(totalInvalidDivs.indexOf(i)>=0){
							timeRow.push(
									<div 
									key={i} 
									id = {i} 	
									style ={styles.scheduleTable}
								>
								</div>
								)
						}else if(dropIdInvalid.indexOf(i)>=0){
							timeRow.push(
								<div 
									key={i} 
									className = "scheduleTable"
									id = {i}
									draggable = {true} 	
									style ={styles.scheduleTable}

								>
								
									{lockedInDiv(drag,drop,selectedTask,dragId,dropId,dayId,insideSchedule,currentCalendarMemory,calendarMemory,this.props.scheduleColumnId,i)}
								</div>
							)
						}

						else{
							timeRow.push(
								<div 
									key={i} 
									className = "scheduleTable"
									id = {i}
									draggable = {true} 	
									style ={styles.scheduleTable}
									onDrop = {context.ondrop} 
									onDragOver = {context.ondragover}
									onDragEnter = {context.ondragenter}
									onDragLeave ={context.ondragleave}
								>
								
									{lockedInDiv(drag,drop,selectedTask,dragId,dropId,dayId,insideSchedule,currentCalendarMemory,calendarMemory,this.props.scheduleColumnId,i)}
								</div>
							)
						}}
				let tableRow = timeRow.filter((row)=>row)
					return(
						<React.Fragment>
							{tableRow}
						</React.Fragment>)
				}}	
			</Consumer>
			);
	}
}

export default Row	

let styles = {
	scheduleTable :{
		width:"98%",
		borderTop:"1px solid black",
		height:"17px",
		paddingLeft:"0px",
		paddingRight:"0px",
		fontSize:"10px",
		zIndex:"4",
		margin:"0 auto",
	},
}