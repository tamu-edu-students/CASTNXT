import React, {Component} from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

class AdminClientDecks extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            client: '',
            clientOptions: []
        }
    } 
    
    componentDidMount = () => {
        let clientOptions = []
        let clients = this.props.properties.data.clients
        
        for(var key in clients) {
            clientOptions.push(
                <MenuItem key={key} value={key}>{clients[key].name}</MenuItem>    
            )
        }
        
        this.setState({
            clientOptions: clientOptions
        })
    }
    
    handleClientChange = (clientSelection) => {
        console.log(clientSelection)
        this.setState({
            client: clientSelection.target.value
        })
    }
    
    render() {
        return(
            <div>
                <FormControl variant="standard">
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      options={this.state.clientOptions}
                      value={this.state.client}
                      onChange={(option) => this.handleClientChange(option)}
                      label="Select Client"
                      autoWidth
                    >
                        {this.state.clientOptions}
                    </Select>
                </FormControl>
                {this.state.client !== "" &&
                    <div>
                    
                    </div>
                }
            </div>
        )
    }
}

export default AdminClientDecks