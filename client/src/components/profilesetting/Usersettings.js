import React from 'react'
import {Link} from "react-router-dom";

function Usersettings() {
    return (
        <div>
           <h1>user settings</h1>
            <div className="link">
                <ul>
                    <Link to="/settings">Account Info</Link>
                    <Link to="/resetpassword">reset password</Link>
                </ul>
            </div>
        </div>
    )
}

export default Usersettings
