import { useRef, useState } from "react"
import { AmenityPreview } from "./amenity-preview"

export const AmenityList = ({ amenities, cb, isContainsTitle, isContainsIcon }) => {
    /* USE */
    const [currItem, setCurrItem] = useState(0)
    const carouselRef = useRef(null)

    /* FUNCS */
    const handlePrevClick = () => {
        if (currItem > 0) setCurrItem(currItem - 1)
    }

    const handleNextClick = () => {
        if (currItem < amenities.length - 1) setCurrItem(currItem + 1)
    }

    /* PROPS */
    const previewProps = {
        cb,
        isContainsTitle,
        isContainsIcon
    }

    const btnPrev = {
        className: 'prev-button',
        onClick: () => handlePrevClick,
        disabled: currItem === 0,
    }

    const btnNext = {
        className: 'next-button',
        onClick: () => handleNextClick,
        disabled: currItem === amenities.length - 1,
    }

    /* CMPS */
    const amenityList = amenities.map((amenity, idx) => (
        <AmenityPreview {...previewProps} amenity={amenity} key={`${Object.keys(amenity)[0]}-${idx}`} />
    ))
    return <ul className="amenities-list">

         {amenityList}
        <button {...btnPrev}>Prev</button>
        <button {...btnNext}>Next</button>
    </ul>
}