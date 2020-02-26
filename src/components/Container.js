import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import Search from './Search'


function Container() {
    const [repos, setRepos] = useState([])
    const [keyword, setKeyword] = useState([])
    useEffect(() => {
        async function getRepos() {
            try {
                const response = await Axios.get(`https://api.github.com/search/repositories?q=${keyword}`)
                setRepos(getTopRepos(response.data.items || []))
            } catch (error) {
            }
        }
        getRepos()
    }, [keyword]);

    const getTopRepos = (repos) => {
        let topRepos = []
        for (let i = 0; i < 10 && i < repos.length; i++) {
            topRepos.push(repos[i])
        }
        return topRepos;
    }

    const getReposDiv = () => {
        let repoDiv = repos && repos.map((repo, index) => {
            return (<div key={index}>
                <a href={repo.html_url}>{repo.name}</a>
            </div>)
        })
        return repoDiv
    }

    const handleSearchKeyword = (keyword) => {
        setKeyword(keyword)
    }
    return (
        <div className="container">
            {keyword}
            <div className="search">
                <Search
                    handleSearchKeyword={handleSearchKeyword}
                />

            </div>
            {getReposDiv()}
        </div >
    );
}

export default Container;