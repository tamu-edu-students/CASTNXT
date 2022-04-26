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
import Alert from '@mui/material/Alert';
import axios from 'axios';

class AdminCreateStack extends Component {
    constructor(props) {
        super(props)
        
        // console.log("Rails properties", properties)

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
            client: '',
            page:0,
            rowsPerPage: 1,
            stackCreateSuccess: "",
            responseMessage: ""
        }
    }
    
    componentDidMount() {
      let entries = []
      let slides = properties.data.slides
      let schema = this.state.schema

      schema['title'] = properties.data.title
      schema['description'] = properties.data.description
      
      for(var key in slides) {
        entries.push({
          ...slides[key],
          id: key
        }) 
      }
      
      this.setState({
        entries: entries,
        schema: schema,
      })
    }
    
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    
    addToStack = (row) => {

      let curStack = this.state.entries
      
      for(var i=0; i<curStack.length; i++) {
        if(curStack[i]['id'] === row['id']) {
          curStack[i]['curated'] = !curStack[i]['curated']
        }
      }
      
      this.setState({
        entries: curStack
      })
      
    }
    
    makeStack = () => {
      let curStack = this.state.entries
      let stack = []
      
      for(var i=0; i<curStack.length; i++) {
        if(curStack[i]['curated']) {
          stack.push(curStack[i])
        }
      }
      
      this.setState({
        curatedStack: stack,
        showStack: true
      }, () => {
        // document.getElementById('curated').focus()
        window.location.hash = "#curated"
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
    
    makeMasterStack = () => {
      let curatedStack = this.state.curatedStack
      
      for(var i=0; i<curatedStack.length; i++) {
        console.log(properties.data.slides[curatedStack[i].id])
        properties.data.slides[curatedStack[i].id]['curated'] = true
        
      }
      
      const baseURL = window.location.href.split('#')[0]
      console.log(baseURL)
      
      const payload = {
        clients: properties.data.clients,
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
        
        return(
            <div>

                <div style={{marginTop: '1%'}}>
                    <p>Use this page to create a master slide deck for this event.</p>
                    
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
                                              
                                              <div style={{textAlign: 'right'}}>
                                                {!row.curated? (
                                                  <Button onClick={() => this.addToStack(row)} variant="contained" color="success">Add</Button>
                                                ) : (
                                                  <Button onClick={() => this.addToStack(row)} variant="contained" color="error">Remove</Button>
                                                )}
                                              </div>
                                              
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

                      <Button variant="contained" onClick={this.makeStack}>Make Stack</Button>
                      
                      <br /><br />
                      
                      {this.state.showStack &&
                        <div tabIndex="-1" id="curated">
                        <hr />
                          <table>
                            <thead>
                              <tr><td>Current Stack</td></tr>
                            </thead>
                            <tbody>
                              {this.state.curatedStack.map((row, index) => {
                              console.log(row)
                                  return(
                                    <tr key={index}>
                                      <td>{row.talentName}</td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                          <br />
                          
                          <Button variant="contained" onClick={this.makeMasterStack}>Submit</Button><br /><br />
                          <hr />
                        </div>
                      }
                      
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

export default AdminCreateStack