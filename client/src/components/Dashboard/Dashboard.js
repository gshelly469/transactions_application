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
        axios.get('http://127.0.0.1:5000/getDashData/getcalculation',{
            params:{
                per:localStorage.getItem('userid')
            }
        })
        .then( res => {
            this.setState({dashObject : res.data})
            // console.log(this.state.dashObject[0].total);
        })
    }

    render(){
        return(
            <div className='Dash'>
                <Topbar />
                Dashboard
                <ul>
                    {this.state.dashObject.map( data => <li> {data.personGive_id} person has send you {data.payment} amount</li>)}
                    
                </ul>
                
            </div>
        )
    }
}

export default Dash;