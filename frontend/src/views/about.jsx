import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { NavLink, Outlet} from "react-router-dom"
import { Counter } from "../cmps/counter"
import { updateView } from '../store/system.actions'

export function About() {
    const dispatch = useDispatch()
    // VIEW
    useEffect(() => {
        //  -   mount
        dispatch(updateView('about'))

        //  -   ux ui
        document.body.classList.add("about-page")
        setTimeout(() => { document.title = ' $i About' }, 1500)


        //  -   unmount
        return () => {
            document.body.classList.remove("about-page")
            document.title = 'Bye from about'
        }
    }, [])

    return (
        <section className="about">
            <section className="title-container">
                <h2>About us and Airbnb</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla minus explicabo ipsum necessitatibus cupiditate facere corrupti, praesentium tempora molestias, accusantium repellendus, in quasi. Iste labore maxime, vitae nulla odit sint.</p>
            </section>

            <nav>
                <NavLink replace to='/about/team'>Team</NavLink>
                <NavLink replace to='/about/vision'>Vision</NavLink>
            </nav>

            <section>
                <Outlet />
            </section>

            <section>
                <Counter />
            </section>

        </section>
    )
}