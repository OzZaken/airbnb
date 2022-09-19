export function StayAmenities({ stay }) {
    return <div className="stay-amenities">
        <h2>What this place offers</h2>
        {stay.amenities.slice(0, 6)
            .map(amenity => <div key={`${amenity}`}>{amenity}</div>)}
        <button className="btn btn-big">
            Show all {stay.amenities.length} amenities
        </button>
    </div>
}

