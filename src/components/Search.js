import React, { useState } from 'react';

function Search(props) {
    const [keyword, setKeyword] = useState("")
    const handleOnChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value)
    }
    const handleOnClick = (e) => {
        e.preventDefault()
        props.handleSearchKeyword(keyword)
    }

    return (
        <div className="search">
            <input 
            className="search-input"
            type="text" 
            value={keyword} 
            onChange={handleOnChange}>
            </input>
            <button onClick={handleOnClick}>
                Search
            </button>
        </div>
    );
}

export default Search;