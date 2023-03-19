import React from "react" 
import GoogleMapReact from 'google-map-react' 
import { useState } from "react" 

const AnyReactComponent = ({ text }) => <div>{text}</div> 

export function GoogleMap() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const onClick = ({ x, y, lat, lng, event }) => {
        console.log(x, y, lat, lng, event)
        setCoordinates({lat, lng})
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '70vh', width: '50%' }}>
            <GoogleMapReact
                onClick={onClick}
                bootstrapURLKeys={{ key: "AIzaSyCe1yz4AiG26uqcPqIdkByIKol5HbWe7Hs" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    text="🏡"
                />
            </GoogleMapReact>
        </div>
    ) 
}