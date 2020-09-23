import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { addEducation } from '../../redux/actions/profile';

const AddEducation = ({ addEducation, history }) => {

    const [ formData, setFormData ] = useState({
        school : '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const handleChange = e => {
        setFormData( { ...formData, [e.target.name]: e.target.value } );
    }

    const handleSubmit = e => {
        e.preventDefault();
        addEducation(formData, history)
    }

    const [ toDateDisabled, toggleCurrent ] = useState(false);
    
    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    return (
        <Fragment>
           <h1 className="large text-primary">
       Add Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp program you attended.
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* School" name="school" value={school} onChange={e => handleChange(e) } required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={e => handleChange(e) } required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={e => handleChange(e) }/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => handleChange(e) }/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
              setFormData({ ...formData, current: !current })
              toggleCurrent(!toDateDisabled)
           }}/> Current Education</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => handleChange(e) } disabled={ toDateDisabled ? 'disabled': '' }/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => handleChange(e) }
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form> 
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation : PropTypes.func.isRequired
}


export default connect(null, { addEducation })(withRouter(AddEducation))
