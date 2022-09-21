export const StayAddress = ({ loc }) => {
    if (!loc) return
    return <button className="underline address">
        {`${loc.address}, ${loc.country}`}
    </button>
}