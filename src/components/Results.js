import React from 'react';
import LocationCard from './LocationCard';

const results = props => {
    return(
        <div className="results">
            {props.locations.map((location) =>
                <LocationCard 
                    key={location.id} 
                    locationID={location.id}
                    cityName={location.name}
                    removeLocation={props.removeLocation}
                    />
            )}
        </div>
    )
}

export default results;