import {  useState } from 'react'

import southAmericaImage from '../../assets/imgs/png/south-america.png'
import newYorkImage from '../../assets/imgs/png/new-york.png'
import middleEastImage from '../../assets/imgs/png/middle-east.png'
import italyImage from '../../assets/imgs/png/italy.png'
import flexibleImage from '../../assets/imgs/png/flexible.png'
import franceImage from '../../assets/imgs/png/france.png'


export const StayRegionBy = ({ onChangeRegion }) => {
    const [selectedRegion, setSelectedRegion] = useState(null)

    const onSetRegionBy = (regionBy) => {
        setSelectedRegion(regionBy)
        onChangeRegion(regionBy)
    }

    return <section className="stay-region">
        {selectedRegion && <p>Recent searches: {selectedRegion}</p>}

        <ul className="region-by">
            <li>
                <button onClick={() => onSetRegionBy(null)}>
                <img src={flexibleImage} alt="I'm flexible" />
                <span>I'm flexible</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetRegionBy('new-york')}>
                <img src={newYorkImage} alt="New York" />
                <span>New York</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetRegionBy('middle-east')}>
                <img src={middleEastImage} alt="Middle East" />
                <span>Middle East</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetRegionBy('italy')}>
                <img src={italyImage} alt="Italy" />
                <span>Italy</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetRegionBy('south-america')}>
                    <img src={southAmericaImage} alt="South America" />
                    <span>South America</span>
                </button>
            </li>

            <li>
                <button onClick={() => onSetRegionBy('france')}>
                <img src={franceImage} alt="France" />
                <span>France</span>
                </button>
            </li>
        </ul>
    </section>
}