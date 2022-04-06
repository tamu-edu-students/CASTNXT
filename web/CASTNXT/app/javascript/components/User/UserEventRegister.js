import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';

class UserEventRegister extends Component {
    constructor(props) {
        super(props)
        
        console.log(props)

        this.state = {
            eventId: props.location.state.eventId
        }
    }

    render() {
        
        return(
            <div className="container user-events">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h3>Event</h3>
                        <br />
                        <span>Event ID: {this.state.eventId}</span>
                        <br />
                        <button><Link to={{pathname: '/user', state: {}}}>Back</Link></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserEventRegister)