const Countries = ({ countries, filter }) => {

    
if (!filter) return <div>Type a country name...</div>

    const filtered = countries.filter((country) => 
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    }

    if (filtered.length === 1) {
        const country = filtered[0];
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png} alt="flag" width="150" />
            </div>
        );
    }

    return (
        <div>
            {filtered.map((country) => (
                <div key={country.cca3}>{country.name.common}</div>
            ))}
        </div>
    );
};

export default Countries;