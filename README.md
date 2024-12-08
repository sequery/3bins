# 3 Bins Project

This React application displays a rotating set of images based on the selected bin type (Landfill, Compost, Recycle). Every fourth set includes a congratulatory message with specific styles applied.

## Features

- Rotates between sets of images every 9 seconds (6 seconds pause + 3 seconds transition).
- Displays different sets of images based on the selected bin type.
- Includes a congratulatory message in every fourth set with specific styles.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/sequery/3bins.git
    cd 3bins
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `src/App.js`: Main React component that handles the image rotation logic.
- `src/App.css`: CSS file for styling the application.
- `src/data.json`: JSON file containing the image data.

## Data Structure

The `data.json` file contains an array of image objects with the following structure:

```json
{
    "images": [
        {
            "src": "path/to/image.png",
            "alt": "Image description"
        },
        ...
    ]
}
```

## Example

Here is an example of how the images are grouped and displayed:

- Landfill Bin:

    - Images: image1.png, image2.png, image3.png
    - Congratulatory Message: "Every small step counts! Reducing landfill waste by even 10% can prevent millions of tons of methane emissions, a greenhouse gas 28 times more potent than CO₂."

- Compost Bin:

    - Images: image4.png, image5.png, image6.png
    - Congratulatory Message: "Congrats! Composting just one ton of organic waste prevents the release of 3 metric tons of CO₂ equivalent into the atmosphere, helping fight climate change!"

- Recycle Bin:

    - Images: image7.png, image8.png, image9.png
    - Congratulatory Message: "Great job! Recycling one ton of paper saves 17 trees, 7,000 gallons of water, 380 gallons of oil, and enough energy to power the average home for 6 months."

## Authors

- @sequery
- @nury25