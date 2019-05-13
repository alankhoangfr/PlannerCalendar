{parseInt(context.state.dragId)===i&&context.state.insideSchedule===false?
									<p onDrop = {context.ondrop} 
								 			onDragEnter = {context.ondragenter}
								 			onDragOver = {context.ondragover} 
								 			onDragLeave ={context.ondragleave}className="timeBetween" style={{...styles.timeDiv}}>{moment(this.state.midnight).add(i/4,"hour").format("hh:mm")+" "} 
											to {+" "+moment(this.state.midnight).add(i/4 + task.duration,"hour").format("h:mm")}</p>	
									:null}




	timeDiv:{	
		textAlign: "center",
		display:"inline-block",
		marginLeft: "10%",
		float:"center",
		height : "15px",
		width :"80%",
		backgroundColor : "	#ffbd80",
		color:"black",
		zIndex:"1",
	},



					{parseInt(context.state.dropId)===i&&context.state.dayId==this.props.scheduleColumnId
						||(context.state.insideSchedule===true&&parseInt(context.state.dragId)===i&&context.state.dayId==this.props.scheduleColumnId
							)?




									if(classNames.indexOf("lockedInDiv")>=0){
			event.preventDefault();
			let id = event.dataTransfer.getData("text/plain")
			let idEvent = ""
			classNames.indexOf("lockedInDivP")>=0?idEvent = event.target.parentElement.id/1000:idEvent = event.target.id/1000
			event.target.style.backgroundColor = "inherit"
			event.target.style.zIndex="2"
			let updateCalendarMemory = this.calendarMemoryAdd(this.state.calendarMemory,this.state.dayId,this.state.selectedTask,idEvent)
			this.setState({
				dragId:"",
				dropId:idEvent,
				tasks:this.state.tasks.filter((eachTask)=> eachTask.id!==this.state.selectedTask.id),
				insideSchedule:true,
				insideTask:false,
				selectedTask : "",
				calendarMemory:updateCalendarMemory
			})

		}else 

	

	









		



			