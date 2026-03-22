"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface PortalHeaderProps {
  currentSection: string;
  onToggleMobileMenu?: () => void;
}

export default function PortalHeader({ currentSection, onToggleMobileMenu }: PortalHeaderProps) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const displayName = user?.name || "User";
  const email = user?.email || "";
  const plan = user?.plan || "Free";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      style={{
        height: 56,
        minHeight: 56,
        background: "#07090F",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Left section: hamburger + breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {isMobile && onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#7A7680",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        )}
        <div style={{ fontSize: 14, color: "#9CA3AF" }}>
          <span style={{ color: "#7A7680" }}>Portal</span>
          <span style={{ color: "#7A7680", margin: "0 8px" }}>/</span>
          <span style={{ color: "#F5F0E8" }}>{currentSection}</span>
        </div>
      </div>

      {/* Right section */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Bell icon (decorative) */}
        <Bell size={18} style={{ color: "#7A7680" }} />

        {/* User avatar + dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(201,168,76,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C9A84C",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              border: "none",
              cursor: "pointer",
            }}
          >
            {initials}
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: 40,
                right: 0,
                width: 220,
                background: "#1C1F26",
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                padding: "12px 0",
                zIndex: 100,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <div style={{ padding: "4px 16px 8px" }}>
                <div style={{ color: "#F5F0E8", fontSize: 14, fontWeight: 500 }}>
                  {displayName}
                </div>
                {email && (
                  <div
                    style={{
                      color: "#7A7680",
                      fontSize: 12,
                      marginTop: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {email}
                  </div>
                )}
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(201,168,76,0.12)",
                    color: "#C9A84C",
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: 4,
                    marginTop: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {plan}
                </div>
              </div>

              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                  margin: "8px 0",
                }}
              />

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px 16px",
                  background: "transparent",
                  border: "none",
                  color: "#9CA3AF",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = "transparent";
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
