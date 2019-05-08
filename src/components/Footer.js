import React, { Component } from 'react';

class Footer extends Component{
    render(){
        return(
            <footer className="container-fluid">
                <div className="row top-row">
                    <div className="container">
                        <div className="col-12 text-center">
                            <h1 className="logo logo--dark">WYR?</h1>
                            <p>Would You Rather..?</p>
                        </div>
                    </div>
                </div>
                <div className="row bottom-row">
                    <div className="col-12 d-flex justify-content-between">
                        <p>Created By John Garcia</p>
                        <p>&copy; 2019</p>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;