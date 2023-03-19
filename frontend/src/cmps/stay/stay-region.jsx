import {  useState } from 'react'
import southAmericaImage from '../../assets/imgs/png/south-america.png'
import newYorkImage from '../../assets/imgs/png/new-york.png'
import middleEastImage from '../../assets/imgs/png/middle-east.png'
import italyImage from '../../assets/imgs/png/italy.png'
import flexibleImage from '../../assets/imgs/png/flexible.png'
import franceImage from '../../assets/imgs/png/france.png'

// import {StayDestination} from './stay-region'
{/* <StayDestination onChangeDestination={onChangeDestination} /> */}

export const StayDestination = ({ onChangeDestination }) => {
    const [selectedDestination, setSelectedDestination] = useState(null)

    const onSetDestination = (region) => {
        setSelectedDestination(region)
        onChangeDestination(region)
    }

    return <section className="stay-region">
        {selectedDestination && <p>Recent searches: {selectedDestination}</p>}

        <ul className="region-by">
            <li>
                <button onClick={() => onSetDestination(null)}>
                <img src={flexibleImage} alt="I'm flexible" />
                <span>I'm flexible</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetDestination("new-york")}>
                <img src={newYorkImage} alt="New York" />
                <span>New York</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetDestination("middle-east")}>
                <img src={middleEastImage} alt="Middle East" />
                <span>Middle East</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetDestination("italy")}>
                <img src={italyImage} alt="Italy" />
                <span>Italy</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetDestination("south-america")}>
                    <img src={southAmericaImage} alt="South America" />
                    <span>South America</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetDestination("france")}>
                <img src={franceImage} alt="France" />
                <span>France</span>
                </button>
            </li>
        </ul>
    </section>
}