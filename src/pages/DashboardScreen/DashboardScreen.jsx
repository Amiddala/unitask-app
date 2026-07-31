import { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import ActivityCalendarStrip from '../../components/Dashboard/ActivityCalendarStrip';
import ActivityAlertBanner from '../../components/Dashboard/ActivityAlertBanner';
import UpcomingTaskCard from '../../components/Dashboard/UpcomingTaskCard';
import UpcomingExamCard from '../../components/Dashboard/UpcomingExamCard';
import FloatingActionButton from '../../components/shared/FloatingActionButton';
import { useApp } from '../../context/AppContext';
import './DashboardScreen.css';

const SETTINGS_KEY = 'unitask_settings';
const DISMISS_KEY = 'unitask_alert_dismissed';

function readStoredSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { notificaciones: true };
    return JSON.parse(raw);
  } catch {
    return { notificaciones: true };
  }
}

function readDismissedActivities() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeDismissedActivity(id) {
  const current = readDismissedActivities();
  const next = {
    ...current,
    [id]: Date.now() + 15 * 60 * 1000,
  };
  localStorage.setItem(DISMISS_KEY, JSON.stringify(next));
}

function sortByDate(items) {
  return [...items].sort((a, b) => new Date(a.fechaLimite) - new Date(b.fechaLimite));
}

function DashboardScreen() {
  const { tasks, exams, calendarEvents } = useApp();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const upcomingTasks = sortByDate(tasks).slice(0, 4);
  const upcomingExams = sortByDate(exams).slice(0, 3);

  const criticalActivities = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const isCriticalDate = (fechaLimite) => {
      const date = new Date(fechaLimite);
      return date <= tomorrow;
    };

    const taskActivities = tasks
      .filter((task) => isCriticalDate(task.fechaLimite))
      .map((task) => ({
        ...task,
        type: task.tipo === 'grupal' ? 'grupal' : 'personal',
        title: task.titulo,
      }));

    const examActivities = exams
      .filter((exam) => isCriticalDate(exam.fechaLimite))
      .map((exam) => ({
        ...exam,
        type: 'examen',
        title: exam.titulo,
      }));

    return [...taskActivities, ...examActivities].sort(
      (a, b) => new Date(a.fechaLimite) - new Date(b.fechaLimite),
    );
  }, [tasks, exams]);

  useEffect(() => {
    const settings = readStoredSettings();
    setNotificationsEnabled(Boolean(settings.notificaciones));
  }, []);

  useEffect(() => {
    const stored = readDismissedActivities();
    const now = Date.now();

    const visible = criticalActivities.filter((activity) => {
      const expiry = stored[activity.id];
      return !expiry || expiry <= now;
    });

    setVisibleActivities(visible);
  }, [criticalActivities]);

  const dismissActivity = (id) => {
    writeDismissedActivity(id);
    setVisibleActivities((currentActivities) =>
      currentActivities.filter((activity) => activity.id !== id),
    );
  };

  return (
    <DashboardLayout>
      {notificationsEnabled && visibleActivities.length > 0 && (
        <ActivityAlertBanner
          criticalActivities={visibleActivities}
          onDismissItem={dismissActivity}
        />
      )}

      <section className="dashboard-screen__calendar-section">
        <h2 className="dashboard-screen__calendar-title">Calendario de actividades</h2>
        <ActivityCalendarStrip
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          calendarEvents={calendarEvents}
        />
        <div className="calendar-strip__legend" aria-label="Leyenda del calendario de actividades">
          <span className="calendar-strip__legend-item">
            <span className="calendar-strip__legend-dot" style={{ background: 'var(--color-personal)' }} />
            Examen
          </span>
          <span className="calendar-strip__legend-item">
            <span className="calendar-strip__legend-dot" style={{ background: 'var(--color-exam)' }} />
            Personal
          </span>
          <span className="calendar-strip__legend-item">
            <span className="calendar-strip__legend-dot" style={{ background: 'var(--color-group)' }} />
            Grupal
          </span>
        </div>
      </section>

      <section className="dashboard-screen__section">
        <h2 className="dashboard-screen__heading">Tareas próximas</h2>
        {upcomingTasks.length === 0 ? (
          <p className="dashboard-screen__empty">No tienes tareas pendientes por ahora.</p>
        ) : (
          <div className="dashboard-screen__list">
            {upcomingTasks.map((task) => (
              <UpcomingTaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-screen__section">
        <h2 className="dashboard-screen__heading">Exámenes próximos</h2>
        {upcomingExams.length === 0 ? (
          <p className="dashboard-screen__empty">No tienes exámenes registrados.</p>
        ) : (
          <div className="dashboard-screen__list">
            {upcomingExams.map((exam) => (
              <UpcomingExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        )}
      </section>

      <FloatingActionButton />
    </DashboardLayout>
  );
}

export default DashboardScreen;