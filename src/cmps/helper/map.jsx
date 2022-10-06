import React from 'react'
import GoogleMapReact from 'google-map-react'
import { useState } from 'react'
import { FaHome } from 'react-icons/fa'

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export function GoogleMap({ loc }) {
    const lng = parseFloat(loc.lat)
    const lat = parseFloat(loc.lng)
    const [coordinates, setCoordinates] = useState({ lat, lng })
    const zoom = 14

    const onClickMap = ({ lat, lng, }) => {
        setCoordinates({ lat, lng })
    }

    return (
        <div className="google-map"
            style={{
                height: '66.50vh',
                width: '100%',
                padding: '20px 20px 20px 20px'
            }}>
            <GoogleMapReact
                onClick={onClickMap}
                bootstrapURLKeys={{ key: "AIzaSyBvTjJLgXv_JG78L_VC13fO7vJjnzeBzH8" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}

            >
                <AnyReactComponent
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    text={<FaHome/>}
                />
            </GoogleMapReact>
        </div>
    )
}
// https://codesandbox.io/examples/package/react-google-map-picker