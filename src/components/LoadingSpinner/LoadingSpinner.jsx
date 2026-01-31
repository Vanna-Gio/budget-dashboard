import './LoadingSpinner.css';

function LoadingSpinner({ message = "Loading budget data..." }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;