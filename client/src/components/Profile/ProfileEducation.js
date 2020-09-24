import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education : {
    school,
    to,
    degree,
    from,
    current,
    fieldofstudy,
    description
} }) => {
    return (
        <div>
            <h3 class="text-dark">{school}</h3>
            <p><Moment format='DD/MM/YYYY'>{from}</Moment> - {!current ? ( <span>Till Date</span>) : (<Moment format='DD/MM/YYYY'>{to}</Moment>)}</p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
    )
}

ProfileEducation.propTypes = {
    education : PropTypes.object.isRequired
}

export default ProfileEducation
