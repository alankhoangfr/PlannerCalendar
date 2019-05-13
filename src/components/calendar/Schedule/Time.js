import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"
import moment from "moment"



class Time extends Component {
	
	Time = Radium(Time)
	
	render(){
		const midnight= Object.assign({},moment().startOf("day"))
	
		return(
			<Consumer>
				{(context)=>{
					const timeRow = []
						timeRow.push(
								<div key={0} style={{...styles.td}}>
								<p style={{...styles.time}}>{moment(midnight).format("hh:mm a")}</p>
								</div>)
		
					for (let i = 1; i<96;i++){
						
						if (i%4===0){
							timeRow.push(
									<div style={{...styles.td}} key={i} >
										<p style={{...styles.time}}>{moment(midnight).add(i/4,"hour").format("hh:mm a")}</p>					
									</div>)
						}else{
							timeRow.push(
									<div key={i}  style={{...styles.td}}>
									</div>
								)
						}
					}
				const time = timeRow.map((row)=>row)

					return(
						
					<React.Fragment>
						{time}
					</React.Fragment>
						)
				}}	
			</Consumer>
			);
	}
}

export default Time

let styles = {
	h2:{
		position:"static",
		fontSize:"20px",
		marginLeft:"15px",
	},
	td:{
		height:"17px",
		paddingLeft:"0px",
		paddingRight:"0px",
		fontSize:"10px",

		color:"rgba(29,39,49,0)",
		borderTop: "1px dotted black",
		
	},
	time:{
		color:"blue",
		padding:"0",
		margin:"0",
	
		float:"left",
		marginBottom:"0",
		height:"100%",
	},
}