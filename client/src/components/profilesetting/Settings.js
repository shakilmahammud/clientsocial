import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction'
import './Settings.css'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";


function Settings() {
    let history = useHistory();
    const initState = {
        fullname: '', mobile: '', address: '', website: '', story: '', gender: '',country:'',
    }
    const [userData, setUserData] = useState(initState)
    const { fullname, mobile, address, website, story, gender,country} = userData

    const [avatar, setAvatar] = useState('')

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])


    // const changeAvatar = (e) => {
    //     const file = e.target.files[0]

    //     const err = checkImage(file)
    //     if(err) return dispatch({
    //         type: GLOBALTYPES.ALERT, payload: {error: err}
    //     })

    //     setAvatar(file)
    // }

    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]:value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileUser({userData, avatar, auth}))
    }
    return (
        <div>
             <h1>Edit info</h1>
             <form onSubmit={handleSubmit}>
               

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                        name="fullname" value={fullname} onChange={handleInput}  
                        placeholder='Full Name'
                        />
                        <small className="text-danger position-absolute"
                        style={{top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" value={mobile}
                     placeholder='Mobile Number'
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" value={website}
                     placeholder='Website Name'
                    className="form-control" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Contry</label>
                    <input type="text" name="country" value={country}
                     placeholder='Country Name'
                    className="form-control" onChange={handleInput} />
                </div>
                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select text-capitalize"
                    onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button  type="submit">Save</button>
                
            </form>
            <button onClick={history.goBack}>Back</button>
            
        </div>
    )
}

export default Settings
