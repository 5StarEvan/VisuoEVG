import React, { useState, useEffect } from 'react';
import {returnHome, clearSearch, search, searchEvL} from '../context/list.js';

import { FaLink,FaLayerGroup,FaStream,FaCodeBranch,FaProjectDiagram,FaRoute,FaExpand,FaSearch,FaTimes,FaHome,FaGithub,FaTwitter,FaLinkedin} from 'react-icons/fa';

function List() {

  const [searchQ, setSearchQ] = useState('');
  const [NoResults, setShowNR] = useState(false);

  useEffect(() => {searchEvL();}, []);

  function Search() {
    search();
    const noResultsElement = document.getElementById('noResults');
    setShowNR(!noResultsElement.classList.contains('hidden'));
  }

  function searchTextClear() {
    clearSearch();
    setSearchQ('');
    setShowNR(false);
  }

  function returnHomePage() {
    returnHome();
  }

  return (

    <div className="app-container">
      <header className="header">
        <div className="home-button">
          <button className="button" onClick={returnHomePage}>
            <FaHome className="inline mr-2" />
            Return To Home
          </button>
        </div>
        <h1>Data Structure Visualizer</h1>
        <p className="subtitle">Explore and learn different data structures</p>
      </header>


      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            id="searchInput"
            placeholder="Search data structures..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
          <button
            id="clearButton"
            className="clear-button"
            title="Clear search"
            onClick={searchTextClear}
          >
            <FaTimes className="inline mr-1" />
            Clear
          </button>
        </div>
        <button id="searchButton" className="search-button" onClick={Search}>
          <FaSearch className="inline mr-2" />
          Search
        </button>
      </div>

      <div id="noResults" className={`no-results ${NoResults ? '' : 'hidden'}`}>
        <p>No data structures found matching your search.</p>
      </div>

      <h2 className="Information-Header" id="Data-Structure-Header">Data Structures</h2>

      <div className="data-structure-grid-container">
        <a href="/linkedlist" className="Data-Structure-Link" id="LinkedList-Structure-Link">
          <div className="icon-container">
            <FaLink className="text-6xl mb-4 text-blue-600" />
          </div>
          <h3>LinkedList</h3>
        </a>

        <a href="/stack" className="Data-Structure-Link" id="Stack-Structure-Link">
          <div className="icon-container">
            <FaLayerGroup className="text-6xl mb-4 text-green-600" />
          </div>
          <h3>Stack</h3>
        </a>

        <a href="/queue" className="Data-Structure-Link" id="Queue-Structure-Link">
          <div className="icon-container">
            <FaStream className="text-6xl mb-4 text-purple-600" />
          </div>
          <h3>Queue</h3>
        </a>

        <a href="/tree" className="Data-Structure-Link" id="Tree-Structure-Link">
          <div className="icon-container">
            <FaCodeBranch className="text-6xl mb-4 text-orange-600" />
          </div>
          <h3>Tree</h3>
        </a>

        <a href="/graph" className="Data-Structure-Link" id="Graph-Structure-Link">
          <div className="icon-container">
            <FaProjectDiagram className="text-6xl mb-4 text-red-600" />
          </div>
          <h3>Graph</h3>
        </a>
      </div>

      <h2 className="Information-Header" id="Algorithm-Header">Algorithms</h2>

      <div className="algorithm-grid-container">

        <a href="/dfs" className="Algorithm-Link" id="DFS-Link">
        
          <div className="icon-container">

            <FaRoute className="text-6xl mb-4 text-indigo-600" />
            
          </div>
          <h3>DFS</h3>
        </a>

        <a href="/bfs" className="Algorithm-Link" id="BFS-Link">
          <div className="icon-container">
            <FaExpand className="text-6xl mb-4 text-teal-600" />
          </div>
          <h3>BFS</h3>
        </a>
      </div>



      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Data Visualizer</h4>
            <p>An interactive platform to help you understand data structures and algorithms.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">Home</a></li>
              <li><a href="#" className="footer__link">Algorithms</a></li>
              <li><a href="#" className="footer__link">Resources</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <FaGithub className="inline mr-1" />
                GitHub
              </a>
              <a href="#" className="social-icon">
                <FaTwitter className="inline mr-1" />
                Twitter
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin className="inline mr-1" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <ul className="footer__links footer__links--inline">
            <li><a href="#" className="footer__link footer__link--small">Privacy Policy</a></li>
            <li><a href="#" className="footer__link footer__link--small">Terms of Service</a></li>
            <li><a href="#" className="footer__link footer__link--small">Contact Us</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default List;