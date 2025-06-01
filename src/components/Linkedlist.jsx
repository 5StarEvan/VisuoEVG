import React, { useEffect, useRef } from 'react';
import {addValue, removeValue, searchValue, reset, display, initDisplay} from '../context/linkedlist.js';

function Linkedlist() {

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
        
        <h1 className="Title">LinkedList Data Structure</h1>
        <div className="input-container">
          <input id="Input-Value" type="text" placeholder="Enter Value" />
          <input id="Input-Index" type="text" placeholder="Enter Index (optional)" />
          
          <div className="action-buttons">
            <button className="button" id="Add-Button" onClick={addValue}>Add</button>
            <button className="button" id="Remove-Button" onClick={removeValue}>Remove</button>
            <button className="button" id="Search-Button" onClick={searchValue}>Search</button>
          </div>
        </div>
        
        <div className="navigation-buttons">
          <button className="button" id="Home-Button" onClick={home}>Home</button>
          <button className="button" id="List-Button" onClick={list}>List</button>
          <button className="button" id="Reset-Button" onClick={reset}>Reset</button>
        </div>
      </div>
      
      <div className="visual" ref={visualRef}>
        <div className="element-data" id="addedElements"></div>
      </div>
    </>
  );
}

export default Linkedlist;