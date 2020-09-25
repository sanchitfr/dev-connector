import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import { removeComment } from '../../redux/actions/post';

const CommentItem = ({ auth, removeComment, comment: { _id, name, user, avatar, date, text }, postId }) => {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profiles/${user}`}>
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
            {!auth.loading && auth.user._id === user && (
                <button onClick={e => removeComment(postId, _id)} className='btn btn-danger' type='button'>Delete</button>
            )}
          </div>
        </div>
    )
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { removeComment })(CommentItem)
