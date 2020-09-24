import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {getGithubRepos} from '../../redux/actions/profile';

const ProfileRepos = ({ username, repos, getGithubRepos }) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username])
    return (
        <div class="profile-github">
          <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2>
          {repos === null ? (<Spinner/>) : (
              repos.map(repo => (
                <div key={repo._id} class="repo bg-white p-1 my-1">
                    <div>
                    <h4><a href={repo.html_url} target="_blank"
                        rel="noopener noreferrer">{repo.name}</a></h4>
                    <p>
                        {repo.descriptiom}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                        <li class="badge badge-dark">Watchers: {repo.watcher_count}</li>
                        <li class="badge badge-light">Forks: {repo.forks_count}</li>
                    </ul>
                    </div>
                </div>
              ))
          )}
        </div>
    )
}

ProfileRepos.propTypes = {
    repos : PropTypes.array.isRequired,
    getGithubRepos: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    repos : state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileRepos)
