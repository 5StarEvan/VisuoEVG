import './pageInProgress.css';

export default function PageInProgress() {
    const handleHome = () => {
      console.log('Navigate to home');
      // Add your navigation logic here
      // e.g., window.location.href = '/';
      // or if using React Router: navigate('/');
    };
  
    return (
      <div className="container">
        <button
          id="home-button"
          onClick={handleHome}
          className="button"
        >
          Back
        </button>
  
        <div className="content">
          <h1>
            Page Currently in Progress
          </h1>
          
          <div className="loader">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-4"></div>
          </div>
          
          <p>
            We're working hard to bring you something amazing.
          </p>
          
          <p className="coming-soon">
            Coming Soon
          </p>
        </div>
      </div>
    );
  }