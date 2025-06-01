import React, { useEffect, useRef } from 'react';
import { startDFSAnimation, Reset, display, initDisplay} from '../context/dfs.js';

function DFS() {

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


  function home() {
    window.location.href = "home";
  }

  function list() {
    window.location.href = "list";
  }

  return (
    <>
      <div className="user-input">

        <h1 className="Title">DFS Algorithm</h1>
        
        <div className="input-container">
          <input id="Speed-DFS-Value" type="text" placeholder="Enter Speed" />
          <input id="Start-DFS-Value" type="text" placeholder="Enter Start Value" />
          <input id="End-DFS-Value" type="text" placeholder="Enter End Value" />
          
          <div className="action-buttons">
            <button className="button" id="Add-Button" onClick={startDFSAnimation}>Start DFS</button>
            <button className="button" id="Remove-Button" onClick={Reset}>Reset</button>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="button" id="Home-Button" onClick={home}>Back to Home</button>
          <button className="button" id="List-Button" onClick={list}>Back to List</button>
          <button className="button" id="Reset-Button" onClick={Reset}>Reset</button>
        </div>
      </div>
      
      <div className="visual" ref={visualRef}>
        <div className="element-data" id="addedElements"></div>
      </div>
    </>
  );
}

export default DFS;