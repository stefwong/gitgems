import React, { useState } from 'react';
import Search from './Search'
import ProfileList from './ProfileList'
import RepositoryList from './RepositoryList'
import ProfileDetails from './ProfileDetails'


function Container() {
    const [keyword, setKeyword] = useState([])
    const [userRepoToggle, setUserRepoToggle] = useState("repos")
    const [userProfile, setUserProfile] = useState({})



    const handleSeeProfile = (user) => {
        setUserRepoToggle("developerProfile")
        setUserProfile(user)
    }
    const handleSearchKeyword = (keyword) => {
        setKeyword(keyword)
        console.log(keyword)
    }
    const toggleUserRepo = (searchBy) => {
        setUserRepoToggle(searchBy)
    }
    return (
        <div className="container">
            <div className="logo">gitgems</div>
            <div>
                <h6>Welcome</h6>
            </div>
            <div className="list-landing">
                <div className="search">
                    <Search
                        handleSearchKeyword={handleSearchKeyword}
                    />
                </div>
                <div>
                    <button onClick={() => { toggleUserRepo("repos") }}>
                        Repos
                    </button>
                    <button onClick={() => { toggleUserRepo("developers") }}>
                        Developers
                    </button>
                </div>

                {userRepoToggle === "repos" &&
                    <div className="list-container">
                        <RepositoryList
                            keyword={keyword}
                        />

                    </div>}
                {userRepoToggle === "developers" &&
                    <div className="list-container">
                        <ProfileList
                            handleSeeProfile={handleSeeProfile}
                            keyword={keyword}
                        />

                    </div>}
                {userRepoToggle === "developerProfile" &&
                    <div className="list-container">
                        <ProfileDetails
                            user={userProfile}
                        />

                    </div>}
            </div>
        </div >
    );
}

export default Container;