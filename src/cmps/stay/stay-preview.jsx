import { useState } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router-dom"
import { stayService } from "../../services/stay.service.local"
import { utilService } from "../../services/util.service"
import AppIcon from "../app-icon"

export function StayPreview({ stay }) {
    const navigate = useNavigate()

    // Todo: favorite ↓
    const addFavoriteList = (stayIid) => {
        // setIsLiked(!isLiked)
        // heartPic = heartRed
    }

    if (!stay) return // TODO: Skeleton
    const StayAvgRate = stayService.getStayAvgRate(stay)

    return <section className="btn stay-preview"
        onClick={() => { navigate(`stay/${stay._id}`) }}
    >
        <Carousel
            // Carousel Setting
            navButtonsAlwaysVisible={false}
            autoPlay={false}
            cycleNavigation={true}
            duration={500}
            animation="slide"

            // indicatorIcon
            indicatorIconButtonProps={{
                style: {
                    color: 'whitesmoke',
                    backgroundColor: 'transparent',
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    color: 'white',
                    backgroundColor: 'whitesmoke'
                }
            }}
            indicatorContainerProps={{
                style: {
                    position: 'absolute',
                    zIndex: '1',
                    marginTop: "-50px"
                },
            }}
            // Nav btns
            navButtonsProps={{
                style: {
                    backgroundColor: 'white',
                    color: 'black',
                }
            }}
        >
            {stay.imgUrls.slice().map((imgUrl, idx) =>
                <div className="square-ratio carousel-preview"
                    key={`${imgUrl}-${idx}`}>
                    <img src={imgUrl}
                        alt={`${stay.name}\nimage ${idx}`}
                    />
                </div>
            )}
        </Carousel>

        <div>
            <div className="flex space-between">
                <div className="capitalize">
                    {`${stay.loc.city},${stay.loc.country}`}
                </div>

                    <div className="flex center fs12">
                        <AppIcon iconKey='star' />
                        {StayAvgRate}
                    </div>
            </div>
            <div className="fs14 clr-vector">
            {/* TODO: geolocation for put diff */}
                <div>9,621 kilometers</div>
                {/* TODO: what is this↓? */}
                <div>Dec 20 - 25</div>
            </div>
            ${stay.price} night
        </div>
    </section>
}
// https://www.youtube.com/watch?v=VYsVOamdB0g

// https://www.npmjs.com/package/react-material-ui-carousel