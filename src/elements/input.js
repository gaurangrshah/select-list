import React from "react";

export default function Input({
  id,
  classes,
  styles,
  placeholder,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  value
}) {
  return (
    <input
      id={id}
      className={`${classes}`}
      style={styles}
      placeholder={placeholder ? placeholder : null}
      defaultValue={defaultValue ? defaultValue : null}
      onChange={onChange ? onChange : null}
      onFocus={onFocus ? onFocus : null}
      onBlur={onBlur ? onBlur : null}
      tabIndex={1}
    />
  );
}
