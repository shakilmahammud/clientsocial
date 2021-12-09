import React from 'react'
import CardHeader from './home/post_card/CardHeader'
import CardBody from './home/post_card/CardBody'
import CardFooter from './home/post_card/CardFooter'

import Comments from './home/Comments'
import InputComment from './home/InputComment'


const PostCard = ({post, theme,userp}) => {
    console.log(post)
    return (
        <div style={{borderRadius:"20px"}} className="card my-3"> 
            <CardHeader post={post} userp={userp}/>
            <CardBody post={post} theme={theme} userp={userp} />
            <CardFooter post={post} userp={userp}/>

            <Comments post={post} />
            <InputComment post={post} />
        </div>
    )
}

export default PostCard
