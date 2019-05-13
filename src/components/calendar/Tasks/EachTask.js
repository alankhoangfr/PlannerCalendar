import React, {Component} from "react"
import Radium from "radium"
import {Consumer} from "../../../MyContext"

class EachTask extends Component {
	EachTask = Radium(EachTask)
	render(){
	

		return(
			<Consumer>
				{(context)=>{
					return(
						<React.Fragment>
							<p>{this.props.taskName}</p>
							<p>{this.props.duration} hours</p>
						</React.Fragment>
						)
				}}
				
			</Consumer>
			);
	}
}

export default EachTask

