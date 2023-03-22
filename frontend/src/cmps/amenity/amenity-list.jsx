import { useRef, useState, useEffect } from "react"
import { AmenityPreview } from "./amenity-preview"
import { imgService } from "../../services/img.service"

const { loadImgs } = imgService

export const AmenityList = ({ amenities, onClick, onUpdateAmenityBy, activeAmenity }) => {
    const [currAmenityIdx, setCurrAmenityIdx] = useState(0)

    const carouselRef = useRef(null)
    const activeAmenityRef = useRef()
    const [imgMap, setImgsMap] = useState({})

    useEffect(() => {
        const imgKeys = amenities.map(amenity => Object.keys(amenity)[0])
        loadAmenitiesImgs(imgKeys)
    }, [amenities])

    const loadAmenitiesImgs = async imgKeys => {
        const imgs = await loadImgs(imgKeys, 'png')
        setImgsMap(imgs)
    }

    const toggleActiveAmenity = (amenity) => {
        if (amenity === activeAmenity) onUpdateAmenityBy('')
        else onUpdateAmenityBy(amenity)
    }
    
    const handleClick = (ev) => {
        ev.preventDefault()
        const key = ev.target.value
        toggleActiveAmenity(key)
    }
    const onPrevAmenities = () => {
        if (currAmenityIdx > 0) setCurrAmenityIdx(currAmenityIdx - 1)
    }

    const onNextAmenities = () => {
        if (currAmenityIdx < amenities.length - 1)
            setCurrAmenityIdx(currAmenityIdx + 1)
    }

    // props
    const amenityPreview = {
        currAmenityIdx,
        onClick,
        imgMap
    }

    const btnPrev = {
        className: "btn btn-prev",
        onClick: () => onPrevAmenities,
        disabled: currAmenityIdx === 0,
    }

    const btnNext = {
        className: "btn btn-next",
        onClick: () => onNextAmenities,
        disabled: currAmenityIdx === amenities.length - 1,
    }

    return (
        <ul ref={carouselRef} className="amenities-list">
            {amenities.map((amenity, idx) => <AmenityPreview
                amenity={amenity}
                {...amenityPreview}
                className={`amenity-preview ${idx === currAmenityIdx ? "active" : ""}`}
                key={`${Object.keys(amenity)[0]}-${idx}`}
            />
            )}

            <button {...btnPrev}>Prev</button>
            <button {...btnNext}>Next</button>
        </ul>
    )
}