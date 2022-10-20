import React from 'react'


const Button = ({ each, setFilterBy, filterFunc, setFilteredArr }) => {


    const handleSubmit = async (key) => {
        setFilterBy(key)
        console.log(`${key} clicked`);
        const result = await filterFunc(key).unwrap();
        const filter = result.filter(item => item.category === key)
        setFilteredArr(filter);
    }


    return (
        <button type="button" onClick={() => handleSubmit(each)} className="filter_button">{each}</button>
    )
}

export default Button