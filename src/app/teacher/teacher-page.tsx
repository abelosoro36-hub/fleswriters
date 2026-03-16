"use client";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  type: string;
  prompt: string;
  minWords: number;
  maxWords: number;
  dueDate: string;
  points: number;
  status: "active" | "draft" | "closed";
  submissions: number;
  total: number;
};

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "The Impact of Social Media on Youth",
    type: "Essay",
    prompt: "Discuss both positive and negative effects of social media on teenagers with at least two credible sources.",
    minWords: 600,
    maxWords: 900,
    dueDate: "2025-03-07",
    points: 100,
    status: "active",
    submissions: 18,
    total: 24,
  },
  {
    id: 2,
    title: "A Night the Town Stood Still",
    type: "Story",
    prompt: "Write a short story set in your hometown during an unusual event. Focus on vivid sensory details.",
    minWords: 400,
    maxWords: 700,
    dueDate: "2025-03-14",
    points: 80,
    status: "active",
    submissions: 9,
    total: 24,
  },
  {
    id: 3,
    title: "Book Review: The Alchemist",
    type: "Review",
    prompt: "Write a critical review addressing theme, writing style, and personal impact.",
    minWords: 500,
    maxWords: 800,
    dueDate: "2025-02-28",
    points: 90,
    status: "closed",
    submissions: 24,
    total: 24,
  },
  {
    id: 4,
    title: "Climate Change Argumentative Piece",
    type: "Essay",
    prompt: "Argue for or against immediate governmental action on climate change.",
    minWords: 700,
    maxWords: 1000,
    dueDate: "2025-03-21",
    points: 100,
    status: "draft",
    submissions: 0,
    total: 24,
  },
];

const TASK_TYPES = ["Essay", "Story", "Report", "Review", "Letter", "Speech", "Poem"];
const STATUS_COLORS: Record<string, string> = {
  active: "#9ecfb8",
  draft: "#e8c87d",
  closed: "#f4a97f",
};

const emptyForm = {
  title: "",
  type: "Essay",
  prompt: "",
  minWords: 400,
  maxWords: 800,
  dueDate: "",
  points: 100,
  status: "draft" as "active" | "draft" | "closed",
};

export default function TeacherDashboard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [view, setView] = useState<"board" | "create" | "edit">("board");
  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft" | "closed">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "rubric">("details");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handleCreate = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setView("create");
    setActiveTab("details");
  };

  const handleEdit = (task: Task) => {
    setForm({
      title: task.title,
      type: task.type,
      prompt: task.prompt,
      minWords: task.minWords,
      maxWords: task.maxWords,
      dueDate: task.dueDate,
      points: task.points,
      status: task.status,
    });
    setEditId(task.id);
    setView("edit");
    setActiveTab("details");
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.prompt.trim() || !form.dueDate) {
      showToast("⚠️ Please fill in all required fields.");
      return;
    }
    if (view === "edit" && editId !== null) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, ...form } : t))
      );
      showToast("✦ Task updated successfully!");
    } else {
      const newTask: Task = {
        id: Date.now(),
        ...form,
        submissions: 0,
        total: 24,
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast("✦ Task created successfully!");
    }
    setView("board");
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
    showToast("🗑 Task deleted.");
  };

  const handlePublish = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "active" } : t))
    );
    showToast("🚀 Task published to students!");
  };

  const filtered = filterStatus === "all" ? tasks : tasks.filter((t) => t.status === filterStatus);
  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => t.status === "active").length,
    drafts: tasks.filter((t) => t.status === "draft").length,
    submissions: tasks.reduce((a, t) => a + t.submissions, 0),
  };

  return (
    <div className="td-root">
      {/* SIDEBAR */}
      <aside className="td-sidebar">
        <div className="td-sidebar__logo">
          <span className="td-logo-mark">✦</span>
          <span>ScriptMaster</span>
        </div>
        <nav className="td-sidebar__nav">
          <a className="td-nav-item td-nav-item--active" href="#">
            <span>📋</span> Tasks
          </a>
          <a className="td-nav-item" href="#">
            <span>👥</span> Students
          </a>
          <a className="td-nav-item" href="#">
            <span>📊</span> Analytics
          </a>
          <a className="td-nav-item" href="#">
            <span>💬</span> Feedback
          </a>
          <a className="td-nav-item" href="#">
            <span>⚙️</span> Settings
          </a>
        </nav>
        <div className="td-sidebar__profile">
          <div className="td-avatar">T</div>
          <div>
            <strong>Teacher</strong>
            <span>Writing Instructor</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="td-main">

        {/* TOAST */}
        {toast && <div className="td-toast">{toast}</div>}

        {/* DELETE CONFIRM MODAL */}
        {deleteConfirm && (
          <div className="td-overlay">
            <div className="td-modal">
              <div className="td-modal__icon">🗑</div>
              <h3>Delete this task?</h3>
              <p>This action cannot be undone. All submission data will be lost.</p>
              <div className="td-modal__actions">
                <button className="td-btn td-btn--ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="td-btn td-btn--danger" onClick={() => handleDelete(deleteConfirm)}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* ── BOARD VIEW ── */}
        {view === "board" && (
          <>
            <div className="td-header">
              <div>
                <h1 className="td-page-title">Task Board</h1>
                <p className="td-page-sub">Create, manage, and publish writing tasks to your students</p>
              </div>
              <button className="td-btn td-btn--gold" onClick={handleCreate}>
                + Create New Task
              </button>
            </div>

            {/* STATS */}
            <div className="td-stats">
              {[
                { label: "Total Tasks", value: stats.total, icon: "📋", color: "#e8c87d" },
                { label: "Active", value: stats.active, icon: "🟢", color: "#9ecfb8" },
                { label: "Drafts", value: stats.drafts, icon: "✏️", color: "#b8a9e8" },
                { label: "Submissions", value: stats.submissions, icon: "📥", color: "#f4a97f" },
              ].map((s, i) => (
                <div className="td-stat-card" key={i} style={{ "--sc": s.color } as React.CSSProperties}>
                  <div className="td-stat-card__icon">{s.icon}</div>
                  <div className="td-stat-card__val">{s.value}</div>
                  <div className="td-stat-card__label">{s.label}</div>
                  <div className="td-stat-card__bar" />
                </div>
              ))}
            </div>

            {/* FILTERS */}
            <div className="td-filters">
              {(["all", "active", "draft", "closed"] as const).map((f) => (
                <button
                  key={f}
                  className={`td-filter-btn ${filterStatus === f ? "active" : ""}`}
                  onClick={() => setFilterStatus(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  <span className="td-filter-count">
                    {f === "all" ? tasks.length : tasks.filter((t) => t.status === f).length}
                  </span>
                </button>
              ))}
            </div>

            {/* TASK LIST */}
            <div className="td-task-list">
              {filtered.length === 0 && (
                <div className="td-empty">
                  <span>📭</span>
                  <p>No tasks here yet. <button onClick={handleCreate}>Create one →</button></p>
                </div>
              )}
              {filtered.map((task) => (
                <div className="td-task-row" key={task.id}>
                  <div className="td-task-row__left">
                    <div
                      className="td-task-row__status-dot"
                      style={{ background: STATUS_COLORS[task.status] }}
                      title={task.status}
                    />
                    <div>
                      <div className="td-task-row__title">{task.title}</div>
                      <div className="td-task-row__meta">
                        <span className="td-tag">{task.type}</span>
                        <span>📅 Due {new Date(task.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span>📝 {task.minWords}–{task.maxWords} words</span>
                        <span>⭐ {task.points} pts</span>
                      </div>
                      <div className="td-task-row__prompt">{task.prompt.slice(0, 90)}…</div>
                    </div>
                  </div>
                  <div className="td-task-row__right">
                    {/* Submission progress */}
                    <div className="td-progress-block">
                      <div className="td-progress-label">
                        <span>{task.submissions}/{task.total} submitted</span>
                        <span>{Math.round((task.submissions / task.total) * 100)}%</span>
                      </div>
                      <div className="td-progress-bar">
                        <div
                          className="td-progress-fill"
                          style={{
                            width: `${(task.submissions / task.total) * 100}%`,
                            background: STATUS_COLORS[task.status],
                          }}
                        />
                      </div>
                    </div>
                    <span
                      className="td-status-badge"
                      style={{
                        background: `${STATUS_COLORS[task.status]}18`,
                        color: STATUS_COLORS[task.status],
                        borderColor: `${STATUS_COLORS[task.status]}40`,
                      }}
                    >
                      {task.status}
                    </span>
                    <div className="td-task-row__actions">
                      {task.status === "draft" && (
                        <button className="td-btn td-btn--publish" onClick={() => handlePublish(task.id)}>
                          🚀 Publish
                        </button>
                      )}
                      <button className="td-btn td-btn--icon" title="Edit" onClick={() => handleEdit(task)}>✏️</button>
                      <button className="td-btn td-btn--icon td-btn--del" title="Delete" onClick={() => setDeleteConfirm(task.id)}>🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── CREATE / EDIT VIEW ── */}
        {(view === "create" || view === "edit") && (
          <>
            <div className="td-header">
              <div>
                <button className="td-back-btn" onClick={() => setView("board")}>← Back to Board</button>
                <h1 className="td-page-title">{view === "create" ? "Create New Task" : "Edit Task"}</h1>
                <p className="td-page-sub">{view === "create" ? "Fill in the details below and publish to your students" : "Update the task details below"}</p>
              </div>
              <div className="td-header__actions">
                <button
                  className="td-btn td-btn--ghost"
                  onClick={() => { setForm((f) => ({ ...f, status: "draft" })); setTimeout(handleSave, 0); }}
                >
                  Save as Draft
                </button>
                <button className="td-btn td-btn--gold" onClick={handleSave}>
                  {form.status === "draft" ? "Save Draft" : "Save & Publish"}
                </button>
              </div>
            </div>

            {/* TABS */}
            <div className="td-tabs">
              <button className={`td-tab ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>Task Details</button>
              <button className={`td-tab ${activeTab === "rubric" ? "active" : ""}`} onClick={() => setActiveTab("rubric")}>Rubric & Scoring</button>
            </div>

            {activeTab === "details" && (
              <div className="td-form">
                {/* Title */}
                <div className="td-form-group td-form-group--full">
                  <label>Task Title <span className="td-req">*</span></label>
                  <input
                    className="td-input"
                    placeholder="e.g. The Impact of Social Media on Youth"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  />
                </div>

                {/* Type + Status */}
                <div className="td-form-row">
                  <div className="td-form-group">
                    <label>Task Type <span className="td-req">*</span></label>
                    <select
                      className="td-input"
                      value={form.type}
                      onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    >
                      {TASK_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="td-form-group">
                    <label>Status</label>
                    <select
                      className="td-input"
                      value={form.status}
                      onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Task["status"] }))}
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active (Publish Now)</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="td-form-group">
                    <label>Due Date <span className="td-req">*</span></label>
                    <input
                      type="date"
                      className="td-input"
                      value={form.dueDate}
                      onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Prompt */}
                <div className="td-form-group td-form-group--full">
                  <label>Writing Prompt <span className="td-req">*</span></label>
                  <textarea
                    className="td-input td-textarea"
                    rows={5}
                    placeholder="Describe the task clearly. Include any specific requirements, sources to consult, or structure to follow..."
                    value={form.prompt}
                    onChange={(e) => setForm((f) => ({ ...f, prompt: e.target.value }))}
                  />
                  <span className="td-char-count">{form.prompt.length} characters</span>
                </div>

                {/* Word count + Points */}
                <div className="td-form-row">
                  <div className="td-form-group">
                    <label>Minimum Words</label>
                    <input
                      type="number"
                      className="td-input"
                      value={form.minWords}
                      onChange={(e) => setForm((f) => ({ ...f, minWords: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="td-form-group">
                    <label>Maximum Words</label>
                    <input
                      type="number"
                      className="td-input"
                      value={form.maxWords}
                      onChange={(e) => setForm((f) => ({ ...f, maxWords: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="td-form-group">
                    <label>Total Points</label>
                    <input
                      type="number"
                      className="td-input"
                      value={form.points}
                      onChange={(e) => setForm((f) => ({ ...f, points: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                {/* Live preview */}
                <div className="td-preview">
                  <div className="td-preview__label">✦ Live Preview — Student View</div>
                  <div className="td-preview__card">
                    <div className="td-preview__type">{form.type} Task</div>
                    <h3 className="td-preview__title">{form.title || "Your task title will appear here"}</h3>
                    <div className="td-preview__meta">
                      {form.dueDate && <span>📅 Due {new Date(form.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
                      <span>📝 {form.minWords}–{form.maxWords} words</span>
                      <span>⭐ {form.points} pts</span>
                    </div>
                    <div className="td-preview__prompt">
                      <strong>Prompt:</strong>{" "}
                      {form.prompt || "Your prompt will appear here once you start typing…"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rubric" && (
              <div className="td-form">
                <div className="td-rubric-info">
                  <span>📐</span>
                  <p>Set the grading criteria for this task. Students will see these categories when they submit.</p>
                </div>
                <div className="td-rubric-grid">
                  {[
                    { name: "Structure & Organisation", pts: Math.round(form.points * 0.25), desc: "Clear intro, body paragraphs, and conclusion" },
                    { name: "Argument & Content", pts: Math.round(form.points * 0.30), desc: "Strength and clarity of ideas and evidence" },
                    { name: "Language & Style", pts: Math.round(form.points * 0.25), desc: "Vocabulary, sentence variety, tone" },
                    { name: "Grammar & Mechanics", pts: Math.round(form.points * 0.20), desc: "Spelling, punctuation, grammar accuracy" },
                  ].map((r, i) => (
                    <div className="td-rubric-item" key={i}>
                      <div className="td-rubric-item__header">
                        <span className="td-rubric-item__name">{r.name}</span>
                        <span className="td-rubric-item__pts">{r.pts} pts</span>
                      </div>
                      <p className="td-rubric-item__desc">{r.desc}</p>
                      <div className="td-rubric-item__bar">
                        <div className="td-rubric-item__fill" style={{ width: `${(r.pts / form.points) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="td-rubric-note">Rubric weights are auto-calculated based on total points ({form.points} pts). Custom rubric editing coming soon.</p>
              </div>
            )}
          </>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .td-root {
          display: flex; min-height: 100vh;
          background: #071524;
          font-family: 'DM Sans', sans-serif;
          color: #d8e4ec;
        }

        /* ── SIDEBAR ── */
        .td-sidebar {
          width: 230px; flex-shrink: 0;
          background: #0a1e2e;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
          padding: 0 0 1.5rem;
          position: sticky; top: 0; height: 100vh;
        }
        .td-sidebar__logo {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 1.5rem 1.5rem 2rem;
          font-family: 'Lora', serif;
          font-size: 1.15rem; font-weight: 700; color: #e8c87d;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .td-logo-mark { font-size: 0.9rem; }
        .td-sidebar__nav {
          display: flex; flex-direction: column; gap: 0.2rem;
          padding: 1.5rem 0.75rem; flex: 1;
        }
        .td-nav-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.65rem 0.9rem; border-radius: 8px;
          font-size: 0.9rem; color: #6a8a9e;
          text-decoration: none; transition: all 0.15s;
        }
        .td-nav-item:hover { background: rgba(255,255,255,0.05); color: #d8e4ec; }
        .td-nav-item--active { background: rgba(232,200,125,0.12); color: #e8c87d; font-weight: 500; }
        .td-sidebar__profile {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0 0.5rem;
        }
        .td-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: #e8c87d; color: #1a0e05;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.95rem; flex-shrink: 0;
        }
        .td-sidebar__profile strong { display: block; font-size: 0.88rem; color: #d8e4ec; }
        .td-sidebar__profile span { font-size: 0.76rem; color: #4a6a7e; }

        /* ── MAIN ── */
        .td-main {
          flex: 1; padding: 2.5rem 3rem;
          overflow-y: auto; position: relative;
        }

        /* ── TOAST ── */
        .td-toast {
          position: fixed; top: 1.5rem; right: 2rem; z-index: 999;
          background: #0d2235; border: 1px solid rgba(232,200,125,0.4);
          color: #e8c87d; padding: 0.75rem 1.4rem;
          border-radius: 10px; font-size: 0.88rem; font-weight: 500;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          animation: toastIn 0.25s ease, toastOut 0.25s ease 2.5s forwards;
        }
        @keyframes toastIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes toastOut { to { opacity:0; transform:translateY(-10px); } }

        /* ── MODAL ── */
        .td-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; z-index: 998;
        }
        .td-modal {
          background: #0d2235; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 2.5rem; max-width: 380px; width: 90%;
          text-align: center;
          animation: fadeInUp 0.2s ease;
        }
        .td-modal__icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .td-modal h3 { font-size: 1.2rem; color: #f0ece4; margin-bottom: 0.5rem; font-family: 'Lora', serif; }
        .td-modal p { font-size: 0.88rem; color: #6a8090; margin-bottom: 1.5rem; line-height: 1.6; }
        .td-modal__actions { display: flex; gap: 0.75rem; justify-content: center; }

        /* ── HEADER ── */
        .td-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 2rem; gap: 1rem;
        }
        .td-header__actions { display: flex; gap: 0.75rem; flex-shrink: 0; }
        .td-page-title {
          font-family: 'Lora', serif;
          font-size: 1.9rem; font-weight: 700; color: #f0ece4;
          margin-bottom: 0.3rem;
        }
        .td-page-sub { font-size: 0.88rem; color: #4a6a7e; }
        .td-back-btn {
          background: none; border: none; color: #e8c87d;
          font-size: 0.85rem; cursor: pointer; padding: 0;
          margin-bottom: 0.5rem; font-family: 'DM Sans', sans-serif;
          transition: opacity 0.15s;
        }
        .td-back-btn:hover { opacity: 0.75; }

        /* ── BUTTONS ── */
        .td-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.55rem 1.2rem; border-radius: 8px;
          font-size: 0.88rem; font-weight: 500; cursor: pointer;
          border: none; font-family: 'DM Sans', sans-serif;
          transition: all 0.15s; white-space: nowrap;
        }
        .td-btn--gold { background: #e8c87d; color: #1a0e05; }
        .td-btn--gold:hover { background: #f0d698; box-shadow: 0 4px 16px rgba(232,200,125,0.3); }
        .td-btn--ghost { background: transparent; color: #8a9faf; border: 1px solid rgba(255,255,255,0.1); }
        .td-btn--ghost:hover { border-color: #e8c87d; color: #e8c87d; }
        .td-btn--danger { background: #c0392b; color: white; }
        .td-btn--danger:hover { background: #e74c3c; }
        .td-btn--publish { background: rgba(158,207,184,0.15); color: #9ecfb8; border: 1px solid rgba(158,207,184,0.3); font-size: 0.82rem; padding: 0.4rem 0.9rem; }
        .td-btn--publish:hover { background: rgba(158,207,184,0.25); }
        .td-btn--icon { background: rgba(255,255,255,0.05); color: #8a9faf; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.85rem; }
        .td-btn--icon:hover { background: rgba(255,255,255,0.1); color: #d8e4ec; }
        .td-btn--del:hover { background: rgba(192,57,43,0.15); color: #e74c3c; }

        /* ── STATS ── */
        .td-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1rem; margin-bottom: 2rem;
        }
        .td-stat-card {
          background: #0d2235;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 1.2rem 1.4rem;
          position: relative; overflow: hidden;
          transition: transform 0.15s;
        }
        .td-stat-card:hover { transform: translateY(-2px); }
        .td-stat-card__icon { font-size: 1.4rem; margin-bottom: 0.5rem; }
        .td-stat-card__val { font-size: 2rem; font-weight: 700; color: var(--sc); font-family: 'Lora', serif; line-height: 1; margin-bottom: 0.3rem; }
        .td-stat-card__label { font-size: 0.8rem; color: #4a6a7e; }
        .td-stat-card__bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--sc); opacity: 0.4;
        }

        /* ── FILTERS ── */
        .td-filters {
          display: flex; gap: 0.5rem; margin-bottom: 1.5rem;
        }
        .td-filter-btn {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.45rem 1rem; border-radius: 8px;
          background: transparent; border: 1px solid rgba(255,255,255,0.08);
          color: #6a8090; font-size: 0.85rem;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.15s;
        }
        .td-filter-btn:hover { border-color: rgba(255,255,255,0.2); color: #d8e4ec; }
        .td-filter-btn.active { background: rgba(232,200,125,0.12); border-color: rgba(232,200,125,0.4); color: #e8c87d; }
        .td-filter-count {
          background: rgba(255,255,255,0.08); border-radius: 100px;
          padding: 0.05rem 0.45rem; font-size: 0.75rem;
        }
        .td-filter-btn.active .td-filter-count { background: rgba(232,200,125,0.2); }

        /* ── TASK LIST ── */
        .td-task-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .td-empty {
          text-align: center; padding: 4rem 2rem;
          color: #4a6a7e; font-size: 0.9rem;
        }
        .td-empty span { display: block; font-size: 2.5rem; margin-bottom: 0.75rem; }
        .td-empty button { background: none; border: none; color: #e8c87d; cursor: pointer; font-size: 0.9rem; text-decoration: underline; }
        .td-task-row {
          background: #0d2235;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 1.2rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
          transition: border-color 0.15s, transform 0.15s;
        }
        .td-task-row:hover { border-color: rgba(232,200,125,0.2); transform: translateX(2px); }
        .td-task-row__left { display: flex; align-items: flex-start; gap: 1rem; flex: 1; min-width: 0; }
        .td-task-row__status-dot {
          width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
        }
        .td-task-row__title { font-size: 1rem; font-weight: 600; color: #f0ece4; margin-bottom: 0.35rem; }
        .td-task-row__meta {
          display: flex; flex-wrap: wrap; gap: 0.6rem;
          font-size: 0.78rem; color: #4a6a7e; margin-bottom: 0.35rem;
        }
        .td-tag {
          background: rgba(232,200,125,0.12); color: #e8c87d;
          border-radius: 4px; padding: 0.1rem 0.5rem; font-size: 0.75rem; font-weight: 500;
        }
        .td-task-row__prompt { font-size: 0.82rem; color: #4a6a7e; line-height: 1.5; }
        .td-task-row__right {
          display: flex; align-items: center; gap: 1rem; flex-shrink: 0;
        }
        .td-progress-block { width: 130px; }
        .td-progress-label {
          display: flex; justify-content: space-between;
          font-size: 0.75rem; color: #4a6a7e; margin-bottom: 0.35rem;
        }
        .td-progress-bar { height: 5px; background: rgba(255,255,255,0.07); border-radius: 3px; overflow: hidden; }
        .td-progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
        .td-status-badge {
          font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.25rem 0.65rem; border-radius: 6px; border: 1px solid;
        }
        .td-task-row__actions { display: flex; align-items: center; gap: 0.4rem; }

        /* ── FORM ── */
        .td-tabs {
          display: flex; gap: 0; margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .td-tab {
          padding: 0.7rem 1.4rem; background: transparent; border: none;
          color: #4a6a7e; font-size: 0.9rem; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: all 0.15s;
        }
        .td-tab:hover { color: #d8e4ec; }
        .td-tab.active { color: #e8c87d; border-bottom-color: #e8c87d; }
        .td-form {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.25rem; align-items: start;
        }
        .td-form-group { display: flex; flex-direction: column; gap: 0.45rem; }
        .td-form-group--full { grid-column: 1 / -1; }
        .td-form-row {
          grid-column: 1 / -1;
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 1.25rem;
        }
        .td-form-group label {
          font-size: 0.83rem; font-weight: 500; color: #8a9faf;
        }
        .td-req { color: #e8c87d; }
        .td-input {
          background: #0a1e2e;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 0.65rem 0.9rem;
          color: #d8e4ec; font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.15s;
          outline: none; width: 100%;
        }
        .td-input:focus { border-color: #e8c87d; }
        .td-input option { background: #0d2235; }
        .td-textarea { resize: vertical; min-height: 120px; }
        .td-char-count { font-size: 0.75rem; color: #3a5060; text-align: right; margin-top: -0.2rem; }
        .td-preview {
          grid-column: 1 / -1;
          background: #060f18; border: 1px dashed rgba(232,200,125,0.25);
          border-radius: 12px; padding: 1.5rem;
        }
        .td-preview__label {
          font-size: 0.78rem; color: #e8c87d; letter-spacing: 0.08em;
          text-transform: uppercase; margin-bottom: 1rem;
        }
        .td-preview__card {
          background: #0d2235; border-radius: 10px; padding: 1.25rem;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .td-preview__type { font-size: 0.78rem; color: #6a8090; margin-bottom: 0.4rem; }
        .td-preview__title { font-family: 'Lora', serif; font-size: 1.15rem; color: #f0ece4; margin-bottom: 0.6rem; }
        .td-preview__meta {
          display: flex; flex-wrap: wrap; gap: 1rem;
          font-size: 0.78rem; color: #4a6a7e; margin-bottom: 0.75rem;
        }
        .td-preview__prompt {
          font-size: 0.85rem; color: #8a9faf; line-height: 1.65;
          padding: 0.75rem; background: rgba(255,255,255,0.03);
          border-left: 3px solid #e8c87d; border-radius: 4px;
        }
        .td-preview__prompt strong { color: #e8c87d; }

        /* RUBRIC */
        .td-rubric-info {
          grid-column: 1 / -1;
          display: flex; align-items: flex-start; gap: 0.75rem;
          background: rgba(232,200,125,0.06); border: 1px solid rgba(232,200,125,0.15);
          border-radius: 10px; padding: 1rem 1.2rem;
          font-size: 0.87rem; color: #8a9faf;
        }
        .td-rubric-info span { font-size: 1.3rem; flex-shrink: 0; }
        .td-rubric-grid {
          grid-column: 1 / -1;
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }
        .td-rubric-item {
          background: #0a1e2e; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 1.1rem;
        }
        .td-rubric-item__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
        .td-rubric-item__name { font-size: 0.9rem; font-weight: 500; color: #d8e4ec; }
        .td-rubric-item__pts { font-size: 0.85rem; color: #e8c87d; font-weight: 600; }
        .td-rubric-item__desc { font-size: 0.8rem; color: #4a6a7e; margin-bottom: 0.75rem; line-height: 1.5; }
        .td-rubric-item__bar { height: 5px; background: rgba(255,255,255,0.07); border-radius: 3px; overflow: hidden; }
        .td-rubric-item__fill { height: 100%; background: #e8c87d; border-radius: 3px; transition: width 0.4s ease; }
        .td-rubric-note {
          grid-column: 1 / -1;
          font-size: 0.8rem; color: #3a5060; font-style: italic;
          text-align: center; padding: 0.5rem;
        }

        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(16px); }
          to { opacity:1; transform:translateY(0); }
        }

        @media (max-width: 900px) {
          .td-sidebar { display: none; }
          .td-main { padding: 1.5rem; }
          .td-stats { grid-template-columns: 1fr 1fr; }
          .td-task-row { flex-direction: column; align-items: flex-start; }
          .td-task-row__right { width: 100%; }
          .td-form { grid-template-columns: 1fr; }
          .td-form-row { grid-template-columns: 1fr; }
          .td-rubric-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
