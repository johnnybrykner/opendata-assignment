import { useEffect, useState } from "react";
import style from "./App.module.scss";
import SensorColumn from "./components/SensorColumn";
import TimePicker from "./components/TimePicker";

function App() {
  const [currentlyViewedTime, setCurrentlyViewedTime] = useState(null);
  const [currentlyViewedValues, setCurrentlyViewedValues] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTimes, setDrawerTimes] = useState(null);

  useEffect(() => {
    getLatestData();
  }, []);

  useEffect(() => {
    if (drawerOpen && !drawerTimes) getDrawerTimes();
  }, [drawerOpen]);

  async function getLatestData() {
    const rawData = await fetch(process.env.REACT_APP_DB_API_URL + "current");
    const sensorResponse = await rawData.json();
    // handle case without an entry
    if (!sensorResponse) return;
    setCurrentlyViewedTime(sensorResponse.date);
    setCurrentlyViewedValues({
      sensorOne: sensorResponse.sensor1,
      sensorTwo: sensorResponse.sensor2,
      sensorThree: sensorResponse.sensor3,
      sensorFour: sensorResponse.sensor4,
    });
  }

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  async function getDrawerTimes() {
    const rawData = await fetch(process.env.REACT_APP_DB_API_URL + "times");
    const timesResponse = await rawData.json();
    // handle case without an entry
    if (!timesResponse) return;
    setDrawerTimes(timesResponse);
  }

  return (
    <div id="app__wrapper">
      <header>
        <h1 className={style.page__heading}>
          Now displaying snapshot from
          <TimePicker
            time={currentlyViewedTime}
            toggleDrawer={() => toggleDrawer()}
            drawerOpen={drawerOpen}
            drawerTimes={drawerTimes}
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
  );
}

export default App;
