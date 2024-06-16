import { Range } from "react-range";
import RangeValues from "../../interfaces/RangeValues";
import { Dispatch, SetStateAction } from "react";

const FilterRange = ({
  values,
  setValues,
  minRange,
  maxRange,
}: {
  values: RangeValues;
  setValues: Dispatch<SetStateAction<RangeValues | undefined>>;
  minRange: number;
  maxRange: number;
}) => {
  return (
    <Range
      step={0.1}
      min={minRange}
      max={maxRange}
      values={[values.minValue, values.maxValue]}
      onChange={(values) =>
        setValues({ minValue: values[0], maxValue: values[1] })
      }
      renderTrack={({ props, children }) => (
        <div className="filter-range-track" {...props}>
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          className="filter-range-thumb"
          {...props}
          style={{
            ...props.style,
          }}
        />
      )}
    />
  );
};

export default FilterRange;
