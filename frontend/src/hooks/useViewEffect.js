import { useEffect } from "react"
import { useDispatch } from "react-redux"
// import { translationService } from "../services/i18n.service"
import { updateView } from "../store/system.actions"

export const useViewEffect = (str) => {
    useDispatch(updateView(str))
    
    useEffect(() => {
        // translationService.doTrans()
        // console.log(`%c useViewEffect: ${str}`, 'color: blue;')
        document.body.classList.add(str)
        return () => {
            document.body.classList.remove(str)
        }
    }, [])
}