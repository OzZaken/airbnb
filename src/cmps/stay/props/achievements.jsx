import AppIcon from "../../icon"
import { stayService } from "../../../services/stay.service.local"

export const StayAchievements = ({ achievements }) => {
    const achievementsMap = stayService.getAchievements()
    if (!achievements) return
    return <div className="flex column stay-details-row stay-achievements">
        {achievements.slice(0, 3).map((achievement) =>
            <div className="flex" key={achievement} >
                <div className="achievement-icon">
                    <AppIcon iconKey={achievement} />
                </div>

                <div className="achievement-content">
                    <div>{achievementsMap[achievement].heading}</div>
                    <span>{achievementsMap[achievement].txt}</span>
                </div>
            </div>
        )}
    </div>
}