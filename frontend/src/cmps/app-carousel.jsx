import { useRef, useState } from "react"

export const CarouselApp = ({ items }) => {
    const [currentItem, setCurrentItem] = useState(0)
    const carouselRef = useRef(null)
  
    const handlePrevClick = () => {
      if (currentItem > 0) setCurrentItem(currentItem - 1)
    }
  
    const handleNextClick = () => {
      if (currentItem < items.length - 1) setCurrentItem(currentItem + 1)
    }
   
    const itemList = Array.isArray(items) ? items : [items]// handle single item or array of items
  
    return (
      <div className="carousel-container">
        
        <div className="carousel" ref={carouselRef}>
         
          {itemList.map((item, index) => <div className={`carousel-item ${index === currentItem ? "active" : ""}`} key={index}>
            {item}
            </div>)}

        </div>
        
        <button className="prev-button"
          onClick={handlePrevClick}
          disabled={currentItem === 0}
        >Prev</button>

        <button className="next-button"
          onClick={handleNextClick}
          disabled={currentItem === itemList.length - 1}
        >Next</button>

      </div>
    )
  }
  