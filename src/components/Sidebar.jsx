
const navigation = [
  { icon: "▦", label: "Overview" },
  { icon: "▤", label: "My Tasks" },
  { icon: "◷", label: "Activity" },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" onClick={() => onNavigate("Overview")}>
        <span className="brand-mark">T</span>
        <span>
          <strong>TaskFlow</strong>
          <small>WORKSPACE</small>
        </span>
      </a>

      <div className="workspace-switcher">
        <div className="workspace-avatar">M</div>
        <div className="workspace-info">
          <strong>My Workspace</strong>
          <small>Personal workspace</small>
        </div>
        <span className="switch-arrow">⌄</span>
      </div>

      <p className="sidebar-label">WORKSPACE</p>

      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`nav-link ${
              activePage === item.label ? "active" : ""
            }`}
            onClick={() => onNavigate(item.label)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.label === "My Tasks" && (
              <span className="nav-arrow">›</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-projects">
        <div className="sidebar-project-heading">
          <p className="sidebar-label">YOUR BOARD</p>
          <span>＋</span>
        </div>

        <button
          type="button"
          className={`nav-link ${
            activePage === "My Tasks" ? "active" : ""
          }`}
          onClick={() => onNavigate("My Tasks")}
        >
          <span className="project-dot" />
          <span>Website Redesign</span>
        </button>
      </div>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <span className="upgrade-icon">✦</span>
          <strong>Stay organized</strong>
          <p>Keep your work moving, one task at a time.</p>
          <button type="button" onClick={() => onNavigate("My Tasks")}>
            View my board →
          </button>
        </div>

        <div className="profile-row">
          <div className="profile-avatar">U</div>
          <div className="profile-info">
            <strong>Workspace User</strong>
            <small>Personal account</small>
          </div>
          <span className="profile-menu">•••</span>
        </div>
      </div>
    </aside>
  );
}
