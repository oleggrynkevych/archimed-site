import './Modal.css';
import modalBackIcon from '../../../images/modal-back-icon.svg';

function Modal({active, setActive, children}) {
    const handleModalActiveClick = () => {
        setActive(false);
    };

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={handleModalActiveClick}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                <div className='modal-content-header'>
                    <img src={modalBackIcon} alt='Modal Back Icon' onClick={handleModalActiveClick}/>
                </div>
                <div className='modal-content-container'>
                    {children}
                </div>
            </div>            
        </div>
    )
}

export default Modal;