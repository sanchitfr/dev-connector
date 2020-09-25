import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { addLike, removeLike, deletePost } from '../../redux/actions/post';

const PostItem = ({ addLike, removeLike, deletePost, showActions, auth, post: { _id, text, avatar, name, user, likes, comments, date } }) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
                {text}  
            </p>
             <p className="post-date">
                Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            {showActions && (
              <Fragment>
              <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
                Like {' '}
                {likes.length > 0 && (
                  <span>{likes.length}</span>
                )}
              </button>
              <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
                Unlike
              </button>
                  <Link to={`/posts/${_id}`} className="btn btn-primary">
                    Discussion {' '}
                    {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                    )}
                  </Link>
              { !auth.loading && user === auth.user._id && (
                  <button onClick={e => deletePost(_id)} type="button" className="btn btn-danger">
                      Delete
                  </button>
              )}
              </Fragment>
            )}
          </div>
        </div>
    )
}

PostItem.defaultProps = {
  showActions : true
}

PostItem.propTypes = {
    auth : PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike : PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
