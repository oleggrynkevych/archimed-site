function SiteInfoItem (props) {
    return(
       <div>
            <span className='site-info-subtitle'>{props.firstText}</span>
            <a href={props.href} target={props.target}>{props.secondText}</a>
       </div>
    )
}

export default SiteInfoItem;