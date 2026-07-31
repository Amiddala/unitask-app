import './ActivityCalendarStrip.css';

const DOT_COLOR = {
  examen: 'var(--color-personal)',
  personal: 'var(--color-exam)',
  grupal: 'var(--color-group)',
};

const WEEKDAY_LABELS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

function buildDays(count = 14) {
  const days = [];
  const start = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function toKey(date) {
  return date.toISOString().slice(0, 10);
}

function ActivityCalendarStrip({ selectedDay, onSelectDay, calendarEvents }) {
  const days = buildDays();

  return (
    <div className="calendar-strip">
      {days.map((day) => {
        const key = toKey(day);
        const events = calendarEvents[key] || [];
        const isSelected = toKey(selectedDay) === key;

        return (
          <button
            key={key}
            type="button"
            className={`calendar-strip__day ${isSelected ? 'calendar-strip__day--selected' : ''}`}
            onClick={() => onSelectDay(day)}
          >
            <span className="calendar-strip__weekday">{WEEKDAY_LABELS[day.getDay()]}</span>
            <span className="calendar-strip__number">{day.getDate()}</span>
            <span className="calendar-strip__dots">
              {events.map((type) => (
                <span
                  key={type}
                  className="calendar-strip__dot"
                  style={{ background: DOT_COLOR[type] }}
                />
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ActivityCalendarStrip;