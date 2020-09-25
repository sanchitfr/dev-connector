import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

import PostItem from '../posts/PostItem.js';
import CommentItem from './CommentItem'
import CommentForm from './CommentForm';
import { getPost } from '../../redux/actions/post';

const Post = ({ match, getPost, post: { post, loading } }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match])
    return loading || post === null ? (<Spinner/>) :  (
        <div>
            <Link to='/posts' className='btn'>Back to Posts</Link>
           <PostItem post={post} showActions={false}/> 
           <CommentForm postId={post._id}/>
           <div className="comments">
               {post.comments.map(comment => <CommentItem key={comment._id} postId={post._id} comment={comment}/>)}
           </div>
        </div>
    )
}

Post.propTypes = {
 post: PropTypes.object.isRequired,
 getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
