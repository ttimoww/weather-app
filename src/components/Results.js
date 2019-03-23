import React from 'react';
import LocationCard from './LocationCard';

const results = props => {
    return(
        <div className="results">
            {props.locations.map((location) =>
                <LocationCard 
                    key={location.id} 
                    cityName={location.name}
                    />
            )}
        </div>
    )
}

export default results;