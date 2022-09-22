import { BiSearch } from "react-icons/bi";


export function SearchBarExpand() {
    return (
        <section>
            <div className="header-search-bar-expand">
                <div className="location">
                    <p>Location</p>
                    <input type="text" placeholder="Where are you going?" />
                </div>
                <div className="check-in">
                    <p>Check in</p>
                    <input type="text" placeholder="Add dates" />
                </div>
                <div className="check-out">
                    <p>Check out</p>
                    <input type="text" placeholder="Add dates" />
                </div>
                <div className="guests">
                    <p>Guests</p>
                    <input type="text" placeholder="Add guests" />
                    <span><BiSearch className="search-icon" /></span>
                </div>
            </div>

        </section>

    )
}








