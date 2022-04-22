import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import Form from '@rjsf/core';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';

class UserEventRegister extends Component {
    constructor(props) {
        super(props)
        
        console.log(properties)

        this.state = {
            eventId: properties.data.id,
            title: properties.data.title,
            description: properties.data.description,
            schema: properties.data.schema,
            uischema: properties.data.uischema,
            formData: properties.data.formData !== undefined ? properties.data.formData : {},
            registerStatus: ''
        }
    }
    
    submitForm = () => {
        console.log(this.state.formData)
        const baseURL = window.location.href

        axios.post(baseURL + "/slides", {
            formData: JSON.stringify(this.state.formData)
        })
        .then((res) => {
            console.log("Success", res.data)
            
            this.setState({
                registerStatus: 204
            })
            
            setTimeout(() => {
                window.location.href = "/user"
            }, 2500)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        
        return(
            <div className="container user-events">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h3>Event Registration</h3>
                        <br />
                        
                        <div className="form-preview">
                            <h3>{this.state.title}</h3>
                            <span>{this.state.description}</span>
                            <Form
                              schema={this.state.schema}
                              uiSchema={this.state.uischema}
                              onChange={(newFormData) => this.setState((prevState) => {
                                  return {
                                      ...prevState,
                                      formData: newFormData.formData
                                  }
                              })}
                              formData={this.state.formData}
                              onSubmit={this.submitForm}
                            />
                        </div>
                        
                        {(this.state.registerStatus !== '' && this.state.registerStatus===204) &&
                            <div>
                                <br />
                                <Alert severity="success">Succesfully registered for the event</Alert>
                            </div>
                        }
                        
                        {(this.state.registerStatus !== '' && this.state.registerStatus!==204) &&
                            <div>
                                <br />
                                <Alert severity="error">Error: Could not register for the event due to an error</Alert>
                            </div>
                        }
                        
                        <Button variant="outlined"><Link to={{pathname: '/user', state: {}}}>Back</Link></Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserEventRegister)