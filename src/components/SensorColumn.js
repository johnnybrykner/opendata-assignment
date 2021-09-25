import style from "./SensorColumn.module.scss";
import cc from "classcat";

function SensorColumn(props) {
  return (
    <section className={style.sensor__container}>
      <h2 className={style.sensor__header}>
        Sensor {props.sensorIndex}:{" "}
        <em>
          {props.sensorValue
            ? "reported " + props.sensorValue
            : "reported no value"}
        </em>
      </h2>
      <figure
        className={cc([
          "bordered",
          props.sensorValue
            ? style.sensor__column
            : style["sensor__column--empty"],
        ])}
        style={{ height: props.sensorValue + "px" }}
      ></figure>
    </section>
  );
}

export default SensorColumn;
