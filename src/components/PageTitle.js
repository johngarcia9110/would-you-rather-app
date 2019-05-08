import React, { Component } from 'react';

class PageTitle extends Component{
    render(){
        return(
            <div className="container-fluid page-title">
                <div className="row page-title-inner">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default PageTitle;