export const StayLocation = ({ loc }) => {
    if (!loc) return
    return <button className="underline address">
        {`${loc.address}, ${loc.country}`}
    </button>
}