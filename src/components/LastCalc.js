import React from 'react';

function LastCalc(props){

    /**
     * Converts unix to readable timestamp
     * @param {string} utc The unix value to be converted
     */
    const convertToLocalTime = (unix) =>{
        const date = new Date(unix*1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    }

    return (
        <div className="location__last-calc">
            <p>Last calculation: {convertToLocalTime(props.unix)}</p>
        </div>
    );
}
 
export default LastCalc;



