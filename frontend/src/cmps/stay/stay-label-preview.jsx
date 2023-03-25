import LoaderApp from "../app-loader"

export const LabelPreviewStay = ({ label, onClick, imgMap }) => {
    const title = Object.values(label)
    const labelKey = Object.keys(label)

    const labelPreviewProps = { 'data-filter-by': labelKey }

    if (onClick && typeof onClick === 'function') {
        labelPreviewProps.onClick = () => onClick(labelKey)
    }

    return !imgMap[labelKey] ? <LoaderApp from='label' /> : <li className='label-preview'{...labelPreviewProps} >

        <button className='btn btn-filter-by-label' value={labelKey}>

            <span className='label-title'>{title}</span>

            <img className='label-img' role={'presentation'} src={imgMap[labelKey]} alt={title} />
        </button>
    </li>
}
