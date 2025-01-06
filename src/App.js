import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [prevSetIndex, setPrevSetIndex] = useState(-1); // -1 to indicate "none" initially
  const [currentBin, setCurrentBin] = useState("Landfill");

  const binBackgrounds = {
    Landfill: '#873929',
    Compost: '#5fa94f',
    Recycle: '#48ceff',
  };

  // Build up your imageSets as before
  const images = data.images;
  const imageSets = [];
  if (currentBin === "Landfill") {
    
    for (let i = 0; i < 9; i += 3) {
      imageSets.push(images.slice(i, i + 3));
    }
    // imageSets.push([
    //   {
    //     src: "images/Landfill.png",
    //     alt: "Every small step counts! Reducing landfill waste by even 10% can prevent millions of tons of methane emissions, a greenhouse gas 28 times more potent than CO₂.Every small step counts! Reducing landfill waste by even 10% can prevent millions of tons of methane emissions, a greenhouse gas 28 times more potent than CO₂.",
    //   },
    // ]);
  } else if (currentBin === "Compost") {
    for (let i = 9; i < 18; i += 3) {
      imageSets.push(images.slice(i, i + 3));
    }
    // imageSets.push([
    //   {
    //     src: "images/Compost.png",
    //     alt: "Congrats! Composting just one ton of organic waste prevents the release of 3 metric tons of CO₂ equivalent into the atmosphere, helping fight climate change!",
    //   },
    // ]);
  } else if (currentBin === "Recycle") {
    for (let i = 18; i < 27; i += 3) {
      imageSets.push(images.slice(i, i + 3));
    }
    // imageSets.push([
    //   {
    //     src: "images/Recycle.png",
    //     alt: "Great job! Recycling one ton of paper saves 17 trees, 7,000 gallons of water, 380 gallons of oil, and enough energy to power the average home for 6 months.",
    //   },
    // ]);
  }

  // Advance the slideshow in one effect, capturing old/current indices together
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSetIndex(currentSetIndex);
      setCurrentSetIndex((oldIndex) => (oldIndex + 1) % imageSets.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [currentSetIndex, imageSets.length]);

  return (
    <div className="App"
      style={{
        backgroundColor: binBackgrounds[currentBin],
      }}
    >
      <div className="container">
        {imageSets.map((set, setIndex) => {
          const isActive = setIndex === currentSetIndex; 
          const isPrevious = setIndex === prevSetIndex;

          /**
           * We’ll define default positions:
           *   1) Slides that are *not* active or previous => appear above the screen (top: -100%)
           *   2) The currently active slide => center (top: 50%)
           *   3) The previous slide => transitions down out of the screen (top: 150%)
           */
          let topValue = "-100%";
          let opacityValue = 0;

          if (isActive) {
            // New slide enters from -100% => 50% (flows downward)
            topValue = "50%";
            opacityValue = 1;
          } else if (isPrevious) {
            // Old slide goes from 50% => 150% (flows downward off-screen)
            topValue = "150%";
            opacityValue = 0;
          }

          return (
            <div
              key={setIndex}
              className="image-set"
              style={{
                opacity: opacityValue,
                top: topValue,
                transform: "translateY(-50%)", 
                transition: "top 3s ease, opacity 3s ease",
              }}
            >
              {set.map((image, index) => (
                <div key={index} className="image-container">
                  <h2>{image.alt}</h2>
                  <img src={image.src} alt={image.alt} className="image" />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
