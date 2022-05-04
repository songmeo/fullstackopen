const Person = (props) => {
    return (
        props.personsToShow.map(person => <ul key={person.name}>{person.name} {person.number}</ul>)
    )
}

export default Person