import React, { useEffect, useState } from 'react';
import './App.css';
import data from './data.json';

function App() {
  // State Hooks
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentBin, setCurrentBin] = useState("Recycle");

  // Images and ImageSets
  const images = data.images;
  const imageSets = [];

  // ImageSets based on currentBin
  if(currentBin === "Landfill"){
    for (let i = 0; i < 9; i += 3) {
      imageSets.push(images.slice(i, i + 3));
    }
    imageSets.push([{src: "Landfill.png", 
      alt: "Every small step counts! Reducing landfill waste by even 10% can prevent millions of tons of methane emissions, a greenhouse gas 28 times more potent than CO₂.",
      style: "font-weight: 400, white-space: nowrap, width: 100px;",
    }]);
  } 
  else if(currentBin === "Compost"){
    for (let i = 9; i < 18; i += 3) {
      imageSets.push(images.slice(i, i + 3));
    }
    imageSets.push([{src: "Compost.png", 
      alt: "Congrats! Composting just one ton of organic waste prevents the release of 3 metric tons of CO₂ equivalent into the atmosphere, helping fight climate change!",
    }]);
  }
  else if(currentBin === "Recycle"){
    for (let i = 18; i < 27; i += 3) {
      imageSets.push(images.slice(i, i + 3));
    }
    imageSets.push([{src: "Recycle.png", 
      alt: "Great job! Recycling one ton of paper saves 17 trees, 7,000 gallons of water, 380 gallons of oil, and enough energy to power the average home for 6 months.",
    }]);
  }

  // Interval to change image sets
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSetIndex((prevIndex) => (prevIndex + 1) % imageSets.length);
    }, 9000); // 6 seconds pause + 3 seconds transition

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="App">
      <div className="container">
      {imageSets.map((set, setIndex) => (
          <div
            key={setIndex}
            className="image-set"
            style={{
              opacity: currentSetIndex === setIndex ? 1 : 0,
              top: currentSetIndex === setIndex ? '50%' : '100%',
              transform: 'translateY(-50%)',
              transition: 'top 3s, opacity 3s'
            }}
          >
            {set.map((image, index) => (
              <div key={index} className="image-container">
                <h2>{image.alt}</h2>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="image"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;