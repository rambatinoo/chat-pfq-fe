import { Button } from "@mui/material";



export const Sidebar = ({setUsername}) => {
    const handleLogout = (e) => {
    setUsername("");
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '0', margin: '0' }}>
      <div>
        <img src="../../public/just-logo.png" width="100%" />
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div>
        <Button onClick={handleLogout}>
          <p>logout</p>
        </Button>
      </div>
    </div>
  );
};