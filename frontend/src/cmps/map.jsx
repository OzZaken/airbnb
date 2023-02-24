import React from "react"
import GoogleMapReact from 'google-map-react'
import { useState } from "react"
import { Stack } from "@mui/system"
import { Button } from "@mui/material"

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '25px' }}> {text}</div >

export function Map() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const onClick = ({ x, y, lat, lng, event }) => {
        setCoordinates({ lat, lng })
    }

    const onChangeStore = (coordinates) => {
        setCoordinates(coordinates)
    }

    return (
        <section className="map full">
            <div style={{ height: '70vh', width: '80%', margin: 'auto' }}>
                <GoogleMapReact
                    onClick={onClick}
                    bootstrapURLKeys={{ key: "AIzaSyCe1yz4AiG26uqcPqIdkByIKol5HbWe7Hs" }}
                    // defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={zoom}>

                    <AnyReactComponent
                        lat={32.0853}
                        lng={34.7818}
                        text="📍"
                    />
                    <AnyReactComponent
                        lat={29.5577}
                        lng={34.9519}
                        text="📍"
                    />
                    <AnyReactComponent
                        lat={32.794}
                        lng={34.9896}
                        text="📍"
                    />
                </GoogleMapReact>
            </div>
            <Stack spacing={2} direction="row" style={{margin: '10px'}} className="flex justify-center align-center">
                <Button variant="outlined"
                    onClick={() => onChangeStore({ lat: 32.0853, lng: 34.7818 })}>
                    Tel Aviv
                </Button>
                <Button variant="outlined"
                    onClick={() => onChangeStore({ lat: 29.5577, lng: 34.9519 })}>
                    Eilat
                </Button>
                <Button variant="outlined"
                    onClick={() => onChangeStore({ lat: 32.794, lng: 34.9896 })}>
                    Haifa
                </Button>
            </Stack>
        </section>
    )
}