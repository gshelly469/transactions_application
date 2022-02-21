import axios from 'axios';
import React, {Component} from 'react';
import './Dashboard.css'
import Topbar from '../Topbar/Topbar';

class Dash extends Component{
    constructor(){
        super();
        this.state = {
            dashObject : []
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:5000/getDashData/getcalculation')
        .then( res => {
            this.setState({dashObject : res.data})
            console.log(this.state.dashObject[0].total);
        })
    }

    render(){
        return(
            <div className='Dash'>
                <Topbar />
                Dashboard
                <ul>
                    <li>
                        {/* one{this.state.dashObject[0].total} */}
                    </li>
                    
                </ul>
                
            </div>
        )
    }
}

export default Dash;