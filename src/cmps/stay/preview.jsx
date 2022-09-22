import { StayAddress } from "./props/address"
import { StayRate } from "./props/rate"
import { StaySaveBtn } from "./props/save"
import { StayShareBtn } from "./props/share"

export function SPreview({ stay }) {
    if (!stay) return
    return <section className="stay-SPreview">
        <h1>{stay.name}</h1>
        <div className="flex space-between">

            <div className="flex space-between">
                <StayRate reviews={stay.reviews} />
                <StayAddress loc={stay.loc} />
            </div>

            <div className="flex space-between">
                <StayShareBtn />
                <StaySaveBtn />
            </div>
            
        </div>

        <div className="imgs-grid-container imgs-preview">
            {stay.imgUrls.slice(0, 5).map(imgUrl =>
                    <img key={imgUrl} src={imgUrl} alt="Stay image" />
            )}
        </div>
    </section>
}