import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../Navbar/Header';
import FormBuilderContainer from '../Forms/FormBuilder.js'
import Form from '@rjsf/core';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Button from '@mui/material/Button';
import { MultiSelect } from "react-multi-select-component";
import Alert from '@mui/material/Alert';
import axios from 'axios';

class AdminCreateClientStack extends Component {
    constructor(props) {
        super(props)
        
        console.log("Rails properties", properties)

        this.state = {
            redirect: "",
            title: properties.data.title,
            description: properties.data.description,
            schema: properties.data.schema !== undefined ? properties.data.schema : [],
            uiSchema: properties.data.uischema !== undefined ? properties.data.uischema : [],
            formData: [],
            entries: [],
            curatedStack: [],
            showStack: false,
            clients: [],
            page:0,
            rowsPerPage: 1,
            clientOptions: [],
            clientSelections: [],
            stackCreateSuccess: "",
            responseMessage: ""
        }
    }
    
    componentDidMount() {
        let entries = []
        let slides = properties.data.slides
        let schema = this.state.schema
        let clientOptions = []
        let clients = properties.data.clients
  
        schema['title'] = properties.data.title
        schema['description'] = properties.data.description
      
        for(var key in slides) {
          entries.push({
            ...slides[key],
            id: key,
            clients: []
          }) 
        }

        entries = entries.filter(row => row['curated'] === true)
        
        
        for(var key in clients) {
          clientOptions.push({
            label: clients[key].name,
            value: key
          }) 
        }
        
        this.setState({
            entries: entries,
            clientOptions: clientOptions
        })
        
    }
    
    // handleChange = (e) => {
    //   this.setState({
    //     [e.target.name]: e.target.value
    //   })
    // }
    
    back = () => {
        this.setState({
            redirect: 'admin'
        })
    }
    
    handleClientChange = (clients, row) => {
      
      let i, entries = this.state.entries
      
      for(i=0; i<entries.length; i++) {
        if(entries[i].id === row['id']) {
          entries[i]['clients'] = clients
        }
      }
      console.log(entries)
      
      this.setState({
        entries: entries,
      })
    }
    
    handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage
      })
    };
    
    handleChangeRowsPerPage = (event, num) => {
      console.log(event.target.value)
      this.setState({
        rowsPerPage: event.target.value
      })
    }
    
    // handleSelect(selectedItems) {
    //   this.setState({ selectedItems: selectedItems });
    // }
    
    updateClients = () => {
      let entries = this.state.entries
      let clients = properties.data.clients
      
      for(var i=0; i<entries.length; i++) {
        let entry_clients = entries[i].clients
        
        for(var j=0; j<entry_clients.length; j++) {
          clients[entry_clients[j].value].slideIds.push(entries[i].id)
        }
      }
      
      const payload = {
        clients: clients,
        slides: properties.data.slides
      }
      
      axios.post(baseURL+"/slides/", payload)
      .then((res) => {
        console.log("Success")
        
        this.setState({
          stackCreateSuccess: true 
        })
      })
      .catch((err) => {
        console.log("Failure")
        
        this.setState({
          stackCreateSuccess: false 
        })
      })
    }

    render() {
        
        if(this.state.redirect === "admin") {
            return <Redirect to='/admin'/>;
        }
        
        return(
            <div>
                
                <div style={{marginTop: '1%'}}>
                
                    <p>Use this page to create client-specific slide decks</p>

                    <div>

                        <div className="col-md-8 offset-md-2">
                          <Paper>
                            <TableContainer>
                              <Table size="medium">
                                <TableBody>
                                  {this.state.entries
                                      .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                      .map((row, index) => {
                                        return(
                                          <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >

                                            <TableCell>
                                              <Form
                                                schema={this.state.schema}
                                                uiSchema={this.state.uiSchema}
                                                formData={row.formData}
                                                children={true}
                                              />
                                              
                                              <br />
                                              
                                              Clients:
                                              <MultiSelect
                                                options={this.state.clientOptions}
                                                value={row['clients']}
                                                onChange={(option) => this.handleClientChange(option, row)}
                                              />
                                              
                                            </TableCell>
                                            
                                          </TableRow>
                                        )
                                    })
                                  }
                                </TableBody>
                                
                                <TableFooter>
                                  <TableRow>
                                    <TablePagination
                                      rowsPerPageOptions={[1, 2]}
                                      count={this.state.entries.length}
                                      rowsPerPage={this.state.rowsPerPage}
                                      page={this.state.page}
                                      onRowsPerPageChange={this.handleChangeRowsPerPage}
                                      onPageChange={this.handleChangePage}
                                    />
                                  </TableRow>
                                </TableFooter>
                                
                              </Table>
                            </TableContainer>
                          </Paper>
                        </div>
                        
                        <br />

                        <Button variant="contained" onClick={this.updateClients}>Update</Button><br />
                        
                        {(this.state.stackCreateSuccess !== "" && this.state.stackCreateSuccess) && 
                          <div className="col-md-6 offset-md-3">
                            <br />
                            <Alert severity="success">{this.state.responseMessage}</Alert>
                            <br />
                          </div>
                        }
                        
                        {(this.state.stackCreateSuccess !== "" && !this.state.stackCreateSuccess) &&
                            <div className="col-md-6 offset-md-3">
                              <br />
                              <Alert severity="error">Error: {this.state.responseMessage}</Alert>
                              <br />
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminCreateClientStack