
import { BiSearch } from "react-icons/bi";

export function SearchBar() {

    return (
        <section>
            <div className="header-search-bar">
                <div className="location">
                    <p>Anywhere</p>
                </div>
                <div className="check-in">
                    <p>Any week</p>
                </div>
                <div className="guests">
                    <p>Add guests</p>
                    <span><BiSearch className="search-icon" /></span>
                </div>
            </div>
        </section>

    )
}








