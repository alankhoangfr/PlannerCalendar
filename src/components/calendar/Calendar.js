import React , {Component} from "react"
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';
import Radium from "radium"
import { Row,Col, Form, Button, OverlayTrigger,Popover, FormControl} from 'react-bootstrap';
import moment from "moment"
import {Consumer} from "../../MyContext"


class Calendar extends Component{
	Calendar = Radium(Calendar)
	weekday_names=moment.weekdaysShort()
	month_names=moment.months()
    month = (data) => {
        return data.format("MMMM")
    }
	firstDayOfMonth(data){
		let first =  data.startOf("month").format("d")
		return first
	}
    prevMonth = (data) =>{
    	let dataContentCopy = Object.assign({}, data);
        dataContentCopy = moment(dataContentCopy).subtract(1, "month");
	    return dataContentCopy
    } 
    nextMonth = (data) =>{
    	let dataContentCopy = Object.assign({}, data);
        dataContentCopy = moment(dataContentCopy).add(1, "month");
	    return dataContentCopy
    }
    isItMonth =(today,date)=>{
		let result =""
		if(moment(date).format("MMMM-Y")===moment(today).format("MMMM-Y")){
			result = true
		}else{result = false}
		return result
	}


    //Monthly Button

    //element
    element = (dataContent,today) =>{
    	let totalSlots = []
		const prevMonth = this.prevMonth(dataContent).daysInMonth()-parseInt(this.firstDayOfMonth(dataContent)-1)
		for(let i=0;i<this.firstDayOfMonth(dataContent);i++){
			if (this.isItMonth(today,this.prevMonth(dataContent))===true&& parseInt(moment(today).format('D')) === prevMonth+i){
				totalSlots.push(<TableRowColumn id="today" className= "lighter"style={{...styles.today,...styles.tableCellBase}}  key={i*2}>{prevMonth+i}</TableRowColumn>)
			}else{
				totalSlots.push(<TableRowColumn  className= "lighter" key={i*2}style={{...styles.tableCellBase}}>{prevMonth+i}</TableRowColumn>)
			}
			
		}
		for(let i=1;i<=dataContent.daysInMonth();i++){
			if (this.isItMonth(today,dataContent)===true&& parseInt(moment(today).format('D')) === i){
				totalSlots.push(<TableRowColumn id="today" style={{...styles.tableCellBase,...styles.today}} key={i*20}>{i}</TableRowColumn>)
			}else{
				totalSlots.push(<TableRowColumn style={styles.tableCellBase}key={i*20}>{i}</TableRowColumn>)
			}	
		}
		
		if(totalSlots.length<35){
			const upper = parseInt(35-totalSlots.length+1)
			for(let i=1;i<upper;i++){
				if (this.isItMonth(today,this.nextMonth(dataContent))===true&& parseInt(moment(today).format('D')) === i){
					totalSlots.push(<TableRowColumn  className= "lighter" id="today" key={i*30}style={{...styles.today,...styles.tableCellBase}}>{i}</TableRowColumn>)
				}else{
					totalSlots.push(<TableRowColumn   className= "lighter" key={i*30}style={{...styles.tableCellBase}}>{i}</TableRowColumn>)
				}
			}

		}else if(totalSlots.length>35){
			const upper = parseInt(42-totalSlots.length+1)
			for(let i=1;i<upper;i++){
				if (this.isItMonth(today,this.nextMonth(dataContent))===true&& parseInt(moment(today).format('D')) === i){
					totalSlots.push(<TableRowColumn  className= "lighter" id="today" key={i*30}style={{...styles.today,...styles.tableCellBase}}>{i}</TableRowColumn>)
				}else{
					totalSlots.push(<TableRowColumn   className= "lighter" key={i*30}style={{...styles.tableCellBase}}>{i}</TableRowColumn>)
				}
			}
		}
		
		function newTotalSlots (){
			let result = []
			let temp = []
			totalSlots.forEach((day,index)=>{
				if(index===totalSlots.length-1){
					temp.push(day)
					result.push(temp)
				}
				else if(index%7!==0||index===0){
					temp.push(day)
				}else if (index%7===0){
					result.push(temp)
					temp=[]
					temp.push(day)
				}
				
			})
			return result
		}
		
		let element = newTotalSlots().map((week,index)=>{
			return <TableRow style={styles.tableRow}key={(1+index)*10}>{week}</TableRow>
		})
		return element
    }
    //Table Header
    weekday = () =>{
    	return this.weekday_names.map((day)=><TableHeaderColumn style={styles.tableCellBase} key={day}>{day}</TableHeaderColumn>)
    }

  

	render(){
		return ( 
			
			<Consumer>
				{(context)=>{
					 const monthList=(
        				this.month_names.map((month)=><li style={styles.listMonths} onClick={context.changeMonth.bind(this,month)} key={month}>{month}</li>)
        				)
					const popoverMonth= (
						<Popover id="popover-trigger-click-root-close">
				    			<ul style={styles.listStyle} >{monthList}</ul>
				  		</Popover>
						)

    				return(
					<div>
						<div className= "row" >
							<div  className="col-xs-8 flex-column-inverse" >
								<Form  onSubmit={context.onSubmit}>
									<OverlayTrigger 
										trigger="click"  
										rootClose placement="bottom" 
										overlay={popoverMonth}>
				     						<Button style={styles.monthButton}>{this.month(context.state.dataContent)}</Button>
				     				</OverlayTrigger>
			     					<FormControl
			     						style={styles.yearInput}
			     						step="1"
			            				type="number"
			         					value={context.state.year}
			            				onChange={context.handleChange}
			            				max="2500"
			            				min="1000"
			          				/>
				          		</Form>
				          	</div>
				          	<div className="col-xs-4">
								<Form inline  >
									<Button  onClick={context.up}><i className="fas fa-angle-up"></i></Button>
									<Button  onClick={context.down}><i className="fas fa-angle-down"></i></Button>
								</Form>
							</div>
						</div>
						<Table 
							
							style={{ width: 300 }}
							onCellClick={context.onCelllighter}
							selectable={false}
							id="myTableId">
							<TableHeader
								displaySelectAll={false}
		            			adjustForCheckbox={false}>
							    <TableRow style={styles.tableRow}>
							     	{this.weekday()}
							    </TableRow>
		  					</TableHeader>
								<TableBody className ="cal"
									displayRowCheckbox={false}>
											{this.element(context.state.dataContent,context.state.today)}
								</TableBody>
						</Table>
					</div>
				);
				}}
				
				</Consumer>
			
		);
	}
}

export default  Calendar

var styles = {
monthButton:{
	lineHeight:"1.5",
	height:"34px",
	border: "1px solid #ccc",
    borderRadius: "4px",

}, 
listStyle:{
    	listStyleType: "none",
    	 paddingInlineStart: "0",
 },
 listMonths:{
 	':hover':{
    		backgroundColor: "#b6bcc2"
    	}
 },
 yearInput:{
	fontSize:"14px", 
	padding:"6px 10px", 
	height: "34px", 
	width:"80px" ,
	display:"inline-block",
	border: "1px solid #ccc",
	borderRadius: "4px",

    },
  //Table
  tableRow:{
  	height:"30px",
  },
  tableCellBase:{
  	paddingLeft:"10px",
  	paddingRight:"10px",
  	textAlign: "center",
  	height: "30px",
  },
    today:{
    	backgroundColor:"rgba(178,210,202, 0.5)",
    	fontWeight:"bold",
    },

};