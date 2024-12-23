
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React, { useState, useRef } from 'react';
import './App.css';
import TEST from './sub_screen/TEST';
import QRCodeScanner from './sub_screen/QR_Scanner';
import LoadingDisplay from './sub_screen/loading';







function App() {
  const [currentPage, setCurrentPage] = useState('QR_Scanner');
  const nodeRef = useRef(null);
  const [isLoading, setisLoading] = useState(false);

  const getPageComponent = (page: string) => {
    switch (page) {
      case 'ListPage':
        return
      case 'QR_Scanner':
        return <QRCodeScanner setCurrentPage={setCurrentPage} setisLoading={setisLoading}/>;
      case 'TEST':
        return <TEST/>;
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
        <div>
          <div ref={nodeRef} className="page">
            {getPageComponent(currentPage)}
          </div>
          <div className="Loadingarea">
            <LoadingDisplay isLoading={isLoading} />
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App
