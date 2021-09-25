import style from "./TimePicker.module.scss";
import cc from "classcat";
import spinner from "../loading.gif";

function TimePicker(props) {
  return (
    <>
      <span
        onClick={props.toggleDrawer}
        className={cc(["bordered", style.timepicker__element])}
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
        <aside className={style.timepicker__drawer}>
          {!props.drawerTimes ? (
            <img
              src={spinner}
              alt="Loading Spinner"
              className="loading__spinner"
            />
          ) : (
            props.drawerTimes.map((time) => {
              return (
                <ul>
                  <li className={style.timepicker__time} key={time._id}>
                    {new Date(time.date).toLocaleString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </li>
                </ul>
              );
            })
          )}
        </aside>
      )}
    </>
  );
}

export default TimePicker;
