import React, { useState, useEffect } from 'react'
import Avatar from '../Avatar'
import EditProfile from '../profile/EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from '../profile/Followers'
import Following from '../profile/Following'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { Link } from 'react-router-dom'


const LeftSideBar = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    const postlen=localStorage.getItem("postlength")
 console.log(postlen)
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
            {
                userData.map(user => (
                    <div className="info_container" key={user._id}>
                         <div>
                          <img src="https://images.unsplash.com/photo-1621570274348-657dbfc45f15?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" width="100%" height="200px"/>
                      </div>
                      <div className="left-sidebar-pofile"> <Avatar src={user.avatar} size="supper-avatar"  /></div>
                       
                     
                        <div className="info_content">
                            <div className="info_content_title">
                                {/* <h2>{user.username}</h2> */}
                                {/* {
                                    user._id === auth.user._id
                                    ?  <button className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}>
                                        Edit Profile
                                    </button>
                                    
                                    : <FollowBtn user={user} />
                                } */}
                               <Link to={`/profile/${auth.user._id}`}>
                               <h6 style={{textAlign:"center",color: "black"}}>{user.fullname}</h6></Link>
                            </div>

                            <div style={{textAlign:"center",color: "black"}} className="follow_btn">
                            <span className="mr-2">
                                    {postlen} Post |
                                </span>
                                <span className="mr-2" onClick={() => setShowFollowers(true)}>
                                    {user.followers.length} Followers |
                                </span>
                                <span className="" onClick={() => setShowFollowing(true)}>
                                    {user.following.length} Following
                                </span>
                            </div>

                          
                            {/* <p className="m-0">{user.address}</p>
                            <h6 className="m-0">{user.email}</h6>
                            <a href={user.website} target="_blank" rel="noreferrer">
                                {user.website}
                            </a>
                            <p>{user.story}</p> */}
                        </div>

                        {/* {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        } */}

                        {
                            showFollowers &&
                            <Followers 
                            users={user.followers} 
                            setShowFollowers={setShowFollowers} 
                            />
                        }
                        {
                            showFollowing &&
                            <Following 
                            users={user.following} 
                            setShowFollowing={setShowFollowing} 
                            />
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default LeftSideBar
