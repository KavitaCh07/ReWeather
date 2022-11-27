import React from 'react';
import './modal.css';

const Modal = (props: any) => {
    return (
        <div className='modal'>
            <div className="overlay">
                <div className="modal-content">
                    <div className="modal-inner-content">
                        <div className="are-u-sure">Are you sure want to remove all the favourites?</div>

                        <div className="two-button">
                            <button className='no-btn' onClick={() => props.setModal(false)} type='submit'><span className='no-text'>No</span></button>
                            <button type='submit' className='yes-btn' onClick={() => { localStorage.removeItem("fav"); props.setModal(false); }}><span className='yes-text'>Yes</span></button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal;
