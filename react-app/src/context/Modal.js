import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalContext = React.createContext();


const ModalStyle = styled.div`

#modal {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #modal-background {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }

  #modal-content {
    position: absolute;
    background-color:#454a52;
  }
`

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <ModalStyle>
        <div id="modal">
        <div id="modal-background" onClick={onClose} />
        <div id="modal-content">
            {children}
        </div>
        </div>
    </ModalStyle>,
    modalNode
  );
}
