import React, { useState } from 'react';
import Search from './Search'
import ProfileList from './ProfileList'
import RepositoryList from './RepositoryList'
import ProfileDetails from './ProfileDetails'


function Container() {
    const [keyword, setKeyword] = useState([""])
    // useState returns an array with two elements ( i.e ["", f()] )
    // Defaulting to the same data type as what is expected in the input (search)
    // setKeyword is a function used to set the keyword

    const [userRepoToggle, setUserRepoToggle] = useState("repos")
    const [userProfile, setUserProfile] = useState({})
    // userProfile is initialized to an empty object {} because the profile is expected to be an object

    // handleSeeProfile: for Post-MVP i.e. setUserProfile is for the profile details component
    const handleSeeProfile = (user) => {
        // Receiving the user
        // The profile component would pass the information to the callback
        // setUserRepoToggle would be set to developer profile so the Container would know to show the profile details
        setUserRepoToggle("developerProfile")
        setUserProfile(user)
    }

    // When the user enters a keyword in the input & clicks search,
    // it sets the search keyword (i.e. a new keyword is set)
    // Since React is observing using hooks, when the keyword changes, by setting the keyword, 
    // it will trigger the component to re-render as the key criteria for the data/api, for the component
    // i.e. ProfileList depends on the keyword in order to do the search
    // When a new keyword is set, a chain of events are triggered 
    // that lets react re-render the components with the new data
    const handleSearchKeyword = (keyword) => {
        // setKeyword is entered by the user as a string
        setKeyword(keyword)
        // When the parameter named keyword changes
        // (in this case it is different from the state "keyword" holding state, 
        // that was previously initalized in useState) 
        // when the state keyword changes,
        // forces react to re-render the components with the new data
    }


    // toggleUserRepo: an arrow function toggled by buttons when buttons are clicked
    // Controls the View state (what the user sees)
    // Components will be shown depending on which of these states the userToggle is in (i.e. Either the ProfileList component or RepoList component) 

    const toggleUserRepo = (viewState) => {

        setUserRepoToggle(viewState)
        // Like turning on and off a light switch,
        // this is toggling between the users and the repo view
    }

    return (
        <div className="container">
            <div className="logo">💎 gitgems </div>
            <div>
                beta
                <p></p>
                <br></br>
                <b>Welcome!</b>
               <p></p>
               Please search for a GitHub repo or User 🤩
            </div>
            <div className="list-landing">
                <div className="search">
                    <Search
                        handleSearchKeyword={handleSearchKeyword}
                    />
                </div>
                <div className="toggle-header">
                    <div className="toggle-container">
                        <button className="toggle-button-1" onClick={() => { toggleUserRepo("repos") }}>
                            Projects
                    </button>
                        <button className="toggle-button-2" onClick={() => { toggleUserRepo("developers") }}>
                            Developers
                    </button>
                    </div>
                </div>

                {userRepoToggle === "repos" &&
                    <div className="list-container">
                        <RepositoryList
                            keyword={keyword}
                        // The component containing the list of repositories is created when instantiated
                        />
                    </div>}
                {userRepoToggle === "developers" &&
                    <div className="list-container">
                        <ProfileList
                            // Passed handleSeeProfile function down to the ProfileList component as a property named handleSeeProfile
                            handleSeeProfile={handleSeeProfile}
                            keyword={keyword}
                        />
                    </div>}

                {userRepoToggle === "developerProfile" &&
                    <div className="list-container">
                        <ProfileDetails
                            user={userProfile}
                        // Gets set in handleSeeProifle
                        />
                    </div>}
            </div>
        </div >
    );
}

// If userRepoToggle is set to repos, it renders the RepositoriesList container 
// Re: const handleSeeProfile = (user) => {...

export default Container;