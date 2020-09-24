import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation.js';
import ProfileRepos from './ProfileRepos';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../redux/actions/profile';

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match]);

    return (
        <Fragment>
            {profile === null || loading ? (<Spinner />) :( <Fragment>
                <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
                { auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && 
                (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>) }
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile}/>
                </div>
                <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (<Fragment>
                    {
                        profile.experience.map(exp => (
                            <ProfileExperience key={exp._id} experience={exp}/>
                        ))
                    }
                </Fragment>) : (<h4>No Experience Credentials</h4>)}
                </div>

                <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (<Fragment>
                    {
                        profile.education.map(edu => (
                            <ProfileEducation key={edu._id} education={edu}/>
                        ))
                    }
                </Fragment>) : (<h4>No Education Credentials</h4>)}
                </div>
                {profile.githubusername && (<ProfileRepos username={profile.githubusername}/>)}
            </Fragment>
            )}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile : state.profile,
    auth : state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
