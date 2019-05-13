import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"
import moment from "moment"
import Time from "./Time"
import Column from "./Column"


class Daily extends Component {
	
	Daily = Radium(Daily)
	
	render(){
		
		document.body.scroll = "no";
		return(
			<Consumer>
				{(context)=>{
					
					const header = this.props.week.map((date,index)=><p key={index} style={styles.h2}>{date.format("ddd, D MMM")}</p>)
					const body = this.props.week.map((date,index)=><Column scheduleColumnId = {moment(date).format("Y-MMMM-D")} key={index}/>)
					return(
					
					<React.Fragment>
						<div id="dailyTable" style = {{...styles.table}} >	
							<div style ={styles.header}>
								<p style={styles.h2}>{moment(this.props.week[0]).format("W")}</p>
								{header}
							</div>
							<div style ={styles.scheduleSection}>
								<div style={styles.timeColumn}>
									<Time week = {this.props.week[0]}/>
								</div>	
								
								{body}
								
								
							</div>
						</div>
					</React.Fragment>
						)
				}}	
			</Consumer>
			);
	}
}

export default Daily

let styles = {
	table:{
		position:"relative",
		display:"flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems:"stretch",
		height:"95vh",
		width:"90%",
		margin:"auto",
		borderTop:"none",
		flexWrap:"wrap",
		alignContent:"flex-start",
		overflowY:"scroll",
	},
	header:{
		height:"10%",
		display:"inline-flex",
		width:"100%",
	 	position: "sticky",
	 	marginBottom:"0px",
	 	top: "0",
	 	backgroundColor:"white",
	 	zIndex:"5",

	},
	scheduleSection:{
		width:"100%",
		display:"inline-flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems:"stretch",

	},
	h2:{
		position:"static",
		fontSize:"10px",
		margin:"10px 10px",
		width:"12.5%"
	},
	timeColumn:{
		width:"12.5%",
		marginLeft: "10px",
		

	},

	
	
}