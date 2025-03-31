import React from 'react';


function Home() {
  
  const login = () => {
    console.log('Login clicked');
  };

  const signup = () => {
    console.log('Signup clicked');
  };

  return (
    <div className="app-container">

      <nav className="nav-bar">
        <div className="title">VisuoEG</div>
        <ul className="navbar-links" id="navLinks">
          <li><a href="#home" className="navbar-link">Home</a></li>
          <li><a href="#features" className="navbar-link">Features</a></li>
          <li><a href="#about" className="navbar-link">About</a></li>
          <li><a href="#contact" className="navbar-link">Contact</a></li>
          <button className="button" onClick={login}>Login</button>
          <button className="button" onClick={signup}>Sign up</button>
        </ul>
      </nav>


      <section className="main" id="home">
        <div className="main-content">
          <h1 className="main-title">Visualize Code <span className="text-gradient">Like Never Before</span></h1>
          <p className="main-description">Transform complex data into beautiful, interactive visualizations.</p>
          <div className="main-buttons">
            <a href="list" className="get-started-button">Get Started</a>
            <a href="#about" className="learn-more-button">Learn More</a>
          </div>
        </div>
      </section>


      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Our Features</h2>
          <p className="features-subtitle">Powerful tools to help you understand and visualize complex data structures and algorithms</p>
          <div className="features-boxes">

            <div className="features-box" data-aos="fade-up" data-aos-delay="100">
              <div className="features-box-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="features-box-title">Interactive</h3>
              <p className="features-box-description">Allows user control and input</p>
            </div>


            <div className="features-box" data-aos="fade-up" data-aos-delay="200">
              <div className="features-box-icon">
                <i className="fas fa-code-branch"></i>
              </div>
              <h3 className="features-box-title">Algorithm Visualization</h3>
              <p className="features-box-description">Watch algorithms in action with step-by-step visualization.</p>
            </div>
            

            <div className="features-box" data-aos="fade-up" data-aos-delay="300">
              <div className="features-box-icon">
                <i className="fas fa-database"></i>
              </div>
              <h3 className="features-box-title">Data Structure Models</h3>
              <p className="features-box-description">Interactive models of complex data structures like trees, graphs, with intuitive interfaces.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-image">

              <img src="/api/placeholder/400/400" alt="Profile Picture" className="profile-image" />
            </div>
            <div className="about-me">
              <h3 className="about-me-name">Evan Guo</h3>
              <p className="about-me-title">Student</p>
              <p className="about-me-description">
                I'm passionate about making complex concepts in computer science accessible to everyone. 
                I've created this platform to help students and professionals visualize and understand data structures and algorithms.
              </p>
            </div>
          </div>
        </div>
      </section>


      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">VisuoEG</div>

            <ul className="footer-links">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#about" className="footer-link">About</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
            </ul>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;