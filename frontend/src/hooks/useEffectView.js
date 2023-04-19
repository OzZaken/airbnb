import { useEffect } from "react"
import { useDispatch } from "react-redux"
// import { translationService } from "../services/i18n.service"
import { updateView } from "../store/system.actions"

const useEffectView = (str) => {
    useDispatch(updateView(str))

    useEffect(() => {
        // translationService.doTrans()
        document.body.classList.add(str)
        return () => {
            document.body.classList.remove(str)
        }
    }, [])
}

export default useEffectView