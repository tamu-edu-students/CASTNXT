import React, {useState, Component} from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MuiAlert from '@mui/material/Alert';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button"

import FilterEvents from "../Filter/FilterEvents";
import CityFilter from "../Filter/CityFilter";

import {UsStates, getCities} from '../../utils/FormsUtils';

import Header from "../Navbar/Header";

const commonStyle = {marginTop: "20px", marginBottom: "20px"}

class UserHomepage extends Component {
    
    constructor(props) {
        super(props)
        
        const submittedTableData = properties.submittedTableData || []
        const eventDeletedFlag = submittedTableData.find((event)=>{
            if(event.status === 'DELETED'){
                let currTime = new Date();
                let updatedTime = new Date(event.delete_time);
                return (currTime.getTime() - updatedTime.getTime())/(1000 * 3600 * 24) <7;
            }
        }) 

        this.state = {
            acceptingTableData: properties.acceptingTableData ? properties.acceptingTableData : [],
            submittedTableData: properties.submittedTableData ? properties.submittedTableData : [],
            eventDeletedFlag,
            tabValue: 0,
            filterTextValue: 'All', 
            stateName: '', 
            cityName: '', 
            filteredTableData: properties.acceptingTableData ? properties.acceptingTableData : []
        }
    }
    
    handleTabChange = (event, value) => {
        this.setState({
            tabValue: value
        })
    }
    
    handleLocationFilterChange = (cityName, stateName) =>{
        this.setState({
            stateName,
            cityName
        })
    }
    
    onSubmit = () => {
        let tableDataCopy = this.state.acceptingTableData;
        console.log(tableDataCopy)
        //let finalValues = tableDataCopy.filter((event) => this.state.filterTextValue === 'All' ? true: this.state.filterTextValue === event.category)
        let finalValues = tableDataCopy.filter((event) => {
            if(this.state.filterTextValue == 'Fashion') {
                return event.category === 'Fashion';
            } else if (this.state.filterTextValue == 'Music') {
                return event.category === 'Music';
            } else if (this.state.filterTextValue === 'Performing Arts') {
                return event.category === 'Performing Arts';
            } else if (this.state.filterTextValue === 'Other') {
                return event.category === 'Other'
            } else if (this.state.filterTextValue === 'All') {
                return event
            }
        })
        console.log(finalValues)
        let stateFilteredValues = null
        if(this.state.stateName){
            console.log(this.state.stateName)
            stateFilteredValues = finalValues.filter((event) => {
                return event.statename === this.state.stateName
            })
            finalValues = stateFilteredValues
            console.log(finalValues)
        }
        if(this.state.cityName){
            console.log(this.state.cityName)
            let applyFilter = stateFilteredValues ? stateFilteredValues : finalValues;
            //finalValues = applyFilter.filter((event) => this.state?.cityName === event.location)
            stateFilteredValues = finalValues.filter((event) => {
                return event.location === this.state.cityName
            })
            console.log(finalValues)
        }
        this.setState({
            filteredTableData: finalValues
        })
    }
    
    onFilterValueSelected = (filterValue) =>{
        this.setState({
            filterTextValue: filterValue
        })
    }
    
    renderAcceptingEventList() {
        const { acceptingTableData, filteredTableData } = this.state
        
        let rows = []
        if (!filteredTableData.length) {
            rows.push(
                 <TableRow key={0}>
                    <TableCell align="center">
                        No ongoing Events right now.
                    </TableCell>
                 </TableRow>
            )
        } else {
            filteredTableData.map((event, i) => {
                rows.push(
                    <TableRow key={i}>
                        <TableCell align="center" onClick={() => {window.location.href="/user/events/"+event.id}}>
                            <b><a href={"/user/events/" + event.id}>{event.title}</a></b>
                        </TableCell>
                    </TableRow>
                )
            });
        } 
        return rows;
    }
    
    renderSubmittedEventList(type) {
        const { submittedTableData } = this.state
        
        let rows = []
        if (!submittedTableData.length) {
            rows.push(
                 <TableRow key={0}>
                    <TableCell colSpan={2} align="center">
                        No Events submitted to right now.
                    </TableCell>
                 </TableRow>
            )
        } else {
            submittedTableData.map((event, i) => {
                if (event.accepting) {
                    rows.push(
                        <TableRow key={i}>
                            <TableCell align="center" onClick={() => {window.location.href="/user/events/"+event.id}}>
                                <b><a href={"/user/events/" + event.id}>{event.title}</a></b>
                            </TableCell>
                            <TableCell align="center">
                                {event.status}
                            </TableCell>
                        </TableRow>
                    )
                } else {
                    rows.push(
                        <TableRow key={i}>
                            <TableCell align="center">
                                <b>{event.title}</b>
                            </TableCell>
                            <TableCell align="center">
                                {event.status}
                            </TableCell>
                        </TableRow>
                    )
                }
            });
        } 
        return rows;
    }

    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <div className="container user-events">
                        {
                            this.state.eventDeletedFlag ? <MuiAlert onClick={() => (this.setState({eventDeletedFlag: false}))} severity="warning" elevation={6} variant="filled">Note: Certain events have been cancelled. Please check submissions for more details. Sorry for the inconvenience.</MuiAlert> : null
                        }
                        <div className="row">
                            <h2> FashioNXT Events </h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div>
                                    <Tabs variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                        <Tab style={{focus: "color: #719ECE"}} label="Events" />
                                        <Tab label="Submissions" />
                                    </Tabs>
                                    <hr style={{ color: "black" }} />
                                </div>
                                
                                <div><b>Category Filter</b></div>
                                <FilterEvents filterValueSelected = {this.onFilterValueSelected}></FilterEvents>
                                
                                <CityFilter handleLocationFilterChange = {this.handleLocationFilterChange}></CityFilter>
                                
                                <Button onClick = {this.onSubmit}>Submit Query</Button> 
                            
                                {this.state.tabValue === 0 &&
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead style={{ backgroundColor: "#3498DB" }}>
                                                <TableRow>
                                                    <TableCell align="center" style={{fontSize: "12pt"}}>Events</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <div id='eventList'>{this.renderAcceptingEventList()}</div>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                                
                                {this.state.tabValue === 1 &&
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead style={{ backgroundColor: "#3498DB" }}>
                                                <TableRow>
                                                    <TableCell align="center" style={{fontSize: "12pt"}}>Event</TableCell>
                                                    <TableCell align="center" style={{fontSize: "12pt"}}>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.renderSubmittedEventList()}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHomepage