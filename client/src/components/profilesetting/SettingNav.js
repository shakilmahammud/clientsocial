import React from 'react'
import {Link} from "react-router-dom";
function Navbar() {
    return (
        <div>
           <h1>user settings</h1>
            <div className="link">
                
                    <ul><Link to="/settings">Account Info</Link></ul>
                    <ul><Link to="/resetpassword">Password and Security</Link></ul>
                    <ul><Link to="/">Appearance</Link></ul>
                    <ul><Link to="/">Privacy policy</Link></ul>
                    <ul><Link to="/">Terms and Condition</Link></ul>
            
            </div>
        </div>
    )
}

export default Navbar
