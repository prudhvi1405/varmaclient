import React, { useState, useEffect } from 'react';
import './ImageGallery.css';
import churn from '../../images/churn.png'
import churn1 from '../../images/churn1.png'
import churn2 from '../../images/churn2.png'
import churn3 from '../../images/churn3.png'

const ChurnPrediction: React.FC = () => {
  // State to manage whether images are ready to be displayed
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a delay for loading images (1-2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // After 1-2 seconds, set isLoading to false
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, []);

  return (
    <div className="gallery-container">
      {isLoading ? (
        <div className="loading-message">
          <p>Running the model and interpreting results...</p>
        </div>
      ) : (
        <>
          <div className="image-card">
            <img src={churn} alt="Image 1" />
          </div>
          <div className="image-card">
            <img src={churn1} alt="Image 2" />
          </div>
          <div className="image-card">
            <img src={churn2} alt="Image 3" />
          </div>
          <div className="image-card">
            <img src={churn3} alt="Image 4" />
          </div>
        </>
      )}
    </div>
  );
};

export default ChurnPrediction;