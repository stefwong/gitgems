import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import Repository from './Repository';

// Passing in props keyword (i.e. an object that has a key whose name is "keyword")
function RepositoryList(props) {
    const [repos, setRepos] = useState([])
    // When the api call is made, the repos variable is set to a value corresponding to items from the api call

    useEffect(() => {
        async function getRepos() {
            try {
                // Searching by repo/code
                const response = await Axios.get(`https://api.github.com/search/repositories?q=${props.keyword || "react"}+in:readme`)
                // Setting repos variable using hooks to the data from the api (updated and re-rendered by React)
                // Setting repos to data that came back from api (items = actual repos)
                // Passed first to "getTopRepos" to filter first 100 out of whatever is returned from the API call
                setRepos(getTopRepos(response.data.items || []))
                // The empty array avoids data issues, i.e. if keyword is nothing or null, then at least there is an empty array
            } catch (error) {
                console.error(error)
            }
        }
        getRepos()
    }, [props.keyword]);


    const getTopRepos = (repos) => {
        let topRepos = []
        for (let i = 0; i < 100 && i < repos.length; i++) {
            topRepos.push(repos[i])
        }
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
            {getReposDiv()}
        </div >
    );
}

export default RepositoryList;