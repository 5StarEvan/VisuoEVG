import React, { useEffect, useRef } from 'react';
import { home, list, reset, pushValue, pop, initDisplay } from '../context/stack.js';

function Stack() {
    
  const visualRef = useRef(null);

  useEffect(() => {

    if (visualRef.current) {
      initDisplay();
    }

 
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <>
      <div className="user-input">
        
        <h1 className="Title">Stack Data Structure</h1>
        
        <div className="input-container">
          <input id="Input-Value" type="text" placeholder="Enter Values" />
          
          <div className="action-buttons">
            <button className="button" id="Add-Button" onClick={pushValue}>Push Value</button>
            <button className="button" id="Remove-Button" onClick={pop}>Pop</button>
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
    </>
  );
}

export default Stack;