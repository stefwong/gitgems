import React from 'react';

// Getting user information
// Displaying image/avatar + corresponding github profile link
// Passing in the user property & accessing the props.user that was passed in

function Profile(props) {

    const getReposDiv = (user) => {
        return (<div>
            <div className="card-container">
                <p>
                    <div className="profile-main-div">
                    <a href={user.html_url}>
                        <div className="profile-img-div">
                            <img className="img-medium" src={user.avatar_url} alt="profile-image"></img>
                        </div>
                        
                        <div className="profile-text-div">
                            🔥 See <b>{user.login}</b>'s GitHub Profile</div></a>
                        </div>
                </p>
            </div>
        </div>)
    }

    return (
        <div className="profile">
            {getReposDiv(props.user)}       
        </div >
    );
}
// "user" came as a prop from the profile list (ProfileList Component),
// i.e. props.user is passing in user from ProfileList

export default Profile;