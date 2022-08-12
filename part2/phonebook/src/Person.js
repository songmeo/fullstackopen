const Person = (props) => {

    return (
        props.personsToShow.map(person => 
            <ul key={person.name}>
                {person.name} {person.number} <button type="submit" onClick={() => {if(window.confirm('Are you sure?')) props.deletePerson(person.id) }}>delete</button>
            </ul>
        )
    )
}

export default Person
