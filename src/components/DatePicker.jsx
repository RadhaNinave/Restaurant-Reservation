import { addDays, format, startOfToday } from "date-fns";

export default function DatePicker({ value, onChange }) {
  const today = startOfToday();
  const dates = Array.from({ length: 7 }, (_, index) => addDays(today, index));
  console.log("value", value);
  return (
    <div className="date-strip">
      {dates.map((date) => {
        const iso = date.toISOString();
        const active = value.slice(0, 10) === iso.slice(0, 10);
        return (
          <button
            key={iso}
            className={`date-card ${active ? "active" : ""}`}
            onClick={() => onChange(iso)}
          >
            <p>{indexLabel(date, today)}</p>
            <strong>{format(date, "dd")}</strong>
            <span>{format(date, "EEE")}</span>
          </button>
        );
      })}
    </div>
  );
}
function indexLabel(date, today) {
  const diff = Math.round((date - today) / 86400000);
  return diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : formatDateLabel(date);
}
function formatDateLabel(date) {
  return format(date, "MMM");
}
