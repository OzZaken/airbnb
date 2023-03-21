import { useRef, useState } from "react"

export const CarouselApp = ({ items }) => {
  const [currItem, setCurrItem] = useState(0)
  const carouselRef = useRef(null)
  // handle single item or array of items

  const handlePrevClick = () => {
    if (currItem > 0) setCurrItem(currItem - 1)
  }

  const handleNextClick = () => {
    if (currItem < items.length - 1) setCurrItem(currItem + 1)
  }

  /* CMPS */
  const carousel = { className: 'main-carousel' }

  const innerCarousel = {
    className: 'carousel-container',
    ref: carouselRef
  }

  const carouselList = {
    items: Array.isArray(items) ? items : [items],
    currItem
  }

  const btnPrev = {
    className: 'prev-button',
    onClick: () => handlePrevClick,
    disabled: currItem === 0,
  }

  const btnNext = {
    className: 'next-button',
    onClick: () => handleNextClick,
    disabled: currItem === carouselList.length - 1,
  }

  return (
    <section {...carousel}>

      <ul {...innerCarousel}>
        <CarouselList {...carouselList} />
      </ul>

      <button {...btnPrev}>Prev</button>

      <button {...btnNext}>Next</button>

    </section>
  )
}

function CarouselList({ items, currItem }) {

  return items.map((item, idx) => {

    const itemCarousel = { className: `carousel-item ${idx === currItem ? "active" : ""}` }

    return <li {...itemCarousel} key={idx}>{item}</li>
  })
}