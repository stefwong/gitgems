import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import Repository from './Repository';


function RepositoryList(props) {
    const [repos, setRepos] = useState([])
    

    useEffect(() => {
        async function getRepos() {
            try {
                //searching by repo/code
                const response = await Axios.get(`https://api.github.com/search/repositories?q=${props.keyword || "react"}+in:readme`)
                setRepos(getTopRepos(response.data.items || []))
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
        getRepos()
    }, [props.keyword]);


    const getTopRepos = (repos) => {
        let topRepos = []
        for (let i = 0; i < 10 && i < repos.length; i++) {
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