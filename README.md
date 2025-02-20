# Weather App 🌧️

This project is a **Weather Application** that provides real-time weather information and a 5-day forecast for cities worldwide. Built using HTML, CSS, and JavaScript, the app integrates the OpenWeather API to display current weather data, such as temperature, weather conditions, humidity, and wind speed.

---

## Features 🚀

- **Search for Any City**: Search functionality to find weather information for any city.
- **Current Weather Data**:
  - Temperature (in Celsius or Fahrenheit).
  - Weather condition (e.g., Clear, Rain, Snow).
  - Humidity percentage.
  - Wind speed.
- **5-Day Weather Forecast**: Displays forecasted temperature and weather icons for the next five days at noon.
- **Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F) with a stylish toggle button.
- **Dynamic Backgrounds**: The app changes the background image based on the time of day (Morning, Afternoon, Evening, Night).
- **Responsive Design**: Works seamlessly on different devices (desktop, tablet, mobile).
- **Local Storage Support**: Remembers the user’s preferred temperature unit.

---


## Technologies Used 💻

- **HTML**: For structuring the application.
- **CSS**: For styling the application, including animations and transitions.
- **JavaScript**: For fetching weather data, DOM manipulation, and handling user interactions.
- **OpenWeather API**: To fetch real-time weather data and forecasts.

---

## How It Works 🔧

1. Enter the city name in the search bar and click the **Search** button (or press Enter).
2. The app fetches and displays:
   - Current weather details: Temperature, weather condition, humidity, and wind speed.
   - A 5-day forecast with daily temperature and icons.
3. Use the **toggle switch** to change the temperature unit (Celsius ↔ Fahrenheit). The app saves your preference.
4. The background image updates automatically based on the time of day.

---

## Installation & Setup ⚡️

Follow these steps to set up and run the Weather App on your local machine:

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge).
- A text editor (e.g., VS Code, Sublime Text).
- An internet connection to fetch weather data from the OpenWeather API.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

---

## API Key 🔑

This project uses the **OpenWeather API**. To use the app, you need to obtain an API key:

1. Sign up at [OpenWeather](https://home.openweathermap.org/users/sign_up).
2. Go to the [API Keys section](https://home.openweathermap.org/api_keys).
3. Generate an API key.
4. Replace the placeholder `apiKey` in the `script.js` file with your API key:
   ```javascript
   const apiKey = 'YOUR_API_KEY_HERE';
   ```

---

## Project Structure 📂

```plaintext
├── assets/
│   ├── weather/        # Weather icons (e.g., clear, rain, snow)
│   ├── backgrounds/    # Background images for different times of day
│   ├── screenshots/    # Screenshots for the README file
├── styles.css          # Main stylesheet
├── index.html          # Main HTML file
├── script.js           # Main JavaScript file
├── README.md           # Documentation file
```

---

## Customization 🎨

You can customize the app by modifying:

- **Weather Icons**: Add or replace icons in the `assets/weather/` folder.
- **Background Images**: Change the images in `assets/backgrounds/`.
- **Styling**: Update the `styles.css` file to change the app’s appearance.

---

## Contributing 🤝

Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License 📚

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute the code.

---

## Acknowledgements 🙏

- [OpenWeather API](https://openweathermap.org/) for providing weather data.
- [Unsplash](https://unsplash.com/) for inspiring background image ideas.

---

## Demo 🎮

Check out the live demo here: 

