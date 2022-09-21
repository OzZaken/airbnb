import { StayAddress } from "./address"
import { StayRate } from "./rate"
import { StaySaveBtn } from "./save"
import { StayShareBtn } from "./share"

export function SPreview({ stay }) {
    if (!stay) return
    return <section className="stay-SPreview">
        <h1>{stay.name}</h1>
        <div className="flex space-between">

            <div className="flex space-between">
                <StayRate stay={stay} />
                <StayAddress loc={stay.loc} />
            </div>

            <div className="flex space-between">
                <StayShareBtn />
                <StaySaveBtn />
            </div>
        </div>

        <div className="imgs-grid-container imgs-preview">
            {stay.imgUrls.slice(0, 5).map(imgUrl =>
                <div key={imgUrl}>
                    <img src={imgUrl} alt="Stay image" />
                </div>
            )}
        </div>
    </section>
}