import React, { useState, useEffect } from 'react';
import {returnHome, clearSearch, search, searchEvL} from '../context/list.js';

function List() {

  const [searchQ, setSearchQ] = useState('');
  const [NoResults, setShowNR] = useState(false);

  useEffect(() => {
    searchEvL();
  }, []);

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
          <button className="button" onClick={returnHomePage}>Return To Home</button>
        </div>
        <h1>Data Structure Visualizer</h1>
        <p className="subtitle">Explore and learn different data structures</p>
      </header>

      <main className="main-content">
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
              Clear
            </button>
          </div>
          <button id="searchButton" className="search-button" onClick={Search}>
            Search
          </button>
        </div>

        <div id="noResults" className={`no-results ${NoResults ? '' : 'hidden'}`}>
          <p>No data structures found matching your search.</p>
        </div>

        <h2 className="Information-Header" id="Data-Structure-Header">
          Data Structures
        </h2>
        <div className="data-structure-grid-container">
          <a href="/linkedlist" className="Data-Structure-Link" id="LinkedList-Structure-Link">
            <div className="icon-container">
              LinkedList
            </div>
            <h3>LinkedList</h3>
          </a>
          <a href="/stack" className="Data-Structure-Link" id="Stack-Structure-Link">
            <div className="icon-container">
              Stack
            </div>
            <h3>Stack</h3>
          </a>
          <a href="/queue" className="Data-Structure-Link" id="Queue-Structure-Link">
            <div className="icon-container">
              Queue
            </div>
            <h3>Queue</h3>
          </a>
          <a href="/tree" className="Data-Structure-Link" id="Tree-Structure-Link">
            <div className="icon-container">
              Tree
            </div>
            <h3>Tree</h3>
          </a>
          <a href="/graph" className="Data-Structure-Link" id="Graph-Structure-Link">
            <div className="icon-container">
              Graph
            </div>
            <h3>Graph</h3>
          </a>
        </div>

        <h2 className="Information-Header" id="Algorithm-Header">
          Algorithms
        </h2>
        <div className="algorithm-grid-container">
          <a href="/dfs" className="Algorithm-Link" id="DFS-Link">
            <div className="icon-container">
              DFS
            </div>
            <h3>DFS</h3>
          </a>
          <a href="/bfs" className="Algorithm-Link" id="BFS-Link">
            <div className="icon-container">
              BFS
            </div>
            <h3>BFS</h3>
          </a>
        </div>
      </main>

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
                GitHub
              </a>
              <a href="#" className="social-icon">
                Twitter
              </a>
              <a href="#" className="social-icon">
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

export default Lis