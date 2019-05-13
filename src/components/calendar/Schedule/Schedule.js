import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"
import moment from "moment"
import Daily from "./Daily"



class Schedule extends Component {
	Schedule = Radium(Schedule)
	render(){
		
		return(
			<Consumer>

				{(context)=>{
					let dateSelected = ""
					let week = []
					if(context.state.highlight[0]===false){
						const today = Object.assign({},context.state.today)
						let start = moment(today).startOf("week")
						week.push(start)
						for (let i = 0;i<6;i++){
							week.push(moment(start).add(i+1,"days"))

						}}
					else{
						let start = context.state.highlight[4].startOf("week")
						week.push(start)
						for (let i = 0;i<6;i++){
							week.push(moment(start).add(i+1,"days"))
						}}
				
					return(
						
						<div style = {styles.outside}>							
							<Daily 
								week = {week}/>
						</div>
						)
				}}	
			</Consumer>
			);
	}
}

export default Schedule

let styles = {
	outside:{
		height:"100%",
		width:"100%",
		border:"1px solid black",
		overflowY:"scroll",
		
	},



}