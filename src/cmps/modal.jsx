import { useEffect } from "react"

const ModalContentMap = {
    filterBy: <div className="filter-modal-container">
        <h3> filters</h3>
        <hr />
        <h2>Price range</h2>
        <p>The average nightly price is <span>getAvgNight</span></p>
    </div>,
}

export const Modal = (content) => {

    useEffect(() => {
        console.log('content:', content)
        console.log('modalContent:', ModalContentMap[content])
        
        document.body.classList.add('modal-open')
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [])
    return ModalContentMap[content]
}