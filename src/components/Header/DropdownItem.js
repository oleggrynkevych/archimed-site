function DropdownItem (props) {
    return(
        <button className='dropdown-item' onClick={props.onClick}>
            <a>{props.text}</a>
        </button>
    )
}

export default DropdownItem;