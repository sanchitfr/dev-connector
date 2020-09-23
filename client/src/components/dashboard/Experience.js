import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { deleteExperience } from '../../redux/actions/profile';

const Experience = ({ experiences, deleteExperience }) => {
    const experience = experiences.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}
                {exp.to === null ? (' Till date') : (
                  <Moment format='DD/MM/YYYY'>{exp.to}</Moment>  
                )} 
            </td>
            <td>
            <button onClick={() => deleteExperience(exp._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>{experience}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experiences : PropTypes.array.isRequired,

}

export default connect(null, {deleteExperience})(Experience);
