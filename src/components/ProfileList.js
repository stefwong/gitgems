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
                console.log("this is the api to user")
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
        getUsers()
    }, [props.keyword]);

    const getTopUsers = (users) => {
        let topUsers = []
        for (let i = 0; i < 10 && i < users.length; i++) {
            topUsers.push(users[i])
            console.log(users[i])
        }
        console.log("topUsers")
        console.log(topUsers)
        return topUsers;
    }

    const getUsersDiv = () => {
        let usersDiv = users && users.map((user) => {
            return (<Profile
                handleSeeProfile={props.handleSeeProfile}
                key={user.login}
                user={user}
            />)
        })
        return usersDiv
    }

    console.log("this is users before return")
    console.log(users)
    if (users && users.length > 0) {
        return (
            <div className="profile-list">
                {getUsersDiv()}
            </div >
        );
    }
    return (
        <div className="profile-list">
           Loading...        
        </div >
    );
}

export default ProfileList;