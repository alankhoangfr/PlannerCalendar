  ondragstart= (task,event)=>{
    	console.log("startDrag")
    	event.dataTransfer.setData("text", event.target.id);
		event.currentTarget.style.border = "dashed"
		event.currentTarget.style.opacity = "0.4"
		this.setState({
			selectedTask : task,
		})
	ondragenter = (event)=>{
		if(event.target.className === "scheduleTable"){
			console.log("enter",this.state.selectedTask)
			let idEvent = event.target.id
			this.setState({
				drag:true,
				dragId:idEvent,
				drop:false,
				dropId:"",
			})
			event.target.style.backgroundColor = "rgba(23, 126, 14, 0.3)";		
		}else if (event.target.className === "timeBetween"){
			this.setState({
				drag:false,
				dragId:event.target.parentElement.id,
				drop:false,
				dropId:"",
			})
	}}
	ondragover = (event)=>{
		event.preventDefault();		
	}
	ondragleave = (event) =>{
		if(event.target.className === "scheduleTable"){
			console.log("left")
			if(event.target.style.backgroundColor === "rgba(23, 126, 14, 0.3)"){
				console.log("turnOff")
				event.target.style.backgroundColor = "inherit"}
		}							
	}
	ondrop = (event)=>{
		if(event.target.className === "scheduleTable"){
			event.preventDefault();
			let id = event.dataTransfer.getData("text")
			console.log("dropped")
			let idEvent = event.target.id
			event.target.style.backgroundColor = "inherit"
			this.setState({
				drag:false,
				dragId:"",
				drop:true,
				dropId:idEvent,
				tasks:this.state.tasks.filter((eachTask)=> eachTask.id!==this.state.selectedTask.id),
			})
		}else if (event.target.className === "timeBetween"){
			event.preventDefault();
			this.setState({
				drag:false,
				dragId:"",
				drop:true,
				dropId:event.target.parentElement.id,
				tasks:this.state.tasks.filter((eachTask)=> eachTask.id!==this.state.selectedTask.id),
			})
		}	
	}
		