import quotesIcon from '../../images/quotes-icon.svg';

function SliderTeamMember (props) {
    return(
        <div className='slider-team-member'>
            <div className='slider-team-member-photo'>
                <img src={props.src} alt='Team Member'/>
            </div>
            <div className='slider-team-member-content'>
                <div className='member-content-container'>
                    <div className='slider-team-member-comment'>
                        <div className='slider-team-member-comment-image'>
                            <img src={quotesIcon} alt='Quotes Icon'/>
                        </div>
                        <span>{props.quote}</span>
                    </div>
                    <div className='slider-team-member-person'>
                        <span>{`${props.firstname}\n${props.lastname}`}</span>
                        <span>{props.position}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderTeamMember;