import React, {Component} from "react"

let FilterEvents = (props) => {
    
    function onFilterValueChanged(event) {
        props.filterValueSelected(event.target.value)
    }
    
    return (
    <div>
        <select name = "Category" onChange = {onFilterValueChanged}>
            <option value = "All">All</option>
            <option value = "Fashion">Fashion</option>
            <option value = "Music">Music</option>
            <option value = "Performing Arts">Performing Arts</option>
            <option value = "Other">Other</option>
        </select>
    </div>); 
}

export default FilterEvents;