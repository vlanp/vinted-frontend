import "./filterRange.css";
import { Range, getTrackBackground } from "react-range";
import RangeValues from "../../interfaces/RangeValues";
import { Dispatch, SetStateAction } from "react";

const FilterRange = ({
  values,
  setValues,
  minRange,
  maxRange,
  text,
}: {
  values: RangeValues;
  setValues: Dispatch<SetStateAction<RangeValues | undefined>>;
  minRange: number;
  maxRange: number;
  text: string;
}) => {
  return (
    <div className="filter-range">
      <p>{text}</p>
      <Range
        step={5}
        min={minRange}
        max={maxRange}
        values={[values.minValue, values.maxValue]}
        onChange={(values) =>
          setValues({ minValue: values[0], maxValue: values[1] })
        }
        renderTrack={({ props, children }) => (
          <div
            className="filter-range-track"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "5px",
                background: getTrackBackground({
                  values: [values.minValue, values.maxValue],
                  colors: ["#ccc", "#2baeb7", "#ccc"],
                  min: minRange,
                  max: maxRange,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            className="filter-range-thumb"
            aria-valuemax={props["aria-valuemax"]}
            aria-valuemin={props["aria-valuemin"]}
            aria-valuenow={props["aria-valuenow"]}
            draggable={props.draggable}
            key={props.key}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            ref={props.ref}
            role={props.role}
            style={{
              ...props.style,
            }}
          >
            <div className="thumb-current-value">
              {(index === 0 ? values.minValue : values.maxValue) + "€"}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default FilterRange;
