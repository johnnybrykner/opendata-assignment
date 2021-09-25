import style from "./TimePicker.module.scss";
import cc from "classcat";

function TimePicker(props) {
  return (
    <span className={cc(["bordered", style.timepicker__element])}>
      {props.time}
    </span>
  );
}

export default TimePicker;
