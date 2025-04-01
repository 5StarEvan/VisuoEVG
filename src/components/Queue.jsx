import React, { useEffect, useRef } from 'react';
import { home, list, initDisplay, addValue, reset, removeValue, display } from '../context/queue.js';

function Queue() {
  const visualRef = useRef(null);
  
  useEffect(() => {
    
    if (visualRef.current) {

      initDisplay(visualRef.current);
      display();
    }
    
    return () => {
      window.removeEventListener('resize', display);
    };
  }, []);

  return (
    <div>
      <div className="user-input">
        <h1 className="Title">Queue Data Structure</h1>
        
        <div className="input-container">
          <input id="Input-Value" type="text" placeholder="Enter Values" />
          
          <div className="action-buttons">
            <button className="button" id="Add-Button" onClick={addValue}>Add Value to Queue</button>
            <button className="button" id="Remove-Button" onClick={removeValue}>Remove Value from Queue</button>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="button" id="Home-Button" onClick={home}>Back to Home</button>
          <button className="button" id="List-Button" onClick={list}>Back to List</button>
          <button className="button" id="Reset-Button" onClick={reset}>Reset</button>
        </div>
      </div>
      
      <div className="visual" ref={visualRef}>
        <div className="element-data" id="addedElements"></div>
      </div>
    </div>
  );
}

export default Queue;