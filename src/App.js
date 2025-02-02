import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  // Slide tracking states
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [prevSetIndex, setPrevSetIndex] = useState(-1); // for animations

  // This state will hold the fun fact to show on the fun fact slide.
  const [currentFunFact, setCurrentFunFact] = useState("");

  // For this example, currentBin is fixed.
  const currentBin = "Landfill"; // (Can be "Landfill", "Compost", or "Recycle")

  // Background colors per bin
  const binBackgrounds = {
    Landfill: "#4c4b4b",
    Compost: "#5fa94f",
    Recycle: "#48ceff",
  };

  // Get all images from the imported data.
  const images = data.images;

  // Wrap the initialization of funFactsArray, startIndex, and imageFile in useMemo
  const { funFactsArray, startIndex, imageFile } = useMemo(() => {
    let funFactsArray = [];
    let startIndex = 0;
    let imageFile = "";

    // Set the parameters based on the current bin.
    if (currentBin === "Landfill") {
      startIndex = 0; // images 0..8 (3 slides of 3 images)
      funFactsArray = data.funFacts.landfill;
      imageFile = "Landfill.png";
    } else if (currentBin === "Compost") {
      startIndex = 9; // images 9..17
      funFactsArray = data.funFacts.compost;
      imageFile = "Compost.png";
    } else if (currentBin === "Recycle") {
      startIndex = 18; // images 18..26
      funFactsArray = data.funFacts.recycle;
      imageFile = "Recycle.png";
    }

    return { funFactsArray, startIndex, imageFile };
  }, [currentBin]);

  // Initialize currentFunFact on first render (if not set yet)
  useEffect(() => {
    if (!currentFunFact && funFactsArray.length > 0) {
      setCurrentFunFact(funFactsArray[0]);
    }
  }, [currentFunFact, funFactsArray]);

  // Build an array of slide sets.
  // The first several slides are the regular image slides, and the last slide is the fun fact.
  const imageSets = [];
  // Regular images: group 9 images into 3 slides (3 images per slide)
  for (let i = startIndex; i < startIndex + 9; i += 3) {
    imageSets.push(images.slice(i, i + 3));
  }
  // Append the singular fun fact slide.
  imageSets.push([
    {
      src: `images/${imageFile}`,
      alt: currentFunFact,
    },
  ]);

  // Advance the slideshow every 9 seconds.
  // When we leave the fun fact slide (i.e. when the last slide was current), we update the fun fact.
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSetIndex(currentSetIndex);
      setCurrentSetIndex((oldIndex) => {
        const newIndex = (oldIndex + 1) % imageSets.length;
        // If we're leaving the fun fact slide (the last slide),
        // update the current fun fact to the next fact.
        if (oldIndex === imageSets.length - 1) {
          setCurrentFunFact((prev) => {
            const currentIndex = funFactsArray.indexOf(prev);
            const nextIndex = (currentIndex + 1) % funFactsArray.length;
            return funFactsArray[nextIndex];
          });
        }
        return newIndex;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, [currentSetIndex, imageSets.length, funFactsArray]);

  return (
    <div
      className="App"
      style={{ backgroundColor: binBackgrounds[currentBin] }}
    >
      <div className="container">
        {imageSets.map((set, setIndex) => {
          // Determine positioning for the animation.
          const isActive = setIndex === currentSetIndex;
          const isPrevious = setIndex === prevSetIndex;
          let topValue = "-100%"; // off-screen above
          let opacityValue = 0;

          if (isActive) {
            topValue = "50%"; // centered
            opacityValue = 1;
          } else if (isPrevious) {
            topValue = "150%"; // off-screen below
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
