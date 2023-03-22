const _ = require('lodash')

const countries = require('../assets/data/countries.json')

const countriesMap = _.keyBy(countries, country => country.alpha3Code)

export const countryService = {
    query,
    getCountries,
    getMiddleEasts: () => middleEastCountries.concat(middleEastCities),
    getItalys: () => italyCities,
    getNewYorks: () => newYorkCounties.concat(newYorkCities),
    getSouthAmericas: () => Object.values(southAmericaCountries).flatMap(cities => cities),
    getFrances: () => Object.values(franceCities).flatMap(cities => cities),
}

function query(countryCode = null, filterBy = '') {
    var resCountries = countries

    if (countryCode) resCountries = countriesMap[countryCode].borders.map(code => countriesMap[code])

    resCountries = resCountries.filter(c => c.name.includes(filterBy))

    // Don't allow traveling to countries with "no borders"
    resCountries = resCountries.filter(c => c.borders && c.borders.length > 0)

    resCountries = resCountries.map(({ alpha3Code, name, borders, latlng, flag }) => ({ code: alpha3Code, name, borders, latlng, flag }))
    return resCountries
}

function getCountries() {
    return countries
}

const southAmericaCountries = {
    argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata', 'San Miguel de Tucumán', 'Salta', 'Santa Fe', 'San Juan', 'Resistencia', 'Corrientes', 'Posadas', 'Neuquén', 'Comodoro Rivadavia', 'Bahía Blanca', 'San Rafael', 'Río Gallegos', 'Ushuaia', 'Puerto Madryn'],
    bolivia: ['Santa Cruz de la Sierra', 'La Paz', 'Cochabamba', 'Oruro', 'Sucre', 'Tarija', 'Potosí', 'Trinidad', 'Riberalta', 'Yacuiba', 'Cobija', 'San Ignacio de Velasco', 'Villazón', 'Reyes', 'Viacha', 'Warnes', 'Montero', 'Quillacollo', 'El Alto', 'Sacaba'],
    brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Goiânia', 'Belém', 'Porto Alegre', 'Campinas', 'Guarulhos', 'São Luís', 'São Gonçalo', 'Maceió', 'Duque de Caxias', 'Natal', 'Teresina'],
    chile: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Iquique', 'Rancagua', 'Talca', 'Arica', 'Coquimbo', 'Puerto Montt', 'Osorno', 'Quilpué', 'Copiapó', 'Los Andes', 'La Ligua', 'San Antonio', 'Chillán', 'Linares'],
    colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Soledad', 'Ibagué', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Villavicencio', 'Valledupar', 'Montería', 'Pasto', 'Manizales', 'Neiva', 'Armenia', 'Tuluá', 'Popayán'],
    ecuador: ['Guayaquil', 'Quito', 'Cuenca', 'Santo Domingo de los Colorados', 'Machala', 'Durán', 'Manta', 'Portoviejo', 'Loja', 'Ambato', 'Esmeraldas', 'Ibarra', 'Quevedo', 'Riobamba', 'Jipijapa', 'Azogues', 'Babahoyo', 'La Libertad', 'Latacunga', 'El Carmen'],
    paraguay: ['Asunción', 'Ciudad del Este', 'San Lorenzo', 'Lambaré', 'Fernando de la Mora', 'Limpio', 'Capiatá', 'Ñemby', 'Encarnación', 'Mariano Roque Alonso', 'Pedro Juan Caballero', 'Villa Elisa', 'Itauguá', 'Villarrica', 'Caaguazú', 'Coronel Oviedo', 'Caacupé', 'San Antonio', 'Presidente Franco', 'Concepción', 'Pilar']
}

const newYorkCities = [
    'New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady',
    'Utica', 'White Plains', 'Hempstead', 'Troy', 'Niagara Falls', 'Binghamton', 'Freeport', 'Valley Stream', 'Long Beach',
    'Spring Valley', 'Rome', 'Ithaca', 'North Tonawanda', 'Poughkeepsie', 'Jamestown', 'Port Chester', 'Harrison', 'Mamaroneck',
    'Ossining', 'Peekskill', 'Glen Cove', 'Larchmont', 'Scarsdale', 'Dobbs Ferry', 'Tuckahoe', 'Irvington', 'Bronxville'
]

const middleEastCountries = ['Bahrain', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Palestine', 'Qatar', 'Saudi Arabia', 'Syria', 'Turkey', 'United Arab Emirates', 'Yemen']
const middleEastCities = ['Abu Dhabi', 'Amman', 'Ankara', 'Baghdad', 'Beirut', 'Cairo', 'Damascus', 'Doha', 'Dubai', 'Haifa', 'Istanbul', 'Jerusalem', 'Jeddah', 'Kuwait City', 'Manama', 'Muscat', 'Riyadh', 'Tehran', 'Tel Aviv', 'Tripoli']

const italyCities = ['Milan', 'Rome', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania', 'Venice', 'Verona', 'Messina', 'Padua', 'Trieste', 'Brescia', 'Prato', 'Taranto', 'Reggio Calabria', 'Modena', 'Livorno', 'Cagliari', 'Mestre', 'Parma', 'Foggia', 'Reggio Emilia', 'Acireale', 'Lecce', 'Treviso', 'Cremona', 'Lucca', 'Asti', 'Pescara', 'Como', 'Brindisi', 'Grosseto', 'Piacenza', 'Castellammare di Stabia', 'Faenza', 'Civitavecchia', 'Caserta', 'Cuneo', 'Savona', 'Pistoia', 'Aversa', 'Civitanova Marche', 'Cesena', 'Civitella del Tronto', 'Fermo', 'Pordenone', 'Biella', 'Massa', 'Lodi', 'Foligno', 'Gela', 'La Spezia', 'Cesano Maderno', 'Caltanissetta', 'Teramo', 'Viterbo', 'Agrigento', 'Avellino', 'Imola', 'Cittadella', 'Pompei', 'Oristano', 'San Benedetto del Tronto', 'Chiavari', 'Pergine Valsugana', 'Velletri', 'Gubbio', 'Faenza', 'Modica', 'Sora', 'San Giovanni in Persiceto', 'Rho', 'Mantova', 'Corigliano Calabro', 'Thiene', 'Cava de\' Tirreni', 'Giarre', 'Sulmona', 'Acquaviva delle Fonti', 'Barletta', 'Lamezia Terme', 'Iglesias', 'Grottaglie', 'Benevento', 'Sora', 'Casale Monferrato', 'Bassano del Grappa', 'Oderzo', 'Mazara del Vallo', 'Scordia', 'Rieti', 'Lumezzane', 'Trani', 'Cassino', 'Cavaion Veronese', 'San Miniato', 'Fasano', 'San Salvo', 'Santeramo in Colle', 'Grosseto', 'Sciacca', 'Roccadaspide', 'Osimo', 'L\'Aquila', 'Ascoli Piceno', 'Piacenza', 'Triggiano', 'Fabriano', 'Molfetta', 'Senigallia', 'L\'Arco', 'Alba', 'Pinerolo', 'Canicattì', 'Soverato', 'Thiene', 'Fidenza', 'Benevento', 'Cernusco sul Naviglio', 'Cologno Monzese', 'Bisceglie', 'Gaeta', 'Chiavari', 'Casal di Principe', 'Cuneo', 'Castelfranco Veneto', 'Caltagirone', 'Bagnacavallo', 'Marigliano', 'Sarzana', 'Venaria Reale', 'Santa Maria Capua Vetere', 'Pietras']

const newYorkCounties = [
    'Albany', 'Allegany', 'Bronx', 'Broome', 'Cattaraugus', 'Cayuga', 'Chautauqua', 'Chemung', 'Chenango', 'Clinton',
    'Columbia', 'Cortland', 'Delaware', 'Dutchess', 'Erie', 'Essex', 'Franklin', 'Fulton', 'Genesee', 'Greene', 'Hamilton',
    'Herkimer', 'Jefferson', 'Kings', 'Lewis', 'Livingston', 'Madison', 'Monroe', 'Montgomery', 'Nassau', 'New York',
    'Niagara', 'Oneida', 'Onondaga', 'Ontario', 'Orange', 'Orleans', 'Oswego', 'Otsego', 'Putnam', 'Queens', 'Rensselaer',
    'Richmond', 'Rockland', 'St. Lawrence', 'Saratoga', 'Schenectady', 'Schoharie', 'Schuyler', 'Seneca', 'Steuben',
    'Suffolk', 'Sullivan', 'Tioga', 'Tompkins', 'Ulster', 'Warren', 'Washington', 'Wayne', 'Westchester', 'Wyoming', 'Yates'
]

const franceCities = [
    'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille',
    'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon', 'Grenoble', 'Dijon', 'Nîmes', 'Angers', 'Villeurbanne',
    'Le Mans', 'Aix-en-Provence', 'Clermont-Ferrand', 'Brest', 'Limoges', 'Tours', 'Amiens', 'Perpignan', 'Metz', 'Besançon',
    'Boulogne-Billancourt', 'Orléans', 'Mulhouse', 'Rouen', 'Saint-Denis', 'Caen', 'Nancy', 'Saint-Paul', 'Montreuil', 'Argenteuil',
    'Saint-Denis', 'Roubaix', 'Tourcoing', 'Nanterre', 'Avignon', 'Créteil', 'Versailles', 'Pau', 'Poitiers', 'Calais',
    'Aubervilliers', 'Vitry-sur-Seine', 'Colombes', 'Fort-de-France', 'Les Abymes', 'Le Tampon', 'Saint-André', 'Saint-Louis',
    'Saint-Joseph', 'Le Port', 'Sainte-Suzanne', 'Cayenne', 'Saint-Laurent-du-Maroni', 'Matoury', 'Kourou', 'Remire-Montjoly'
]