function SiteInfoItem (props) {
    return(
       <div>
            <span >{props.firstText}</span>
            <a href={props.href} target={props.target}>{props.secondText}</a>
       </div>
    )
}

export default SiteInfoItem;