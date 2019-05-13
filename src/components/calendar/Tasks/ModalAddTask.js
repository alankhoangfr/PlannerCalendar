import React, {Component} from "react"
import Radium from "radium"
import {Modal, Button, Form} from "react-bootstrap"
import moment from "moment"
import TimePicker from 'react-times';
import uniqid from "uniqid"
import {Consumer} from "../../../MyContext"
import 'react-times/css/classic/default.css';



class ModalAddTask extends React.Component {
  ModalAddTask=Radium(ModalAddTask)
  constructor (props){
    super(props)
  }



  render() {
    return (
      <Consumer>
        {(context) => {


        	return(
      <Modal
        show = {context.state.modalShow}
        onHide = {context.modalClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title >
            Add an Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id = "form1" onSubmit={context.onSubmitModal}>
            <div  style={styles.event}  >
              <div style={styles.input}><label   style={styles.label}>Appointment</label><input required onChange={context.onChange}  name="event" type="radio" value="Appointment"/> </div>
              <div style={styles.input}><label  style={styles.label}>Workout </label> <input required onChange={context.onChange} name="event" value="Workout" type="radio"  /></div>
            </div>           
             {context.state.event==="Appointment"?
               <div>
               <div style={styles.date}>
               	 <label> Reoccuring </label>
                 <input  name="reoccuring" type="checkbox" onClick={context.onChangeReoccuring}/>
                 <input  name="date" type="date" min={moment().format("YYYY-MM-DD")} value={context.state.date} onChange={context.onChange} required/>
                 {context.state.reoccuring === true?
                 	<div >
                 		<select name="reoccuringFrequence" onChange={context.onChange} style={styles.inside}>
						  <option value= {1} >Daily</option>
						  <option value={7}>Weekly</option>
						  <option value={30}>Monthly</option>
						</select>
						 <label style={styles.inside}> Until </label>
						 <input  style={styles.inside} name="dateEnd" type="date" min={moment().format("YYYY-MM-DD")} value={context.state.dateEnd} onChange={context.onChange} required/>
                 	</div>:null}
               </div>
                <div style={styles.timepicker}>
                  <TimePicker  colorPalette="light" timeMode="24" theme="classic" timeFormat='h:mm' onTimeChange={context.onChangeTime} time={context.state.time} required/>
                </div>
                
                <div style={styles.comment}>
                  <label  style={styles.labelComment}>Comments</label>
                  <textarea style = {styles.commentBox} name="comment" rows="5" cols="25" value={context.state.comment} onChange={context.onChange}></textarea>
                </div>
                </div>:
                <div>
                  <label  style={styles.labelComment}>Name</label>
                   <input  name="name" type="text"  value={context.state.name} onChange={context.onChange} required/>
                   <label  style={styles.labelComment}>Duration</label>
                   <input  name="duration" type="number" min="0.5" max="6" step="0.5"  value={context.state.duration} onChange={context.onChange} required/>
                   <div style={styles.comment}>
                  <label  style={styles.labelComment}>Exercises</label>
                  <textarea style = {styles.commentBox} name="exercises" rows="5" cols="25" value={context.state.exercises} onChange={context.onChange} required></textarea>
                </div>
                </div>}
            
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="form1" onSubmit={context.onSubmitModal}>Save</Button  >
          <Button onClick={context.modalClose}>Close</Button>
        </Modal.Footer>
      </Modal>)
      }}
    
      </Consumer>
    );
  }
}

export default ModalAddTask


let styles={
  event:{
    display:"flex",
    justifyContent:"center",
  },
  input:{
  	textAlign:"center",
    width:"40%",
    padding:"5px",
  },
  label:{
    padding: "10px",
  },
   date:{

    display:"flex",
    flexDirection: "row",
    justifyContent:"space-evenly",
    marginBottom:"10px",

  },
  inside:{
  	marginRight:"25px"
  },
  timepicker:{
  	marginTop:"25px"
  },
  comment:{
     display:"flex",
    flexDirection: "column",
  },
  commentBox:{
    width:"80%",
    margin:"10px auto",
  },
  labelComment:{
  	marginRight:"20px",
    marginLeft:"10%",
    marginBottom:"20px",
    marginTop:"20px"
  }
}