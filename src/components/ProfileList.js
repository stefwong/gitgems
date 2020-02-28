import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import Profile from './Profile'

function ProfileList(props) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers() {
            try {
                // Searching by username
                const response = await Axios.get(`https://api.github.com/search/users?q=${props.keyword}+in:login`)
                setUsers(getTopUsers(response.data.items || []))
            } catch (error) {
                console.error(error)
            }
        }
        getUsers()
    }, [props.keyword]);

    const getTopUsers = (users) => {
        let topUsers = []
        for (let i = 0; i < 100 && i < users.length; i++) {
            topUsers.push(users[i])
            // Adding one item from the users to the topUsers array
            // Returning a new array called topUsers which will display the first 100 users
        }
        return topUsers;
    }

    // getUsersDiv is a function that returns an array of profile components
    // i.e With up to 100 users, there are up to 100 profile components: one for each user
    // Converts user data into a Profile Component
    // i.e. "return (<Profile ...)" is converting the user to a user component called Profile

    const getUsersDiv = () => {
        // users && users.map checks to see if there are users, i.e. null or undefined users
        // This prevents a runtime error from happening, if users was null or undefined upon users.map alone
        let usersDiv = users && users.map((user) => {
            return (<Profile
                // handleSeeProfile was a prop passed in from the Container, forwarded down to the Profile
                // handleSeeProfile calls back to the parent where it is handled there, i.e. 
                // it knows to render the profile details component
                handleSeeProfile={props.handleSeeProfile}
                // Each component in the array needs a unique key
                key={user.login}
                // The profile component passes user & the data from the user           
                user={user}
            // Getting user info, i.e. link, etc.
            />)
        })
        return usersDiv
    }

    if (users && users.length > 0) {
        // Making sure users is not undefined, then calling the length property
        // i.e. If there actually is a user && there are more than 0, 
        // then get the users div with {getUsersDiv()} in the return
        // {getUsersDiv()} , i.e. "const getUsersDiv = () => {" gets the array of Profile components
        // i.e Does same thing as "users && users.map((user) => {..."
        return (
            <div className="profile-list">
                {getUsersDiv()}
            </div >
        );
    }
    return (
        <div className="profile-list">
            <p>
            <h6>
            Hold up, I'm loading... :D
           </h6>
            </p>
        </div >
    );
}

export default ProfileList;