import React, {Component} from 'react';
import Topbar from '../Topbar/Topbar';
// import './Topbar.css'


class Upload extends Component{
    render(){
        return(
            
                <div className='UploadClass'>
                    <Topbar />
                    Upload Transactions
                </div>
            
        )
    }
}

export default Upload;