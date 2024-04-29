import React, { useEffect, useState } from 'react';
import './weather.css';
import winddd from './assets/winddd.png';
import huuu from './assets/huuu.png';
import cloud2 from './assets/cloud2.png';
import drizzle from './assets/drizzle.png';
import rain from './assets/rain.png';
import search11 from './assets/search11.png';
import snow from './assets/snow.png';
import sunny2 from './assets/sunny2.png.png';
import axios from 'axios';

const Weather = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: rain
  });
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput !== '') {
      let apiUrl = '';
      if (isNaN(searchInput)) {
        
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=e31bcfc8f95257d38f227fe84af0be41&units=metric`;
      } else {
        
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${searchInput},&appid=e31bcfc8f95257d38f227fe84af0be41&units=metric`;
      }

      axios
        .get(apiUrl)
        .then(res => {
          let imagePath = '';
          if (res.data.weather[0].main === 'Clouds') {
            imagePath = cloud2;
          } else if (res.data.weather[0].main === 'Clear') {
            imagePath = sunny2;
          } else if (res.data.weather[0].main === 'Rain') {
            imagePath = rain;
          } else if (res.data.weather[0].main === 'Drizzle') {
            imagePath = drizzle;
          } else if (res.data.weather[0].main === 'Mist') {
            imagePath = snow;
          } else {
            imagePath = rain;
          }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath
          });
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <div className='topbar'>
        <div className='search_icon'>
          <input type='text' className='cityInput' placeholder='Enter city name' onChange={e => setSearchInput(e.target.value)} />
          <button>
            <img src={search11} onClick={handleSearch} alt='' />
          </button>
        </div>
         
        
        <div className='winfo'>
          <div>
            <img src={data.image} alt='' className='icon' />
            <h1>{Math.round(data.celcius)}°C </h1>
            <h2>{data.name}</h2>
          </div>

          <div className='details'>
            <div className='col'>
              <img src={huuu} alt='' className='sun' />
              <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className='col'>
              <img src={winddd} alt='' className='sun' />
              <div className='wind'>
                <p>{Math.round(data.speed)}km/h</p>
                <p>wind</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      
    </>
  );
};

export default Weather;