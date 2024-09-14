import classes from "./methodSelector.module.scss";
import { useState } from "react";
import { useRequestContext } from "~/context/RequestContext";
import { defaultMethods } from "lib/constants";

const MethodSelector = () => {
  const {
    rest: { method },
    setRest,
  } = useRequestContext();
  const [isOpened, setIsOpened] = useState(false);
  const [options, setOptions] = useState(defaultMethods);

  return (
    <div className={`${classes.methodBlock} ${isOpened && "focused"}`}>
      <input
        name="method"
        className={classes.methodInput}
        autoComplete="off"
        onFocus={() => setIsOpened(true)}
        onBlur={() => setIsOpened(false)}
        id="method"
        value={method}
        onInput={(e) =>
          setOptions(() => [
            ...defaultMethods,
            (e.target as HTMLInputElement).value.toUpperCase(),
          ])
        }
        onChange={({ target }) =>
          setRest((prev) => ({
            ...prev,
            method: target.value.toUpperCase(),
          }))
        }
      />
      <div
        className={`${classes.methodDropdownList} ${
          isOpened ? null : classes.hidden
        }`}
      >
        {options.map((option) => (
          <button
            key={option}
            className={classes.methodDropdownItem}
            onMouseDown={(e) => {
              e.stopPropagation();
              setRest((prev) => ({ ...prev, method: option }));
            }}
          >
            {option}
          </button>
        ))}
        <hr className={classes.methodDropdownDivider} />
        <div className={classes.methodDropdownSuggestion}>
          Type your own method
        </div>
      </div>
    </div>
  );
};

export default MethodSelector;
