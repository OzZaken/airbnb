export function StayAmenities({ amenities }) {
    if (!amenities) return
    return <section className="stay-amenities">
        <div>
            <h2>What this place offers</h2>
        </div>

        <div className="flex">
            {amenities.slice(0, 6)
                .map(amenity =>
                    <div
                        className="amenity"
                        key={`${amenity}`}>
                        {amenity}
                    </div>
                )}
        </div>

        <button className="btn btn-big">
            Show all {amenities.length} amenities
        </button>

    </section>
}