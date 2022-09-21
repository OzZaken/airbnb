export function StayAmenities({ amenities }) {
    if (!amenities) return
    return <div className="stay-details-row stay-amenities">
        <div>
            <h2>What this place offers</h2>
        </div>

        <div className="amenities">
            {amenities.slice(0, 6).map(amenity =>
                    <div key={`${amenity}`}>
                        {amenity}
                    </div>
                )}
        </div>

        <button className="btn btn-big">
            Show all {amenities.length} amenities
        </button>

    </div>
}