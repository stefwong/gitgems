import React, { useState, useEffect } from 'react';

function Repository(props) {

    const getReposDiv = (repo) => {
        const navigateTo=(url)=> {
            window.location.href=url
        }
        return (<div className="card-container">
            <div className="button-container">
                <h1>
                    <button className="list-button" 
                    onClick={() => navigateTo(`${props.repo.html_url}`)}>
                       💎 View the <b>{repo.name}</b> repo</button>
                </h1>
                </div>
                <h1>
                    Made by
                    <a href={repo.html_url}><img className="img-small" src={repo.owner.avatar_url}></img>{repo.owner.login}</a>
                </h1>
                <p>
                    {repo.description}
                </p>
                <div className="card-body">
                </div>
            </div>)            
    }

    return (
        <div className="profile">
            {getReposDiv(props.repo)}
        </div >
    );
}


export default Repository;