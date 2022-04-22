import React, {Component} from 'react'
import Header from '../Navbar/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

class AdminHomepage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tableData: []
        }
    }
    
    componentDidMount() {
        this.getEvents()
    }
    
    getEvents() {
        axios.get("/user/events")
            .then((res) => {
                this.setState({
                    tableData: res.data.tableData
                })
            })
            .catch((err) => {
                if (err.response.status == 403) {
                    window.location.href = err.response.data.redirect_path;
                } else {
                    console.log("Unable to contact server.")
                }
            })
    }
    
    renderEventList = () => {
        const { tableData } = this.state
        let rows = []
        
        // tableData.push({
        //     eventId: 1,
        //     event: 'Fashion Show',
        //     status: 'Registration Open'
        // })
        
        if (!tableData.length) {
            rows.push(
                 <TableRow key={0}>
                    <TableCell colSpan={2} align="center">
                        No ongoing Events right now.
                    </TableCell>
                 </TableRow>
            )
        } else {
            tableData.map((event, i) => {
                rows.push(
                    <TableRow key={i}>
                        <TableCell align="center" onClick={() => {window.location.href="/admin/event/"+event.eventId}}>
                            <b><a href={"/admin/event/"+event.eventId}>{event.event}</a></b>
                        </TableCell>
                        <TableCell>{event.status}</TableCell>
                    </TableRow>
                )
            });
        } 
        return rows;
    }
    
    createEventRedirection = () => {
        window.location.href = 'admin/create-event'
    }

    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div>
                    <div className="container user-events">
                        <div className="row">
                            <h1> FashioNXT Events </h1>
                        </div>
                        <div className="row">
                            <div style={{marginBottom: 20}}>
                                <Button variant="contained" onClick={this.createEventRedirection}>Create New Event</Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead style={{ backgroundColor: '#3498DB' }}>
                                            <TableRow>
                                                <TableCell>Event</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.renderEventList()}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHomepage