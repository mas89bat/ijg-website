"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Sparkles,
  LayoutGrid,
  MessageCircle,
  TrendingUp,
  ChartCandlestick,
  Gift,
  Settings,
  Menu,
  X,
  UserCheck,
  FolderOpen,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface PortalSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "query", label: "AI Query", Icon: Sparkles },
  { id: "trading", label: "Stock Market", Icon: ChartCandlestick },
  { id: "wealth", label: "Wealth Management", Icon: TrendingUp },
  { id: "advisory", label: "Advisory", Icon: UserCheck },
  { id: "library", label: "Research Library", Icon: LayoutGrid },
  { id: "documents", label: "My Documents", Icon: FolderOpen },
  { id: "communications", label: "Communications", Icon: MessageCircle },
  { id: "referral", label: "Referral Programme", Icon: Gift },
  { id: "profile", label: "My Profile", Icon: UserCheck },
  { id: "settings", label: "Settings", Icon: Settings },
] as const;

const STORAGE_KEY = "ijg_sidebar_collapsed";

export default function PortalSidebar({
  activeTab,
  onTabChange,
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileClose,
}: PortalSidebarProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") onCollapsedChange(true);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCollapsed = () => {
    if (isMobile) {
      onMobileClose?.();
      return;
    }
    const next = !collapsed;
    onCollapsedChange(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {};
  };

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    if (isMobile) {
      onMobileClose?.();
    }
  };

  const sidebarWidth = isMobile ? 260 : collapsed ? 64 : 240;
  const showExpanded = isMobile ? true : !collapsed;

  // On mobile, hide sidebar completely when not open
  if (isMobile && !mobileOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop on mobile */}
      {isMobile && mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 40,
          }}
        />
      )}
    <nav
      style={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        background: "#0D1117",
        display: "flex",
        flexDirection: "column",
        position: isMobile ? "fixed" : "sticky",
        top: 0,
        left: 0,
        height: "100vh",
        overflowY: "auto",
        transition: isMobile ? "transform 0.25s ease" : "width 0.2s ease, min-width 0.2s ease",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
        zIndex: isMobile ? 50 : 20,
        ...(isMobile ? { transform: mobileOpen ? "translateX(0)" : "translateX(-100%)" } : {}),
      }}
    >
      {/* Logo section + collapse toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: showExpanded ? "20px 20px" : "20px 0",
          justifyContent: showExpanded ? "flex-start" : "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          minHeight: 64,
        }}
      >
        <img
          src="/ijg-logo.png"
          alt="IJG"
          style={{ height: 28, width: "auto", flexShrink: 0 }}
        />
        {showExpanded && (
          <span
            style={{
              color: "#F5F0E8",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            IJG Portal
          </span>
        )}
        <button
          onClick={toggleCollapsed}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#7A7680",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            marginLeft: showExpanded ? "auto" : 0,
            flexShrink: 0,
          }}
          aria-label={showExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {showExpanded ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Navigation items */}
      <div
        style={{
          flex: 1,
          paddingTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          const isHovered = hoveredTab === id;

          return (
            <div key={id} style={{ position: "relative" }}>
              <button
                onClick={() => handleTabChange(id)}
                onMouseEnter={() => setHoveredTab(id)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: showExpanded ? "10px 20px" : "10px 0",
                  justifyContent: showExpanded ? "flex-start" : "center",
                  background: isActive
                    ? "rgba(201,168,76,0.08)"
                    : "transparent",
                  border: "none",
                  borderLeft: isActive
                    ? "3px solid #C9A84C"
                    : "3px solid transparent",
                  cursor: "pointer",
                  color: isActive
                    ? "#C9A84C"
                    : isHovered
                    ? "#E8E4DD"
                    : "#7A7680",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: isActive ? 500 : 400,
                  transition: "color 0.15s ease, background 0.15s ease",
                  whiteSpace: "nowrap",
                  textAlign: "left",
                }}
              >
                <Icon
                  size={20}
                  style={{
                    flexShrink: 0,
                    color: isActive
                      ? "#C9A84C"
                      : isHovered
                      ? "#E8E4DD"
                      : "#7A7680",
                  }}
                />
                {showExpanded && <span>{label}</span>}
              </button>

              {/* Tooltip when collapsed */}
              {!showExpanded && isHovered && (
                <div
                  style={{
                    position: "absolute",
                    left: 64,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "#1C1F26",
                    color: "#E8E4DD",
                    padding: "6px 12px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: "nowrap",
                    zIndex: 50,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    pointerEvents: "none",
                  }}
                >
                  {label}
                </div>
              )}
            </div>
          );
        })}

      </div>
    </nav>
    </>
  );
}
