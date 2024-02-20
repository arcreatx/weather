import React, { useState, useEffect } from 'react';
import './App.css';

const api = {
  key: "09bdec72452a615c86e929ea3c01ecae",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("")
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
        const response = await fetch(url);
        const data = response.json();
        setWeatherInfo(JSON.stringify(data));
      } catch (error) {
        setErrorMessage(error.message)
      }
      setLoading(false)
    }
    fetchWeatherData();
  }, [searchCity])

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  }

  return (
    <>
      <h1>Fetch Data with useEffect</h1>
      <form>
        <input 
        type="text" 
        placeholder="City" 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
    </>
  );
}

export default App;
