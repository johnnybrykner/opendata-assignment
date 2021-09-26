import style from "./TimePicker.module.scss";
import cc from "classcat";
import spinner from "../loading.gif";

function TimePicker(props) {
  return (
    <>
      <span
        onClick={props.toggleDrawer}
        className={cc([
          style.timepicker__element,
          props.drawerOpen && style["timepicker__element--open"],
        ])}
      >
        {new Date(props.time).toLocaleString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </span>
      {props.drawerOpen && (
        <aside className={cc([style.timepicker__drawer])}>
          {!props.drawerTimes ? (
            <img
              src={spinner}
              alt="Loading Spinner"
              className="loading__spinner"
            />
          ) : (
            <ul>
              {props.drawerTimes.map((entry) => {
                return (
                  <li
                    className={cc([
                      style.timepicker__time,
                      props.selected === entry.date &&
                        style["timepicker__time--selected"],
                    ])}
                    key={entry._id}
                    onClick={() => props.selectTime(entry.date)}
                  >
                    {new Date(entry.date).toLocaleString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      )}
    </>
  );
}

export default TimePicker;
