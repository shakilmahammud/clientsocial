import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../pages/home'
import LoadIcon from '../images/loading.gif'
import RightSideButtom from './home/RightSideButtom'
import LeftSideButttom from './home/LeftSideButtom'
import Posts from './profile/Posts'
import Status from './home/Status'
import PostCard from './PostCard'
import LoadMoreBtn from './LoadMoreBtn'
import RightSideBar from './home/RightSideBar'


const PostThumb = ({posts, result,user}) => {
    const { theme } = useSelector(state => state)
    if(result === 0) return <h2 className="text-center text-danger">No Post</h2>

    return (
        <>
       <div className="home row mx-0">
             <div className="col-md-3">
                <LeftSideButttom />
                <RightSideBar/>
            </div>
            <div className="col-md-6">
                <Status />

                {
                    posts.loading 
                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                    : (posts.result === 0 && posts.posts.length === 0)
                        ? <h2 className="text-center">No Post</h2>
                        : <> <div className="posts">
      
                        {
                          posts.map(post => (
                                <PostCard key={post._id} post={post} theme={theme} userp={user}/>
                            ))
                        }
            
                    </div></>
                        
                    
                }
                
            </div>
            
            <div className="col-md-3">
                <RightSideButtom />
            
            </div>
        </div>
        
        </>
    )
}

export default PostThumb
