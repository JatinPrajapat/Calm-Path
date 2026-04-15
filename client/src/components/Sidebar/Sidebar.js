import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import './Sidebar.css';

// ─── Minimal Icons (SaaS Style) ─────────────────────────────────────────────
const Icons = {
  Home: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Dashboard: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  Brain: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  Activity: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Game: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M8 10v4"/><path d="M15 13h.01"/><path d="M18 11h.01"/></svg>,
  TrendingUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Calendar: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Lightbulb: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  Target: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Heart: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  Layers: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 12 12 17 22 12"/><polygon points="2 17 12 22 22 17"/></svg>,
  Shield: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  LogOut: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  User: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Zap: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  ChevronRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
  ChevronLeft: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  Menu: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
};

// ─── Nav Config ──────────────────────────────────────────────────────────────

const mainNav = [
  { icon: <Icons.Home />, label: 'Home',             path: '/' },
  { icon: <Icons.Dashboard />, label: 'Dashboard',         path: '/dashboard' },
  {
    icon: <Icons.Brain />, label: 'Mental Analysis', path: '/mental-analysis',
    children: [
      { icon: <Icons.Activity />, label: 'Stress Test',        path: '/test/stress' },
      { icon: <Icons.Heart />, label: 'Anxiety Test',        path: '/test/anxiety' },
      { icon: <Icons.Shield />, label: 'Depression Check',    path: '/test/depression' },
      { icon: <Icons.User />, label: 'Personality Scan',     path: '/test/personality' },
      { icon: <Icons.Layers />, label: 'Emotional Balance',   path: '/test/emotional' },
      { icon: <Icons.Target />, label: 'Focus Patterns',      path: '/test/focus' },
    ],
  },
  { icon: <Icons.Game />, label: 'Mind Games',        path: '/mind-games' },
  { icon: <Icons.TrendingUp />, label: 'Insights & Reports', path: '/dashboard' },
];

const extraNav = [
  { icon: <Icons.Lightbulb />, label: 'Daily Tip',   path: '/legal' },
  { icon: <Icons.Target />, label: 'Goals',        path: '/dashboard' },
  { icon: <Icons.Heart />, label: 'Therapy',      path: '/therapy' },
];

const bottomNav = [
  { icon: <Icons.Settings />, label: 'Settings', path: '/dashboard' },
];

// ─── Sidebar Item ─────────────────────────────────────────────────────────────

function SidebarItem({ item, collapsed, currentPath, onNavigate }) {
  const [open, setOpen] = useState(false);
  const isActive = item.path === currentPath ||
    (item.children && item.children.some(c => c.path === currentPath));

  if (item.children) {
    return (
      <>
        <div
          className={`sb-item ${isActive ? 'active' : ''}`}
          onClick={() => setOpen(o => !o)}
        >
          <div className="sb-item-icon">{item.icon}</div>
          <span className="sb-item-label">{item.label}</span>
          <span className={`sb-item-chevron ${open ? 'open' : ''}`}><Icons.ChevronRight /></span>
        </div>
        <div className={`sb-dropdown ${open && !collapsed ? 'open' : ''}`}>
          {item.children.map(child => (
            <Link
              key={child.label}
              to={child.path}
              className={`sb-sub-item ${currentPath === child.path ? 'active' : ''}`}
              onClick={onNavigate}
            >
              <span className="sb-sub-icon">{child.icon}</span>
              {child.label}
            </Link>
          ))}
        </div>
      </>
    );
  }

  return (
    <Link
      to={item.path}
      className={`sb-item ${isActive ? 'active' : ''}`}
      onClick={onNavigate}
    >
      <div className="sb-item-icon">{item.icon}</div>
      <span className="sb-item-label">{item.label}</span>
    </Link>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const isLoggedIn = Auth.loggedIn();
  let username = '';
  try { username = isLoggedIn ? Auth.getProfile()?.email?.split('@')[0] : ''; } catch (e) {}

  return (
    <nav className={`sb ${collapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button */}
      {/* Positioned so it overflows nicely, no clipping! */}
      <div className="sb-toggle" onClick={onToggle}>
        {collapsed ? <Icons.Menu /> : <Icons.ChevronLeft />}
      </div>

      <div className="sb-inner">

        {/* ── Branding ─────────────────────────────── */}
        <div className="sb-brand">
          <div className="sb-logo"><Icons.Brain /></div>
          <div className="sb-brand-name">CalmPath</div>
        </div>

        {/* ── Quick Action ─────────────────────────── */}
        <div className="sb-quick">
          <Link to="/quizselect" className="sb-quick-btn">
            <span className="sb-quick-btn-icon"><Icons.Zap /></span>
            <span className="sb-quick-btn-text">Start Analysis</span>
          </Link>
        </div>

        {/* ── Main Navigation ──────────────────────── */}
        <div className="sb-nav">
          <div className="sb-section-label">Navigation</div>
          {mainNav.map(item => (
            <SidebarItem
              key={item.label}
              item={item}
              collapsed={collapsed}
              currentPath={location.pathname}
              onNavigate={() => {}}
            />
          ))}

          <div style={{ height: '1px', background: '#e5e7eb', margin: '16px 8px 8px' }} />
          
          <div className="sb-section-label">Explore</div>
          {extraNav.map(item => (
            <SidebarItem
              key={item.label}
              item={item}
              collapsed={collapsed}
              currentPath={location.pathname}
              onNavigate={() => {}}
            />
          ))}
        </div>

        {/* ── User Section ─────────────────────────── */}
        <div className="sb-user">
          {isLoggedIn ? (
            <div className="sb-user-card">
              <div className="sb-avatar"><Icons.User /></div>
              <div className="sb-user-info">
                <div className="sb-user-name">{username || 'User'}</div>
              </div>
            </div>
          ) : (
            <div className="sb-auth-btns">
              <Link to="/signup" className="sb-auth-btn sb-auth-btn-primary">
                {!collapsed && <span>Sign up</span>}
                {collapsed && <Icons.User />}
              </Link>
              <Link to="/login" className="sb-auth-btn sb-auth-btn-secondary">
                {!collapsed && <span>Log in</span>}
                {collapsed && <Icons.ArrowRight />}
              </Link>
            </div>
          )}
        </div>

        {/* ── Bottom ───────────────────────────────── */}
        <div className="sb-bottom" style={{ padding: '8px', borderTop: '1px solid #e5e7eb' }}>
          {bottomNav.map(item => (
            <SidebarItem
              key={item.label}
              item={item}
              collapsed={collapsed}
              currentPath={location.pathname}
              onNavigate={() => {}}
            />
          ))}
          {isLoggedIn && (
            <div
              className="sb-item"
              onClick={() => Auth.logout()}
              style={{ cursor: 'pointer' }}
            >
              <div className="sb-item-icon"><Icons.LogOut /></div>
              <span className="sb-item-label">Log out</span>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
