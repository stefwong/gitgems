import React, {useState, useEffect} from 'react';
import Repository from './Repository'
import Axios from 'axios'

function ProfileDetails(props) {
    const [repos, setRepos] = useState([])
    
    useEffect(() => {
        async function getRepos() {
            try {
                // Searching by repo
                const response = await Axios.get(`https://api.github.com/search/repositories?q=${props.user.login || "react"}+in:readme`)            
                setRepos(getTopRepos(response.data.items || []))
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
        getRepos()
    }, [props.user.login]);

    const getTopRepos = (repos) => {
        let topRepos = []
        for (let i = 0; i < 10 && i < repos.length; i++) {
            topRepos.push(repos[i])
            console.log(repos[i])
        }
        console.log("topRepos")
        console.log(topRepos)
        return topRepos;
    }

    const getReposDiv = () => {
        let reposDiv = repos && repos.map((repo,index) => {
            return (<Repository
                key={index}
                repo={repo}
            />)
        })
        return reposDiv
    }

    
    return (
        <div className="profile-list">
            <div>
                {props.user.login}
                
            </div>
            {getReposDiv()}
        </div >
    );
}

export default ProfileDetails;