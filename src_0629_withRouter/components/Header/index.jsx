import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Header extends Component {
    render() {
        console.log('header.this:',this);
        return (
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header"><h2>React Router Demo 123</h2></div>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Header)

