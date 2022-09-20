import { stayService } from "../services/stay.service.local"
import AppIcon from "./icon"

// import utilService from "../services/util.service"
const achievements = stayService.getStayAchievements()

export function StayAchievements({ stay }) {
    console.log('stay.achievements:', stay.achievements)
    return <section className="flex column stay-achievements">
        {stay.achievements.splice(0, 3).map((achievement )=>
            <div 
            key={makeId()}
            className="flex">
                <div>
                    <AppIcon iconKey={achievements[achievement].icon} />
                </div>
                <div>
                    <div>{achievements[achievement].heading}</div>
                    <span>{achievements[achievement].txt}</span>
                </div>
            </div>
        )}

    </section>
}
// todo: delete func
function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}
