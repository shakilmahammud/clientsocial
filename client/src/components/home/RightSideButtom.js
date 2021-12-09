import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import UserCard from '../UserCard'
import { getDataAPI } from '../../utils/fetchData'


const RightSideButtom = () => {
    const { auth, message, online } = useSelector(state => state)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    const history = useHistory()
    const { id } = useParams()

    const pageEnd = useRef()
    const [page, setPage] = useState(0)

    
    const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
        dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        return history.push(`/message/${user._id}`)
    }

    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }

    useEffect(() => {
        if(message.firstLoad) return;
        dispatch(getConversations({auth}))
    },[dispatch, auth, message.firstLoad])

    // Load More
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(p => p + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[setPage])

    useEffect(() => {
        if(message.resultUsers >= (page - 1) * 9 && page > 1){
            dispatch(getConversations({auth, page}))
        }
    },[message.resultUsers, page, auth, dispatch])
    

    // Check User Online - Offline
    useEffect(() => {
        if(message.firstLoad) {
            dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        }
    },[online, message.firstLoad, dispatch])

    return (
        <>
         <div className="info left-siderBar">
        <div>
            <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-ceenter justify-content-center">
              <i className="fab fa-facebook-messenger text-primary"
                    style={{fontSize: '3rem'}} />
              </div>
          </div>
          </div>
            </div>
        </div>
          <div className="info left-siderBar">
           <div className="row">
           
               <div className="col-md-12">
            <div className="message_header" onSubmit={handleSearch} >
               <h4>Contacts</h4>
            </div>
         
            <div className="message_chat_list">
                {
                    searchUsers.length !== 0
                    ?  <>
                        {
                            searchUsers.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                        
                    </>
                    : <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} >
                                        {
                                            user.online
                                            ? <i className="fas fa-circle text-success" />
                                            : auth.user.following.find(item => 
                                                item._id === user._id
                                            ) && <i className="fas fa-circle" />
                                                
                                        }
                                        
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>
                }
               
               <button ref={pageEnd} style={{opacity: 0}} >Load More</button>
            </div>
            </div>
           </div>
        </div>
        </>
    )
}
export default RightSideButtom
