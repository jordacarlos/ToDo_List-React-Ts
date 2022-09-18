import React, { Children } from 'react'

import styles from './modal.module.css'

type Props = {
    children: React.ReactNode;
}

const Modal = ({children}: Props) => {

    const closeModal =(e:React.MouseEvent): void =>{
        const modal = document.querySelector("#modal");
        modal!.classList.add("hide");
    };

  return (
    <div id='modal' className='hide'>
        <div className={styles.fade} >
        </div>
        <div className={styles.modal}>
        <i className="bi bi-arrow-bar-left" onClick={closeModal}></i>
            <h2>Editar</h2>
            {children}
        </div>
    </div>
  )
}

export default Modal