import { useRef, useState, useEffect } from "react"
import { LabelPreviewStay } from "./stay-label-preview"
import { imgService } from "../../services/img.service"

const { loadImgs } = imgService

export const StayLabelList = ({ labels, onClick, onUpdateLabelBy, activeLabel }) => {
    const [currLabelIdx, setCurrLabelIdx] = useState(0)

    const carouselRef = useRef(null)
    const activeLabelRef = useRef('')
    const [imgMap, setImgsMap] = useState({})

    useEffect(() => {
        const imgKeys = labels.map(label => Object.keys(label)[0])
        loadAmenitiesImgs(imgKeys)
    }, [labels])

    const loadAmenitiesImgs = async imgKeys => {
        const imgs = await loadImgs(imgKeys, 'png')
        setImgsMap(imgs)
    }

    const toggleActiveLabel = (label) => {
        if (label === activeLabel) onUpdateLabelBy(null)
        else onUpdateLabelBy(label)
    }

    const handleClick = (ev) => {
        ev.preventDefault()
        const key = ev.target.value
        toggleActiveLabel(key)
    }

    const onPrevAmenities = () => {
        if (currLabelIdx > 0) setCurrLabelIdx(currLabelIdx - 1)
    }

    const onNextAmenities = () => {
        if (currLabelIdx < labels.length - 1)
            setCurrLabelIdx(currLabelIdx + 1)
    }

    // object literal...
    const labelPreview = {
        currLabelIdx,
        onClick,
        imgMap
    }

    const btnPrev = {
        className: "btn btn-prev",
        onClick: () => onPrevAmenities,
        disabled: currLabelIdx === 0,
    }

    const btnNext = {
        className: "btn btn-next",
        onClick: () => onNextAmenities,
        disabled: currLabelIdx === labels.length - 1,
    }

    return (
        <ul ref={carouselRef} className="stay-labels-list">
            {labels.map((label, idx) => <LabelPreviewStay label={label} {...labelPreview}
                className={`label-preview ${idx === currLabelIdx ? 'active' : ''}`}
                key={idx}
            />)}

            <button {...btnPrev}>&lt;</button>
            <button {...btnNext}>&gt;</button>
        </ul>
    )
}