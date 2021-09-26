import { useEffect, useState } from "react";
import style from "./App.module.scss";
import SensorColumn from "./components/SensorColumn";
import TimePicker from "./components/TimePicker";
import spinner from "./loading.gif";
import cat from "./cat.gif";

function App() {
  const [currentlyViewedTime, setCurrentlyViewedTime] = useState(null);
  const [currentlyViewedValues, setCurrentlyViewedValues] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTimes, setDrawerTimes] = useState(null);

  useEffect(() => {
    const getLatestData = async () => {
      const rawData = await fetch(process.env.REACT_APP_DB_API_URL + "current");
      const sensorResponse = await rawData.json();
      // There is no real error handling for when the api should fail...
      if (!sensorResponse) return;
      changeViewedResult(sensorResponse);
    };
    getLatestData();
  }, []);

  useEffect(() => {
    if (drawerOpen && !drawerTimes) getDrawerTimes();
  }, [drawerOpen, drawerTimes]);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  function changeViewedResult(sensorResponse) {
    setCurrentlyViewedTime(sensorResponse.date);
    setCurrentlyViewedValues({
      sensorOne: sensorResponse.sensor1,
      sensorTwo: sensorResponse.sensor2,
      sensorThree: sensorResponse.sensor3,
      sensorFour: sensorResponse.sensor4,
    });
  }

  async function getDrawerTimes() {
    const rawData = await fetch(process.env.REACT_APP_DB_API_URL + "times");
    const timesResponse = await rawData.json();
    // There is no real error handling for when the api should fail...
    if (!timesResponse) return;
    setDrawerTimes(timesResponse);
  }

  async function selectTime(timeSelected) {
    if (timeSelected === currentlyViewedTime) return;
    const rawData = await fetch(
      process.env.REACT_APP_DB_API_URL + "sensor?date=" + timeSelected
    );
    const sensorResponse = await rawData.json();
    // There is no real error handling for when the api should fail...
    if (!sensorResponse) return;
    changeViewedResult(sensorResponse);
  }

  return (
    <>
      {!currentlyViewedTime ? (
        <div className={style.loading__container}>
          <img
            src={spinner}
            alt="Loading Spinner"
            className="loading__spinner"
          />
          <h1 className={style.loading__heading}>
            The Heroku Dyno is booting up, please hold...
          </h1>
          <img
            src={cat}
            alt="Cat hitting the keyboard fast"
            className={style.loading__cat}
          />
        </div>
      ) : (
        <div id="app__wrapper">
          <header className={style.page__header}>
            <h1 className={style.page__heading}>
              Now displaying snapshot from:
              <TimePicker
                time={currentlyViewedTime}
                toggleDrawer={() => toggleDrawer()}
                drawerOpen={drawerOpen}
                drawerTimes={drawerTimes}
                selected={currentlyViewedTime}
                selectTime={(selectedTime) => selectTime(selectedTime)}
              />
            </h1>
          </header>
          <main>
            <section className={style.column__container}>
              {Object.keys(currentlyViewedValues).map((columnKey, index) => {
                return (
                  <SensorColumn
                    key={columnKey}
                    sensorValue={currentlyViewedValues[columnKey]}
                    sensorIndex={index + 1}
                  />
                );
              })}
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
