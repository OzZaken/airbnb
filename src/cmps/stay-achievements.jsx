import { stayService } from "../services/stay.service.local"
import AppIcon from "./icon"
const stayAchievements = stayService.getStayAchievements()
export function StayAchievements({ stay }) {

    return <div className="hr flex column stay-achievements">
        {/* {stay.achievements.splice(0, 3).map(stayTitle =>
    <div className="flex">
        <div>{gStayAchievements[stay.achievements[0]].icon}</div>
        <div>
            <div>title</div>
            <span>text title</span>
            </div>
    </div>
)} */}
        <div className="flex">
            <div><AppIcon iconKey='wifi' /></div>
            <div>
                <h4>{stayAchievements[stay.achievements[0]].heading}</h4>
                <span>{stayAchievements[stay.achievements[0]].txt}</span>
            </div>
        </div>
        <div className="flex">
            <div><AppIcon iconKey='wifi' /></div>
            <div>
                <h4>{stayAchievements[stay.achievements[1]].heading}</h4>
                <span>{stayAchievements[stay.achievements[1]].txt}</span>
            </div>
        </div>
        <div className="flex">
            <div><AppIcon iconKey='wifi' /></div>
            <div>
                <h4>{stayAchievements[stay.achievements[2]].heading}</h4>
                <span>{stayAchievements[stay.achievements[2]].txt}</span>
            </div>
        </div>
    </div>
}