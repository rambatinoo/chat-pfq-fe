import { useState } from "react";

export const Sidebar = ({ setUsername }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = (e) => {
    setUsername("");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '0', margin: '0' }}>
      <div>
        <img src="/just-logo.png" width="100%" />
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div>
        <button onClick={handleLogout} className="animated-button">
          <img
            src={isHovered ? "/Bootstrap-Bootstrap-Bootstrap-door-open.512.png" : "/Bootstrap-Bootstrap-Bootstrap-door-closed.512.png"}
            alt="Logout"
            className="button-image"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </button>
      </div>
    </div>
  );
};