import style from "./TimePicker.module.scss";

function TimePicker(props) {
  return <span className={style.timepicker__element}>{props.time}</span>;
}

export default TimePicker;
