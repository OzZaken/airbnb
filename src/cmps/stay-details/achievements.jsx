import AppIcon from "../icon"
import { stayService } from "../../services/stay.service.local"
const achievementsMap = stayService.getAchievements()

export const StayAchievements = ({ achievements }) =>{
    if (!achievements) return
    return <section className="flex column stay-achievements">
        {achievements.slice(0, 3).map((achievement) =>
            <div className="flex" key={achievement} >
                <div className="achievement-icon">
                    <AppIcon iconKey={achievementsMap[achievement].icon} />
                </div>

                <div className="achievement-content">
                    <div>{achievementsMap[achievement].heading}</div>
                    <span>{achievementsMap[achievement].txt}</span>
                </div>
            </div>
        )}
    </section>
}