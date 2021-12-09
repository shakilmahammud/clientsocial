import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../Avatar'
import EditProfile from '../profile/EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from '../profile/Followers'
import Following from '../profile/Following'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import * as FlatColor from "react-icons/fc";
const LeftSideButttom = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const navLinks = [
        
       {
        title: 'Explore',
        path: '/',
        icon : <FlatColor.FcCameraIdentification/>,
        className: 'left-sidebar-icon'
       },
       {
        title: 'Notification',
        path: '/',
        icon : <FlatColor.FcSpeaker/>,
        className: 'left-sidebar-icon'
    },
    {
        title: 'Groups',
        path: '/',
        icon : <FlatColor.FcGallery/>,
        className: 'left-sidebar-icon'
    },
    {
        title: 'Feed',
        path: '/',
        icon : <FlatColor.FcGlobe/>,
        className: 'left-sidebar-icon'
    },
    {
        title: 'Video',
        path: '/',
        icon : <FlatColor.FcClapperboard/>,
        className: 'left-sidebar-icon'
    },
    {
        title: 'Settings',
        path: '/SettingNav',
        icon : <FlatColor.FcSettings/>,
        className: 'left-sidebar-icon'
    }
       
    ]
   
    
    const postlen=localStorage.getItem("postlength")
    useEffect(() => {
            setUserData([auth.user])
    }, [])


    useEffect(() => {
        if(showFollowers || showFollowing || onEdit){
            dispatch({ type: GLOBALTYPES.MODAL, payload: true})
        }else{
            dispatch({ type: GLOBALTYPES.MODAL, payload: false})
        }
    },[showFollowers, showFollowing, onEdit, dispatch])
    

    return (
        <div className="info left-siderBar">
           <div className="row">
           <div className="col-md-12">
                    <div className="left-bar-main">
                    <div className="left-bar-icon">
                        {navLinks.map((item , index) => {
                            return (
                                <li key={index} className={item.className}>
                                    <Link to={item.path}>
                                        <span className="icons">{item.icon}</span>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </div>
                    <div className="left-bar-text">

                    </div>
                    
                    </div>
                </div>

           </div>
        </div>
    )
}

export default LeftSideButttom
