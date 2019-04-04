import React from 'react';

const AddLocation = (props) => {

    return ( 
        <div className="addLocation" onClick={props.showNewLocation}>
            <i className="fas fa-plus-circle"></i>
        </div>
    );
    
}
 
export default AddLocation;