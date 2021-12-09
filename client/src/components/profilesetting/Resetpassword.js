import React, {useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserPass } from '../../redux/actions/profileAction'
import './Settings.css'
function Resetpassword() {

    const [allValues , setAllValues] = useState({
        currentpassword : '',
        newpassword: '',
        confirmnewpassword: ''
    })
    const changeHandler = e => {
        setAllValues({...allValues , [e.target.name] : e.target.value })
    }
    const [userData, setUserData] = useState({})
    console.log(userData)
    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])
    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]:value })
    }
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateUserPass({userData,auth}))
    }
    return (
        <div>
            <h1>Change Password</h1>
            <form action="">
                <input type="text" placeholder="Current Password" onChange={changeHandler}/>
                <input type="text" placeholder="New Password" onChange={changeHandler}/>
                <input type="text" placeholder="Confirm new password" onChange={changeHandler}/>
                <button>Save</button>
            </form>
            <form onSubmit={handleSubmit}>
                

              

                <div className="form-group">
                    <label htmlFor="mobile">Current Password"</label>
                    <input type="text" name="password"  placeholder='Current Password'
                    className="form-control" onChange={handleInput} />
                </div>
            
                <div className="form-group">
                    <label htmlFor="address">New Password</label>
                    <input type="text" name="newPass"  placeholder="New Password"
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="website">Confirm new password</label>
                    <input type="text" name="confirmPass" placeholder="Confirm new password"
                    className="form-control" onChange={handleInput} />
                </div>

              

                

                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Resetpassword
