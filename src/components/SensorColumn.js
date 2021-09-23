import style from "./SensorColumn.module.scss";

function SensorColumn(props) {
  return (
    <figure
      className={style.sensor__column}
      style={{ height: props.sensorValue + "px" }}
    ></figure>
  );
}

export default SensorColumn;
