import { NavLink, Outlet } from "react-router-dom"
import { useViewEffect } from "../hooks/useViewEffect"

export function About() {
    useViewEffect('about')

    return (
        <section className="about">
            <div className="title-container">
                <h2>About us and Airbnb</h2>
                <p>Our Vision is to create a world where anyone can belong anywhere. The company aims to achieve this by providing a platform that connects people from all over the world, allowing them to share their unique spaces and experiences with others. By enabling travelers to find unique accommodations and experiences that are not available through traditional hospitality channels, Airbnb aims to create a more inclusive and connected world. In addition to this, the company is committed to sustainability and promoting responsible tourism practices to help protect local communities and the environment. Overall, Airbnb's vision is focused on creating a more diverse, inclusive, and sustainable world by promoting the sharing economy and fostering human connections.</p>
            </div>

            <nav className="flex">
                <NavLink replace to='/about/me'>Me</NavLink>
                <NavLink replace to='/about/vision'>Vision</NavLink>
            </nav>

            <Outlet />
        </section>
    )
}

export const AboutMe = () => {
    return (
        <div>
            <h2>About Me</h2>
            
            <p><strong>As a full-stack developer</strong>, I am passionate about creating innovative and impactful solutions to complex problems.</p>

            <p>With a <em>degree from Coding Academy</em> and <em>CCNA certification</em>, I bring a diverse skill set and a strong foundation in both front-end and back-end development.</p>

            <p>Additionally, I have a passion for <em>data analysis</em>, allowing me to make <em>data-driven decisions</em> and optimize performance for my projects.</p>

        </div>
    )
}

export const Vision = () => {
    return (
        <div>
            <h2>Our Vision</h2>
            <p>Our vision is to create a world where people can connect, learn, and grow through authentic experiences. We believe that everyone has something valuable to share, and by fostering connections between individuals and communities, we can promote greater understanding, empathy, and collaboration. Our focus is on creating opportunities for people to discover new cultures, traditions, and perspectives, and to build meaningful relationships with others. We are committed to sustainability and social responsibility, and we believe that by promoting responsible tourism and ethical business practices, we can create a more equitable and sustainable world for all.</p>
        </div>
    )
}