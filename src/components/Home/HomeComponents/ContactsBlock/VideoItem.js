function VideoItem ({...props}){
    return (
        <a href='https://calendly.com/d/y45-v9w-nhm/30-minute-preliminary-consultation?month=2023-06'
        target='_blank'
        rel={"noopener"}>
       <div className='video-item'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1443_569)">
                <path d="M15.3333 4.66663L10.6666 7.99996L15.3333 11.3333V4.66663Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.33329 3.33337H1.99996C1.26358 3.33337 0.666626 3.93033 0.666626 4.66671V11.3334C0.666626 12.0698 1.26358 12.6667 1.99996 12.6667H9.33329C10.0697 12.6667 10.6666 12.0698 10.6666 11.3334V4.66671C10.6666 3.93033 10.0697 3.33337 9.33329 3.33337Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_1443_569">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <span>{props.text}</span>
       </div>
       </a>
    )
}

export default VideoItem;