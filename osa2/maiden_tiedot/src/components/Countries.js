//import React, { useState, useEffect } from 'react';
//import axios from 'axios'
import React from 'react'

const Language = ({country}) => {
    return (
        <div>
            <h2>Spoken languages</h2>
            <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
        </div>
    )
}

const DetailView = ({country}) => {
/*
    const [ weather, setWeather ] = useState('')
    const requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    const hook = () => {
    axios
        .get(requestUrl)
        .then(response => {
            console.log(response.data)
        setWeather(response.data)
        })
    }
    useEffect(hook, [])
    console.log(weather)
    console.log(weather.main)
    var tempData = JSON.parse(weather);
    console.log(tempData)
    */
    return (
        <div>
            <h1 key={country.name}>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <Language country={country}/>
            <img src={country.flag} width="100" height="100" alt=""/>
            <h2>Weather in {country.capital}</h2>
        </div>
    )
}
/*
            <h3>Temperature: {weather.main.temp} Celsius</h3>
            <h3>Description: {weather.weather.map(description => <div key={description.description}>{description.description}</div>)}</h3>
*/
const Countries = ({countriesToShow}) => {
    const handleClick = (country) => {
        return (
            <DetailView country={country}/>
        )  
    }
    let elements = <div>Too many matches, specify another filter</div>
    if (countriesToShow.length === 1) {
        elements = countriesToShow.map(country => 
            <DetailView key={country.name} country={country}/>)
    }
    else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
        elements = countriesToShow.map(country => 
            <div key={country.name}>
                {country.name}
                <button onClick={() => handleClick({country})}>show</button>
            </div>)
    }
    return elements
}

export default Countries