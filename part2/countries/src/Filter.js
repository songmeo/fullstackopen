const Filter = (props) => {
    return <div>find countries <input value={props.filterValue} onChange={props.handleFilter} /></div>
}

export default Filter