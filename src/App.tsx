import QRCodeScanner from './sub_screen/QR_Scanner';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [ currentPage, setCurrentPage ] = useState('QR_Scanner');
  const nodeRef = useRef(null);

  const getPageComponent = (page: string) => {
    switch (page) {
      case 'ListPage':
        return
      case 'QR_Scanner':
        return <QRCodeScanner setCurrentPage={setCurrentPage} />;
      default:
        return null;
    }
  };

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={currentPage}
        timeout={{ enter: 500, exit: 300 }}
        className="fade"
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef} className="page">
          {getPageComponent(currentPage)}
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App
