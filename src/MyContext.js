import React,{Component} from "react"
import moment from "moment"
import uniqid from "uniqid"


const MyContext = React.createContext()

export class Provider extends Component{

	constructor(props){
		super(props)
		this.state ={
			dataContent : moment(),
			year: moment().format("Y"),
			month:moment().format("MMMM"),
			today : moment(),
			highlight:[false,"","","","",""],
			tasks:[
					{name:"Workout 1",exercises:"20 x push-ups , 30 x pullups",duration:1.25,id:7}],
			dayId:"",	
			insideTask:false,
			insideSchedule:false,
			selectedTask : "",
			drag:"",
			drop:"",
			dragId:"",
			dropId:"",
			calendarMemory:[],
			appointments:[],
			currentCalendarMemory:[],
			tempInvalidDiv:[],
			change:false,
			//opening the workout
			modalShowWorkout:false,
			doubleClickTask:"",
			//creating appointments and workouts
			modalShow: false,
			alertShow:false,
			event:"Appointment",
		    date:moment().format("YYYY-MM-DD"),
		    time:"9:00",
		    duration:"",
		    exercises:"",
		    id:"",
		    comment:"",
		    name:"",
		    reoccuring:false,
		    reoccuringFrequence:1,
		    dateEnd:moment().add(1, "year").format("YYYY-MM-DD"),
		    alertShowDanger:false,
		    overbookedDate:"",
		    overbookedTime:"",
		    alertShowWorkout:false,
		}
		
	}
	componentDidMount(){
		this.jump(this.state.today.format("Y-MMMM-D"))			
	}	
	//set calendar to right time
	jump=(date)=>{
		let time = parseFloat(this.state.today.format("H")/24)
		let div = document.getElementById("dailyTable")
		var clickEvent  = document.createEvent ('MouseEvents')
    	clickEvent.initEvent ('dblclick', true, true);
    	if(date===this.state.today.format("Y-MMMM-D")){
    		div.scrollTop = parseInt(div.scrollHeight)*time
    	}else{
    		div.scrollTop = div.scrollHeight*0.3
    	}
    	
   		div.dispatchEvent (clickEvent);
	}
	//Calendar Memory
	tempInvalidDivs = (calendarMemory,selectedTask)=>{
		
		let tempInvalidDiv= []
		if (calendarMemory.length>=1){
			calendarMemory.forEach((day)=>{	
				let dropIdInvalid= []
				let dropIdForTheDay=[]
				let starter = []
				day["tasks"].forEach((task)=>{
					let start= task.dropId[0] - parseFloat(selectedTask.duration)*4 +1
					for(let i =start;i< task.dropId[0];i++){
						starter.push(i)
						dropIdForTheDay.push(task.dropId[0])

					}			
				})
				dropIdForTheDay = dropIdForTheDay.filter((number,index,self)=>self.indexOf(number,index+1)===-1)
				dropIdForTheDay.forEach((each,index,self)=>{
					let others = self.filter((number)=>number!==each&&number>each)
					if(each+parseFloat(selectedTask.duration)*4-1>Math.min.apply(null, others)){
						dropIdInvalid.push(each)
					}
				})
				let result = {date:day.date,invalid:starter,dropIdForTheDay:dropIdForTheDay,dropIdInvalid:dropIdInvalid}
				tempInvalidDiv=[result,...tempInvalidDiv]
			})

		}
		return tempInvalidDiv

	}
	invalidDivsCalendarMemory = (calendarMemory,scheduleColumnId)=>{
		let invalidDivs = ""
		let match =""
		if(calendarMemory.length>0){
			match = calendarMemory.filter((day)=>{return day["date"] === scheduleColumnId})
			if (match.length===1){	
				invalidDivs=match[0]["invalidDivs"]
			}
		}	
		return invalidDivs

	}
	calendarMemoryAdd=(calendarMemory,dayId,selectedTask,idEvent)=>{
		let match = ""
		let updateCalendarMemory = ""
		calendarMemory.length>0?match = calendarMemory.filter((day)=>{return Object.values(day)[0] === dayId}):match = false
		let updateDate = ""
		let invalidDivs = []
		for(let i = parseInt(idEvent)+1;i<=parseInt(idEvent)+(4*parseFloat(selectedTask.duration)-1);i++){
			invalidDivs.push(i)}
		if (match.length===1){			
			updateDate={
				date:dayId,
				tasks:[
					...match[0]["tasks"],
					{dropId:[parseInt(idEvent),parseInt(idEvent)+4*parseFloat(selectedTask.duration)-1],
					task:selectedTask}],
				invalidDivs:[...match[0]["invalidDivs"],...invalidDivs]}
			updateCalendarMemory = calendarMemory.filter((day)=>day.date!==dayId)
			updateCalendarMemory.push(updateDate)		
		}else if(match.length===0){
			updateCalendarMemory = [{
				date:dayId,
				tasks:[{
					dropId:[parseInt(idEvent),parseInt(idEvent)+(4*parseFloat(selectedTask.duration)-1)],
					task:selectedTask}],
				invalidDivs:[...invalidDivs]},...calendarMemory]
		}else if(match===false){
			updateCalendarMemory = [{
				date:dayId,
				tasks:[{
					dropId:[parseInt(idEvent),parseInt(idEvent)+(4*parseFloat(selectedTask.duration)-1)],
					task:selectedTask}],
				invalidDivs:[...invalidDivs]},...calendarMemory]
		}
		return updateCalendarMemory
	}
	updatingCalendarMemory = (calendarMemory,dayId,invalidOld,taskOld,oldDropId,tasksBar,selectedTask,idEvent)=>{	
		let oldTasks = calendarMemory.filter((day)=>{return day.date===dayId})
		oldTasks= oldTasks[0]["tasks"].filter((task)=>{
			return task.task.id!==taskOld.id})
		invalidOld = invalidOld.filter((number)=>{
			return number<=oldDropId[0] || number>oldDropId[1]
		})
		let invalidNew = [...invalidOld]
		for(let i=parseInt(idEvent)+1;i<=parseInt(idEvent)+4*parseFloat(selectedTask.duration)-1;i++){
			invalidNew.push(i)
		}
		//updating the TaskBar
		let newTasks = [...tasksBar.filter((eachTask)=> eachTask.id!==selectedTask.id),taskOld]
		//replacing
		let updateDate={
			date:dayId,
			tasks:[
				...oldTasks,
				{dropId:[parseInt(idEvent),parseInt(idEvent)+4*parseFloat(selectedTask.duration)-1],
				task:selectedTask}],
			invalidDivs:[...invalidNew]}
		//removing the task from the calendar
		let removeTask = {
			date:dayId,
			tasks:[...oldTasks],
			invalidDivs:[...invalidOld]}
		let updateCalendarMemory = calendarMemory.filter((day)=>day.date!==dayId)
		let updateCalendarMemoryRemoveTask = Object.assign([],updateCalendarMemory)
		updateCalendarMemoryRemoveTask.push(removeTask)	
		updateCalendarMemory.push(updateDate)		
		return {updateCalendarMemory:updateCalendarMemory,newTasks:newTasks,removeTask:updateCalendarMemoryRemoveTask}
	}


	calendarMemoryReplace = (calendarMemory,dayId,selectedTask,idEvent,tempInvalidDiv,tasksBar)=>{

		let oldDropId = ""
		let invalidOld=""
		let taskOld = ""
		let date = ""
		if (dayId===""){
			
			calendarMemory.filter((day)=>{	
				day.tasks.filter((task)=>{
					if(task.task.id===selectedTask.id){
						date=day}
				})
			})

		}else{date=dayId}
		let dropIdForTheDay = tempInvalidDiv.filter((day)=>{return day.date===date})
		let dropIdsForTheDay = []
		dropIdForTheDay[0]!==undefined?dropIdsForTheDay=dropIdForTheDay[0]["dropIdForTheDay"]:dropIdsForTheDay=[]
		//replacing on the schedule
		if(dropIdsForTheDay.indexOf(parseInt(idEvent))>=0){
			calendarMemory.filter((day)=>{
				if(day.date===date){
					invalidOld = day.invalidDivs
					day.tasks.filter((task)=>{
						if(task.dropId[0]===idEvent){
							taskOld = task.task
							oldDropId = task.dropId
						}
					})
				}
			})
		let update = this.updatingCalendarMemory(calendarMemory,date,invalidOld,taskOld,oldDropId,tasksBar,selectedTask,idEvent)		
		return {tasks:update.newTasks,updateCalendarMemory:update.updateCalendarMemory}
		//returning back to task or to rubbish
		}else if (idEvent === null){
			calendarMemory.filter((day)=>{
				if(day.date===date){
					invalidOld = day.invalidDivs
					day.tasks.filter((task)=>{
						if(task.task.id===selectedTask.id){
							taskOld = task.task
							oldDropId = task.dropId
						}
					})
				}
			})
			let update = this.updatingCalendarMemory(calendarMemory,date,invalidOld,taskOld,oldDropId,tasksBar,selectedTask,idEvent)
			return {tasks:null,updateCalendarMemory:null,removeTask:update.removeTask}
		}

		else {
			return {tasks:null,updateCalendarMemory:null,removeTask:null}
		}

	}

	//Onclick Calendar 
    up = ()=>{
    	let dataContentCopy = Object.assign({}, this.state.dataContent);
    	dataContentCopy = moment(dataContentCopy).add(1, "month");
    	
    	 this.setState({
            dataContent: dataContentCopy,
            month: dataContentCopy.format("MMMM"),
            year: dataContentCopy.format("Y"),
        });
    }
    down = ()=>{
    	let dataContentCopy= Object.assign({}, this.state.dataContent)
    	dataContentCopy = moment(dataContentCopy).subtract(1,"month")
    	this.setState({
    		dataContent:dataContentCopy,
    		month: dataContentCopy.format("MMMM"),
            year: dataContentCopy.format("Y"),
    	})
    }	
    changeMonth=(event)=>{
    	const newMonth = parseInt(moment().month(event).format("MM"))
    	const currentMonth = parseInt(this.state.dataContent.format("MM"))
    	const diff = newMonth-currentMonth
    	let dataContentCopy= Object.assign({}, this.state.dataContent)
    	dataContentCopy = moment(dataContentCopy).add(diff,"month")
    	this.setState({
    		dataContent:dataContentCopy,
    		month: dataContentCopy.format("MMMM"),
            year: dataContentCopy.format("Y"),
    	})
    	document.body.click()
    } 
    handleChange=(event)=>{
    	this.setState({year:event.target.value})
    }
    onSubmit=(event)=>{
    	event.preventDefault()
    	const newDate =moment().month(this.state.month).year(this.state.year)
    	this.setState({
    		dataContent:newDate,
    		month: newDate.format("MMMM"),
            year: newDate.format("Y"),
    	})

    }
    onCelllighter= (row, column, event) => {
    	
    	let newEventTarget = Object.assign({},event.target)
    	newEventTarget.toString()
    	let dateSelected = Object.values(newEventTarget)[1]["children"]
    	let dataContent = Object.assign({}, this.state.dataContent)
    	let monthYear=[moment(dataContent).format("M"),moment(dataContent).format("Y")]
    	
    	if(row===0&&dateSelected>8){
    		moment(dataContent).format("M")===1?
    			monthYear=[moment(dataContent).subtract(1,"month").format("M"),moment(dataContent).subtract(1,"year").format("Y")]:
    			monthYear=[moment(dataContent).subtract(1,"month").format("M"),moment(dataContent).format("Y")]
    	}else if(row>=3 && dateSelected<8){
    			moment(dataContent).format("M")===12?
    			monthYear=[moment(dataContent).add(1,"month").format("M"),moment(dataContent).add(1,"year").format("Y")]:
    			monthYear=[moment(dataContent).add(1,"month").format("M"),moment(dataContent).format("Y")]
    	}
    	let date = monthYear[1]+'-'+monthYear[0]+'-'+parseInt(dateSelected)
    	dateSelected=moment(date)
    	this.jump(moment(dateSelected).format("Y-MMMM-D"))
    	if (dateSelected.format("Y-MMMM-D")!==this.state.today.format("Y-MMMM-D")){
    		 if(this.state.highlight[0]===false && this.state.highlight[1]===""){
    			event.target.style.backgroundColor = "#b0b0b0"
    			this.setState({
    			highlight:[true,dateSelected.format("Y-MMMM-D"),row,column,dateSelected],
    			dateSelected :dateSelected
    				})
    		}
    		else if(dateSelected.format("Y-MMMM-D")===this.state.highlight[1] &&this.state.highlight[0]===true){
	    		event.target.style.backgroundColor = 'inherit'
	    		this.setState({
	    		highlight:[false,"","","","",""],
	    		dateSelected :dateSelected,
    		})
    		}else if(this.state.highlight[0]===true && this.state.highlight[1]!==dateSelected){
    			
    			if(this.state.highlight[1]!==moment(this.state.today).format("Y-MMMM-D")){
    				document.getElementsByClassName("cal")[0].rows[this.state.highlight[2]].cells[this.state.highlight[3]].style.backgroundColor = "inherit"
    			}
    			event.target.style.backgroundColor = "#b0b0b0"
    			this.setState({
    			highlight:[true,dateSelected.format("Y-MMMM-D"),row,column,dateSelected],
    			dateSelected :dateSelected
    				})
    		}				
    	}else if(dateSelected.format("Y-MMMM-D")===this.state.today.format("Y-MMMM-D")&&
    			this.state.highlight[2]!==""&&this.state.today.format("Y-MMMM-D")!==this.state.highlight[1]){

    		document.getElementsByClassName("cal")[0].rows[this.state.highlight[2]].cells[this.state.highlight[3]].style.backgroundColor = "inherit"
    		this.setState({
	    		highlight:[true,dateSelected.format("Y-MMMM-D"),row,column,dateSelected],
				dateSelected :dateSelected})

    	}
    }
    //onClick Add Appointments and Workouts
	onChange= (event)=>{this.setState({[event.target.name]:event.target.value})}
  	onChangeTime= (time)=>{
  		let time24 = time.hour+":"+time.minute
  		time24 = moment(time24,['h:m a', 'HH:mm'])
  		this.setState({time:time24.format("HH:mm")})}

  	appointmentPossible = (calendarMemory,result,idEvent,date) =>{
  		let invalid = this.tempInvalidDivs(calendarMemory,result)
  		let check = []
  		let day = this.state.calendarMemory.filter((day)=>day.date===moment(date).format("Y-MMMM-D"))
  		day.length===0?check = []:
    			check = [...this.state.calendarMemory.filter((day)=>day.date===moment(date).format("Y-MMMM-D"))[0]["invalidDivs"],
    			...invalid[0].invalid,...invalid[0].dropIdForTheDay]
    	if(check.indexOf(idEvent)===-1){return true }else {return false}
  	}

  	appointmentReoccuring = (calendarMemory,result,idEvent,date,dateEnd,frequence)=>{
		var now = moment(date); //todays date
		var end = moment(dateEnd); // another date
		var duration = moment.duration(end.diff(now));
		switch(frequence){
			case "1":
				var freq = parseInt(duration.asDays())
				var distance = "days"
				break;
			case "7":
				var freq = parseInt(duration.asWeeks())
				var distance = "weeks"
				break;
			case "30":
				var freq = parseInt(duration.asMonths())
				var distance = "months"
				break;
			default:
				var freq = parseInt(duration.asDays())
				var distance = "days"

		}
		var everyCheck = []
		
		for (let i = 0;i<=freq;i++){
			let newDate = moment(date).add(i,distance).format("Y-MMMM-D")
			let check = this.appointmentPossible(calendarMemory,result,idEvent,newDate)
			if(check===false){everyCheck.push(newDate)}
		}
		let tempCalendarMemory = this.state.calendarMemory
		if(everyCheck.length===0){
			for (let i = 0;i<=freq;i++){
			let newDate = moment(date).add(i,distance).format("Y-MMMM-D")
			let update = this.calendarMemoryAdd(tempCalendarMemory,newDate,result,idEvent)
			tempCalendarMemory = update
			}
		}else {tempCalendarMemory = []}
		return {tempCalendarMemory : tempCalendarMemory, everyCheck:everyCheck}
  	}
  	onSubmitModal =(event)=>{
   		event.preventDefault()
    	if(this.state.event==="Appointment"){
    		let result = {name:"Appointment",duration:1,id:uniqid(),comment:this.state.comment}
    		let time = Object.assign([],this.state.time)   
    		let idEvent = parseInt(time[0]+time[1])*4 + parseInt(time[3]+time[4])/15 +1
	       	if(this.appointmentPossible	(this.state.calendarMemory,result,idEvent,this.state.date)===true){
	       		if(this.state.reoccuring===false){
	       			let update = this.calendarMemoryAdd(this.state.calendarMemory,moment(this.state.date).format("Y-MMMM-D"),result,idEvent)
			      	this.setState({    	
			      		modalShow: false,
						alertShow:true,
						calendarMemory:update,
						reoccuring:false,
			      	})
	       		}else{
	       			let appointment = this.appointmentReoccuring(this.state.calendarMemory,result,idEvent,this.state.date,this.state.dateEnd,this.state.reoccuringFrequence)
	       			if (appointment.everyCheck.length ===0){
	       				this.setState({    	
				      		modalShow: false,
							alertShow:true,
							calendarMemory:appointment.tempCalendarMemory,
							reoccuring:false,

			      		})

	       			}else{
	       				this.setState({    	
				      		modalShow: false,
							alertShowDanger:true,
							overbookedTime:time,
							overbookedDate:appointment.everyCheck[0],
							reoccuring:false,
			      		})
	       			}
	       		}
	       		}		
		      	
	       	else {
	       		this.setState({
	       			alertShowDanger:true,
	       			modalShow: false,
	       			reoccuring:false,
	       			overbookedDate:this.state.date,
	       			overbookedTime:this.state.time})
	       		
	       	}
      
     	}else{

     		let result = {name:this.state.name,duration:parseInt(this.state.duration),id:uniqid(),exercises:this.state.exercises}
     			this.setState({    	
			      		modalShow: false,	
						reoccuring:false,
						tasks: [result,...this.state.tasks],
						exercises:"",
						alertShowWorkout:true,
			      	})

     	}
  	}
  	handleShow = ()=> {
  		this.setState({ 
  			modalShow: true,
  			comment:"",
        	date:moment().format("YYYY-MM-DD"),
      		time:"9:00", })}
  	modalClose = () => {this.setState({
  							 modalShow: false,
  							 reoccuring: false,
  							  })}
  	alertHideWorkout = ()=> {this.setState({ alertShowWorkout: false })}
  	alertHideDanger = ()=> {this.setState({ alertShowDanger: false })}
	alertShow = ()=> {this.setState({ alertShow: true })}
	alertHide = ()=> {this.setState({ alertShow: false })}
	onChangeReoccuring = (event)=>{this.setState({reoccuring : !this.state.reoccuring})}


	// Checkout the exercises
	onDoubleClick = (event)=>{		
		let doubleClickTask = this.state.tasks.filter((task)=>{
			return task.id == event.target.id
		})
		{this.setState({
			doubleClickTask: doubleClickTask[0],
			modalShowWorkout: true,
		
			  })}
	}
	onDoubleClick1 = (task,event)=>{
		{this.setState({
			doubleClickTask: task,
			modalShowWorkout: true,
		
			  })}
	}
	modalCloseWorkout = () => {this.setState({
							 modalShowWorkout: false,
					
							  })}
    //Drag and Drop


  ondragstartTask= (task,event)=>{
    	event.dataTransfer.setData("text/plain", task);
		event.currentTarget.style.border = "dashed"
		event.currentTarget.style.opacity = "0.4"
		this.setState({
			currentCalendarMemory:this.state.calendarMemory,
			selectedTask : task,
			tempInvalidDiv:this.tempInvalidDivs(this.state.calendarMemory,task),
			drag:true,
			drop:false,
		})

	}	
		
	ondragstartLockedInDiv= (info,event)=>{
		const [taskInfo,dateInfo] = info
		event.dataTransfer.setData("text/plain", info);
		event.currentTarget.style.opacity = "0"
		let update = this.calendarMemoryReplace(this.state.calendarMemory,dateInfo,taskInfo,null,this.state.tempInvalidDiv,this.state.tasks)
		this.setState({
			currentCalendarMemory:update.removeTask,
			insideSchedule : true,
			selectedTask : taskInfo,
			tempInvalidDiv:this.tempInvalidDivs(update.removeTask,taskInfo),
			drag:true,
			drop:false,
			change:true,
		})		
	}
	ondragenter = (event)=>{
		if(event.target.className === "scheduleTable"){		

			let idEvent = event.target.id	
			this.setState({
				drag:true,
				drop:false,
				dragId:idEvent,
				dropId:"",
				dayId: event.target.parentElement.id,
				insideSchedule:true,	
				insideTask:false,
			
			})		
		}else if(event.target.className ==="scheduleColumn"){
			this.setState({
				dayId : event.target.id,
				insideTask:false,
				
			})
		}else if(event.target.className === "lockedInDiv"){
			event.target.style.zIndex="-1"
		}
		else if (event.target.className === "task"){

			this.setState({
			insideTask:true,
			insideSchedule:false,
			})
		}
		else if(event.target.id ==="rubbish"){
			event.target.style.opacity = "0.5"
		}


		 
	}
	ondragover = (event)=>{
		event.preventDefault();
	}
	ondragleave = (event) =>{
		if(event.target.className === "scheduleTable"){
			if(event.target.style.backgroundColor === "rgba(23, 126, 14, 0.3)"){
				event.target.style.backgroundColor = "inherit"}
		}else if(event.target.className === "lockedInDiv"){
			event.target.style.zIndex="2"
		}else if(event.target.className ==="scheduleColumn"){
		
			this.setState({
				dayId : "",
			})	
		}else if (event.target.className === "task"){	
			this.setState({
			insideTask:false,
			})				
		}else if(event.target.id ==="rubbish"){
			event.target.style.opacity = "1"
		}

	}
	ondrop = (event)=>{
		let classNames = event.target.className.split(" ")
		//when dropping into the schedule
		if(classNames.indexOf("lockedInDiv")>=0 || event.target.className==="scheduleTable"){
			event.preventDefault();
			let id = event.dataTransfer.getData("text/plain")
			let idEvent = ""
			classNames.indexOf("lockedInDivP")>=0?idEvent = event.target.parentElement.id/1000:idEvent = event.target.id/1000
			if(event.target.className==="scheduleTable"){idEvent=event.target.id}	
			event.target.style.backgroundColor = "inherit"
			event.target.style.zIndex="2"
			
			// if it lands on the same id? now u must replace 

			let replace = this.calendarMemoryReplace(this.state.currentCalendarMemory,this.state.dayId,this.state.selectedTask,idEvent,this.state.tempInvalidDiv,this.state.tasks)
			let updateCalendarMemory = this.calendarMemoryAdd(this.state.currentCalendarMemory,this.state.dayId,this.state.selectedTask,idEvent)
			if (replace.tasks === null){
				this.setState({
					drag:false,
					drop:true,
					dragId:"",
					dropId:idEvent,
					tasks:this.state.tasks.filter((eachTask)=> eachTask.id!==this.state.selectedTask.id),
					insideSchedule:true,
					insideTask:false,
					selectedTask : "",
					calendarMemory:updateCalendarMemory,
					currentCalendarMemory:[],
					change:false,
			})
			}else if(replace.tasks !== null){
				this.setState({
					drag:false,
					drop:true,
					dragId:"",
					dropId:idEvent,
					tasks:replace.tasks,
					insideSchedule:true,
					insideTask:false,
					selectedTask : "",
					calendarMemory:replace.updateCalendarMemory,
					currentCalendarMemory:[],
					change:false,
			})
			}
			
		//when dropping into the task
		}else if (event.target.className === "task"){
		
			event.preventDefault();
			if (this.state.tasks.every((eachTask)=> eachTask.id!==this.state.selectedTask.id)===true){
				this.setState({
				tasks:[this.state.selectedTask,...this.state.tasks],
				drag:false,
				drop:false,
				insideTask:true,
				insideSchedule:false,
				dragId:"",
				selectedTask : "",
				dropId:"",
				calendarMemory:this.state.currentCalendarMemory,
				currentCalendarMemory:[],
				change:false,

				})
				setTimeout(this.setState({insideTask:false,}),2000)
			}
		}
		// if drops in rubbish bin
		else if(event.target.id==="rubbish"){
			event.target.style.opacity = "1"
			this.setState({
				tasks:this.state.tasks.filter((task)=>task.id!==this.state.selectedTask.id),
				drag:false,
				drop:false,
				insideTask:false,
				insideSchedule:false,
				dragId:"",
				selectedTask : "",
				dropId:"",
				calendarMemory:this.state.currentCalendarMemory,
				currentCalendarMemory:[],
				change:false,
				})

		}
		else{
				this.setState({
					insideTask:false,
					insideSchedule:false,
					drag:false,
					drop:false,

				})
				

			}
			
			
			
	}
		
	render(){

		return(

			<MyContext.Provider 
				value = {{
					state: this.state,
					up: this.up,
					down: this.down,
					changeMonth: this.changeMonth,
					handleChange: this.handleChange,
					onSubmit: this.onSubmit,
					onCelllighter:this.onCelllighter,
					ondragstartTask:this.ondragstartTask,
					ondragstartLockedInDiv:this.ondragstartLockedInDiv,
					ondragenter:this.ondragenter,
					ondragover:this.ondragover,
					ondragleave:this.ondragleave,
					ondrop:this.ondrop,
					invalidDivsCalendarMemory:this.invalidDivsCalendarMemory,
					onChange:this.onChange,
					onChangeTime:this.onChangeTime,
					onSubmitModal:this.onSubmitModal,
					handleShow:this.handleShow,
					modalClose:this.modalClose,
					alertShow:this.alertShow,
					alertHide:this.alertHide,
					alertHideDanger:this.alertHideDanger,
					alertHideWorkout:this.alertHideWorkout,
					onChangeReoccuring: this.onChangeReoccuring,
					onDoubleClick : this.onDoubleClick,
					onDoubleClick1 : this.onDoubleClick1,
					modalCloseWorkout:this.modalCloseWorkout,



			}}>
				{this.props.children}
			</MyContext.Provider>
			)
	}
}

export const Consumer = MyContext.Consumer

