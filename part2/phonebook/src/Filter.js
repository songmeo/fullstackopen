const Filter = (props) => {
    return <div>filter shown with <input value={props.filterValue} onChange={props.handleFilter} /></div>
}

export default Filter