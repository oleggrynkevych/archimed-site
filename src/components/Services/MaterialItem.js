function MaterialItem(props) {
    const { title, text, onClick } = props;

    return(
        <div className='material-item' onClick={onClick}>
            <div className='material-item-container'>
                <span className='material-item-title'>{title}</span>
                <span className='material-item-text'>{text}</span>
                <div className='material-item-link'>
                    <span>дізнатись більше</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.89791 13.5218L4.54436 13.8754L5.25146 14.5825L5.60502 14.2289L4.89791 13.5218ZM13.105 6.72892C13.3003 6.53366 13.3003 6.21707 13.105 6.02181C12.9098 5.82655 12.5932 5.82655 12.3979 6.02181L13.105 6.72892ZM5.60502 14.2289L13.105 6.72892L12.3979 6.02181L4.89791 13.5218L5.60502 14.2289Z" fill="currentColor"/>
                        <path d="M5.25146 6.37537H12.7515V13.8754" stroke="currentColor" strokeLinecap="square"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default MaterialItem