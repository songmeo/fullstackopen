const Country = (props) => {
    return (
        props.countriesToShow.map(country => <ul key={country.name.common}>{country.name.common}</ul>)
    )
}

export default Country