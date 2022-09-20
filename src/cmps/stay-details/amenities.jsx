export function StayAmenities({ stay }) {
    return <section className="stay-amenities">
        <div><h2>What this place offers</h2></div>
        {stay.amenities.slice(0, 6)
            .map(amenity =>
                <div
                    className="amenity"
                    key={`${amenity}`}>
                    {amenity}
                </div>
            )}
        <button className="btn btn-big">
            Show all {stay.amenities.length} amenities
        </button>
    </section>
}