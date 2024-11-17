import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Phishing App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user.isAuthenticated ? (
            <>
              <Button
                color='inherit'
                component={NavLink}
                to='/phishing-form'
                sx={{ marginRight: 2 }}
              >
                Phishing Simulation
              </Button>
              <Button
                color='inherit'
                component={NavLink}
                to='/phishing-table'
                sx={{ marginRight: 2 }}
              >
                Phishing Attempts
              </Button>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Welcome, {user.username}!
              </Typography>
              <Button
                color='inherit'
                onClick={handleLogout}
                sx={{ marginRight: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color='inherit'
                component={NavLink}
                to='/login'
                sx={{ marginRight: 2 }}
              >
                Login
              </Button>
              <Button
                color='inherit'
                component={NavLink}
                to='/register'
                sx={{ marginRight: 2 }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
