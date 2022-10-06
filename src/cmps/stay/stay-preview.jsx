import { useState } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router-dom"
import { stayService } from "../../services/stay.service.local"
import { utilService } from "../../services/util.service"
import AppIcon from "../app-icon"

export function StayPreview({ stay }) {
    const navigate = useNavigate()

    // Todo: favorite ↓
    const addFavoriteList = () => {
        // setIsLiked(!isLiked)
        // heartPic = heartRed
    }

    if (!stay) return // TODO: Skeleton
    const StayAvgRate = stayService.getStayAvgRate(stay)

    return <div onClick={() => { navigate(`stay/${stay._id}`) }} className="btn">
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
                    position: 'relative',
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
                <div className="square-ratio carousel-preview">
                    <img src={imgUrl}
                        key={`${imgUrl}-${idx}`}
                        alt={`${stay.name}\nimage ${idx}`}
                    />
                </div>
            )}
        </Carousel>

        <div className="flex space-between">
            <div className="capitalize">
                {`${stay.loc.city},${stay.loc.country}`}
            </div>

            <span>
                <div className="flex center fs12">
                    <AppIcon iconKey='star' />
                    {StayAvgRate}
                </div>
            </span>

        </div>

        <div className="clr-bright">
            <div>9,621 kilometers</div>
            <div>Dec 20 - 25</div>
        </div>
        ${stay.price} night
    </div>
}
// https://www.npmjs.com/package/react-material-ui-carousel