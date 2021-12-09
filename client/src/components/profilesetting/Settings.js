import  React, {useEffect, useState}  from 'react'

import { useSelector, useDispatch } from 'react-redux'
import EditProfile from '../profile/EditProfile'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import './Settings.css'
import { Link } from 'react-router-dom'

function Settings() {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [onEdit, setOnEdit] = useState(true)

    
    useEffect(() => {
        if(onEdit){
            dispatch({ type: GLOBALTYPES.MODAL, payload: true})
        }else{
            dispatch({ type: GLOBALTYPES.MODAL, payload: false})
        }
    },[onEdit, dispatch])
    
    // const [allValues , setAllValues] = useState({
    //     username : '',
    //     email: '',
    //     phone: '',
    //     country: '',
    //     age: ''
    // })
    // const changeHandler = e => {
    //     setAllValues({...allValues , [e.target.name] : e.target.value })
    // }
    return (
        <div>
       <button className="btn btn-outline-info"> <Link to={`/profile/${auth.user._id}`}>Profile</Link></button>
         {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
            }
            {/* <h1>Edit info</h1>
            <form action="">
                <input 
                type="text"
                placeholder="Username"
                onChange= {changeHandler}
                />

                <input 
                type="text"
                placeholder="Email"
                onChange= {changeHandler}
                />

                <input 
                type="text" 
                placeholder="Phone"
                onChange= {changeHandler}
                />
                <input 
                type="text" 
                placeholder="Country"
                onChange= {changeHandler}
                />
                <input 
                type="text"
                placeholder="Age"
                onChange= {changeHandler}
                />
                <select name="Gender" id="">
                    <option disabled="disabled" selected="selected"  value="">Chose Gender</option>
                    <option value="Male"></option>
                    <option value="Female"></option>
                </select> <br></br>
                <button>Save</button>
            </form> */}
            
        </div>
    )
}

export default Settings
