import { useEffect, useRef, useState } from "react";

export default function LocationDropdown({
  id,
  label,
  value,
  options,
  placeholder,
  disabled,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="field-wrap">
      <label>{label}</label>
      <div
        id={id}
        ref={ref}
        className={`select-box ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setOpen((current) => !current)}
        role="combobox"
        aria-expanded={open}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={value ? "selected" : "placeholder"}>
          {value || placeholder}
        </span>
        <span className="chevron">⌄</span>
        {open && (
          <ul className="select-menu">
            {options.length ? (
              options.map((option) => (
                <li
                  key={option}
                  onClick={(event) => {
                    event.stopPropagation();
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="empty-option">No options available</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
