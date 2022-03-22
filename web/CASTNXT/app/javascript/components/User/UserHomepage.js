import React, {Component} from 'react'
import Header from '../Navbar/Header';

class UserHomepage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div style={{marginTop: '3%', backgroundColor: 'white'}}>
                    <h1>User Homepage</h1>
                </div>
            </div>
        )
    }
}

export default UserHomepage