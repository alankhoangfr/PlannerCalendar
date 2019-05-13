import React, { Component } from 'react';
import './App.css';
import Calendar from "./components/calendar/Calendar"
import Tasks from "./components/calendar/Tasks/Tasks"
import AddRemoveTask from "./components/calendar/Tasks/AddRemoveTask"
import Schedule from "./components/calendar/Schedule/Schedule"

class CalendarPage extends Component {

  left={
    width:"300px",    
    display :"flex",
    flexDirection:"column",
    height:"100vh",
    

  }
   right={    
   	height:"100%",
   	width:"100%",
    padding:"20px",
    
   	}
  render() {
  

    return (
     	<React.Fragment>
	        <div style={this.left}>
	            <Calendar/>
	            <Tasks/>
              <AddRemoveTask/>
	        </div>
	        <div style={this.right}>
	        	<Schedule/>
	        </div>
  
      	</React.Fragment>
     
    );
  }
}

export default CalendarPage;
