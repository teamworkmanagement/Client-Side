import React, { useState } from "react";
import "./ProgressSlider.scss";
import { Range, getTrackBackground } from "react-range";
import { updateTask } from "src/appSlice";
import { useDispatch, useSelector } from "react-redux";

function ProgressSlider(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.value);
  const [renderedValue, setRenderedValue] = useState([props.value]);
  const [task, setTask] = useState(props.task);

  function getColorFromValue() {
    if (renderedValue < 26) {
      return "#E55353";
    }
    if (renderedValue < 51) {
      return "#F9B116";
    }
    if (renderedValue < 76) {
      return "#3499FF";
    }
    return "#2FB85D";
  }

  function handleUpdateTask(value) {
    const newTask = {
      ...task,
      taskCompletedPercent: value,
    };

    setTask(newTask);
    dispatch(updateTask(newTask));
  }

  return (
    <div className="slider-container">
      <Range
        className="range"
        values={renderedValue}
        step={1}
        min={0}
        max={100}
        onChange={(values) => setRenderedValue(values)}
        onFinalChange={(values) => {
          setValue(values[0]);
          handleUpdateTask(values[0]);
        }}
        renderTrack={({ props, children }) => (
          <div
            //onMouseDown={props.onMouseDown}
            //onTouchStart={props.onTouchStart}
            className="track-container"
            style={{
              ...props.style,
            }}
          >
            <div
              className="track-bar"
              ref={props.ref}
              style={{
                background: getTrackBackground({
                  values: renderedValue,
                  colors: [getColorFromValue(), "#EAECF0"],
                  min: 0,
                  max: 100,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            className="thumb"
            {...props}
            style={{
              ...props.style,
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? getColorFromValue() : "#CCC",
              }}
            />
            <div
              style={{ backgroundColor: getColorFromValue() }}
              className="value"
            >
              {renderedValue}
            </div>
          </div>
        )}
      />
      <div className="result">{value}%</div>
    </div>
  );
}

export default ProgressSlider;
