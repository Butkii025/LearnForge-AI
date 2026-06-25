import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Calendar, 
  Code, 
  BarChart2, 
  Home, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, username, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tutor', label: 'AI Tutor', icon: BookOpen },
    { id: 'quiz', label: 'Quiz Center', icon: HelpCircle },
    { id: 'planner', label: 'Study Planner', icon: Calendar },
    { id: 'codereview', label: 'Code Review', icon: Code },
    { id: 'analytics', label: 'Analytics & Maps', icon: BarChart2 }
  ];

  return (
    <div style={{
      width: collapsed ? '70px' : '240px',
      backgroundColor: '#1A1A2E',
      borderRight: '1px solid #2C2C4E',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      height: '100vh',
      flexShrink: 0
    }}>
      {/* Sidebar Header Logo */}
      <div style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid #2C2C4E'
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🧠</span>
            <span style={{ 
              fontWeight: 700, 
              fontSize: '18px', 
              color: '#E2E8F0',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Learn<span style={{ color: '#6366F1' }}>Forge</span>
            </span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px'
          }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation list */}
      <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                width: '100%',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: isActive ? '#6366F1' : 'transparent',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                transition: 'all 0.2s ease',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '14px',
                justifyContent: collapsed ? 'center' : 'flex-start'
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #2C2C4E',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {!collapsed && (
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>
            Logged in: <b style={{ color: '#E2E8F0' }}>{username}</b>
          </div>
        )}
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#EF4444',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '13px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            width: '100%'
          }}
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
