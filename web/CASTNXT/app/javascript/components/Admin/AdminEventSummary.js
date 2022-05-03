import React, {Component} from 'react'
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core'

class AdminEventSummary extends Component {
    constructor(props) {
        super(props)
        
        console.log(props)
        
        this.state = {
            properties: props.properties,
            slides: props.properties.data.slides,
            eventTalent: []
        }
    }
    
    componentDidMount() {
        let slides = this.props.properties.data.slides
        let eventTalent = []

        for(var key in slides) {
            eventTalent.push({
                id: key,
                name: slides[key].talentName,
                curated: slides[key].curated
            })
        }
        
        eventTalent = eventTalent.filter(row => row['curated'] === true)
        
        this.setState({
            eventTalent: eventTalent
        })
    }
    
    render() {
        return(
            <div>
                <h4>Event Summary</h4>
                
                <div>
                  <div className="col-md-8 offset-md-2">
                    <Paper>
                      <TableContainer>
                        <Table size="small">
                          <TableHead style={{ backgroundColor: '#3498DB' }}>
                            <TableRow>
                              <TableCell align="center">Shortlisted Candidates</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.eventTalent
                                .map((row) => {
                                  return(
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.name}</TableCell>
                                    </TableRow>
                                  )
                              })
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </div>
                    
                </div>
            </div>    
        )
    }
}

export default AdminEventSummary