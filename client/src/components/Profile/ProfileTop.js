import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile : {
    user: { name, avatar },
    social,
    company,
    status,
    location,
    website
} }) => {
    return (
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 class="large">{name}</h1>
          <p class="lead">{status} {company && <span> at {company}</span>}</p>
          <p>{location && <span>{location}</span>}</p>
          <div class="icons my-1">
              { website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                Web
                </a>
              )}
            { social && social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
                </a>
            )}
            { social && social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
                </a>
            )}
            { social && social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>    
            )}
            { social && social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                Youtube
                </a>
            )}
            { social && social.instagarm && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
                </a>
            )}
          </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
