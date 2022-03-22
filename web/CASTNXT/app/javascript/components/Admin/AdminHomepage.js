import React, {Component} from 'react'
import Header from '../Navbar/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

class AdminHomepage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        let borderstyle = {
            border: '1px solid black',
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px'
        }
        
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div style={{marginTop: '3%', backgroundColor: 'white'}}>
                    <h1>Admin Homepage</h1>
                    

                    <div className="container" style={{ backgroundColor: 'gray', height: '80vh', width: '50vw', paddingTop: '1%' }}>
                        
                        <div style={{ color: 'white' }}>
                            <Tabs variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                <Tab style={borderstyle} label="Performers" />
                                <Tab style={borderstyle} label="Forms" />
                                <Tab style={borderstyle} label="Stacks" />
                                <Tab style={borderstyle} label="Curated" />
                                <Tab style={borderstyle} label="Final List" />
                            </Tabs>
                            <br />
                        </div>
    
                        <br />
                        <p>Use this page to sign up for events and check to see if you've been selected for an event</p>
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead style={{ backgroundColor: '#3498DB' }}>
                                            <TableRow>
                                                <TableCell align="center">Event</TableCell>
                                                <TableCell>Form Link</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center">Test</TableCell>
                                                <TableCell>Link</TableCell>
                                                <TableCell>Pending</TableCell>
                                            </TableRow>
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