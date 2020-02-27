import React from 'react';


function Profile(props) {


    const getReposDiv = (user) => {

        return (<div>
            <div>
                <p>
                    <a href={user.html_url}>
                        <img src={user.avatar_url} alt="profile-image"></img>
                        {user.login}</a>
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


export default Profile;