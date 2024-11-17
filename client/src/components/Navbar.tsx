import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinkStyles = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',
    color: isActive ? 'yellow' : 'inherit',
    margin: '0 10px',
  });

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Phishing App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user.isAuthenticated ? (
            <>
              <NavLink to='/phishing-form' style={navLinkStyles}>
                <Button
                  color='inherit'
                  component={NavLink}
                  to='/phishing-form'
                  sx={{ marginRight: 2 }}
                >
                  Phishing Simulation
                </Button>
              </NavLink>
              <NavLink to='/phishing-table' style={navLinkStyles}>
                <Button
                  color='inherit'
                  component={NavLink}
                  to='/phishing-table'
                  sx={{ marginRight: 2 }}
                >
                  Phishing Attempts
                </Button>
              </NavLink>
              <Typography variant='body1' sx={{ marginRight: 2 }}>
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
              <NavLink to='/login' style={navLinkStyles}>
                <Button
                  color='inherit'
                  component={NavLink}
                  to='/login'
                  sx={{ marginRight: 2 }}
                >
                  Login
                </Button>
              </NavLink>
              <NavLink to='/register' style={navLinkStyles}>
                <Button
                  color='inherit'
                  component={NavLink}
                  to='/register'
                  sx={{ marginRight: 2 }}
                >
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
