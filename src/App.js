import React, { Component } from 'react';
import './App.css';
import CalendarPage from "./CalendarPage"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from './MyContext';




class App extends Component {

  App={
    padding:"20px",
    display:"flex",
    flexDirection: "row"

}

  render() {
    return (
    <Provider>
      <MuiThemeProvider>
      <div style={this.App}>
        <div style={this.navbar}></div>      
        <CalendarPage/>
 
      </div>
      </MuiThemeProvider>
     </Provider>
    );
  }
}

export default App
