import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState({});
  const [city, setCity] = useState("");

  const searchCurrentWeather = async () => {
    await fetch(`/api/getCurrentWeather?city=${city}`)
      .then((res) => res.json())
      .then((result) => setCurrentWeather(result.body.data.data[0]));
  };

  const searchForecastWeather = async () => {
    await fetch(`/api/getForecastWeather?city=${city}`)
      .then((res) => res.json())
      .then((result) => setForecastWeather(result.body.data.data));
  };

  const search = async (e) => {
    e.preventDefault();
    await searchCurrentWeather();
    await searchForecastWeather();
  };

  return (
    <div
      className={
        new Date().getHours() > 6 && new Date().getHours() < 18
          ? styles.container
          : styles.containerNight
      }
    >
      <Head>
        <title>Weather App</title>
        <meta
          name="description"
          content="A weather app for locations in Australia"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {forecastWeather.length == undefined ? (
        <main className={styles.main}>
          <div className={styles.headingContainer}>
            <h1 className={styles.heading}>Weather for</h1>
            <span className={styles.city}></span>
          </div>
          <p>Enter a city, and see the weather there.</p>
          <form className={styles.searchForm} onSubmit={search}>
            <input
              className={styles.searchInput}
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </form>
        </main>
      ) : (
        <div className={styles.weatherInfo}>
          <div className={styles.newSearchForm}>
            <form onSubmit={search}>
              <input
                className={styles.searchInput}
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </form>
          </div>
          <div className={styles.weatherInfoHeader}>
            <h1>Weather for {currentWeather.city_name}</h1>
          </div>
          <div className={styles.temp}>
            <p>{currentWeather.temp}º</p>
          </div>
          <div className={styles.appTemp}>
            <p>Feels like {currentWeather.app_temp}º</p>
          </div>
          <div className={styles.maxTemp}>
            <p>Max</p>
            <p className={styles.maxTempNumber}>
              {forecastWeather[0].max_temp}º
            </p>
          </div>
          <div className={styles.minTemp}>
            <p>Overnight min</p>
            <p className={styles.minTempNumber}>
              {forecastWeather[0].min_temp}º
            </p>
          </div>
          <div className={styles.weatherIcon}>
            <Image
              src={require(`../icons/${currentWeather.weather.icon}.png`)}
              alt=""
              width={120}
              height={120}
              layout="fixed"
            />
          </div>

          <div className={styles.weatherDescription}>
            <p>{currentWeather.weather.description}.</p>
          </div>

          <div className={styles.rainChance}>
            <p>{forecastWeather[0].pop}% chance of rain today.</p>
          </div>
          <div className={styles.wind}>
            <p>Wind</p>
            <p>
              {currentWeather.wind_cdir}{" "}
              {Math.round(currentWeather.wind_spd * 3.6 * 10) / 10} km/h
            </p>
          </div>
          <div className={styles.sunrise}>
            <p>Sunrise</p>
            <p>
              {new Date(
                forecastWeather[0].sunrise_ts * 1000
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <div className={styles.sunset}>
            <p>Sunset</p>
            <p>
              {new Date(forecastWeather[0].sunset_ts * 1000).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>
          <div className={styles.line}></div>
          <div
            className={
              new Date().getHours > 6 && new Date().getHours < 18
                ? styles.weatherForecast
                : styles.weatherForecastNight
            }
          >
            <div className={styles.forecastItem}>
              <p>Tomorrow</p>
              <span className={styles.forecastItemDescription}>
                {forecastWeather[1].weather.description}.
              </span>
              <span className={styles.forecastItemMaxTemp}>
                {Math.round(forecastWeather[1].max_temp)}º
              </span>
              <span className={styles.forecastItemMinTemp}>
                {Math.round(forecastWeather[1].min_temp)}º
              </span>
              <div className={styles.forecastItemRainChance}>
                <span>Chance of rain</span>
                <span className={styles.forecastItemRainChance}>
                  {forecastWeather[1].pop}%
                </span>
              </div>
            </div>
            <div className={styles.forecastItem}>
              <p>Wednesday</p>
              <span className={styles.forecastItemDescription}>
                {forecastWeather[2].weather.description}.
              </span>
              <span className={styles.forecastItemMaxTemp}>
                {Math.round(forecastWeather[2].max_temp)}º
              </span>
              <span className={styles.forecastItemMinTemp}>
                {Math.round(forecastWeather[2].min_temp)}º
              </span>
              <div className={styles.forecastItemRainChance}>
                <span>Chance of rain</span>
                <span className={styles.forecastItemRainChance}>
                  {forecastWeather[2].pop}%
                </span>
              </div>
            </div>
            <div className={styles.forecastItem}>
              <p>Thursday</p>
              <span className={styles.forecastItemDescription}>
                {forecastWeather[3].weather.description}.
              </span>
              <span className={styles.forecastItemMaxTemp}>
                {Math.round(forecastWeather[3].max_temp)}º
              </span>
              <span className={styles.forecastItemMinTemp}>
                {Math.round(forecastWeather[3].min_temp)}º
              </span>
              <div className={styles.forecastItemRainChance}>
                <span>Chance of rain</span>
                <span className={styles.forecastItemRainChance}>
                  {forecastWeather[3].pop}%
                </span>
              </div>
            </div>
            <div className={styles.forecastItem}>
              <p>Friday</p>
              <span className={styles.forecastItemDescription}>
                {forecastWeather[3].weather.description}.
              </span>
              <span className={styles.forecastItemMaxTemp}>
                {Math.round(forecastWeather[3].max_temp)}º
              </span>
              <span className={styles.forecastItemMinTemp}>
                {Math.round(forecastWeather[3].min_temp)}º
              </span>
              <div className={styles.forecastItemRainChance}>
                <span>Chance of rain</span>
                <span className={styles.forecastItemRainChance}>
                  {forecastWeather[3].pop}%
                </span>
              </div>
            </div>
            <div className={styles.forecastItem}>
              <p>Saturday</p>
              <span className={styles.forecastItemDescription}>
                {forecastWeather[4].weather.description}.
              </span>
              <span className={styles.forecastItemMaxTemp}>
                {Math.round(forecastWeather[4].max_temp)}º
              </span>
              <span className={styles.forecastItemMinTemp}>
                {Math.round(forecastWeather[4].min_temp)}º
              </span>
              <div className={styles.forecastItemRainChance}>
                <span>Chance of rain</span>
                <span className={styles.forecastItemRainChance}>
                  {forecastWeather[4].pop}%
                </span>
              </div>
            </div>
            <div className={styles.forecastItem}>
              <p>Sunday</p>
              <span className={styles.forecastItemDescription}>
                {forecastWeather[5].weather.description}.
              </span>
              <span className={styles.forecastItemMaxTemp}>
                {Math.round(forecastWeather[5].max_temp)}º
              </span>
              <span className={styles.forecastItemMinTemp}>
                {Math.round(forecastWeather[5].min_temp)}º
              </span>
              <div className={styles.forecastItemRainChance}>
                <span>Chance of rain</span>
                <span className={styles.forecastItemRainChance}>
                  {forecastWeather[5].pop}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
