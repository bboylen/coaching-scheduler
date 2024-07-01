import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import CoachDashboard from './components/CoachDashboard';
import StudentDashboard from './components/StudentDashboard';
import { User } from './types';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const userType = user?.type;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ backgroundColor: '#f0f0f0' }}>
          <Header user={user} setUser={setUser} />
          <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
            <Routes>
              <Route
                path="/"
                element={
                  user ? (userType === 'Coach' ? <CoachDashboard user={user} /> : <StudentDashboard user={user} />) : ''
                }
              />
            </Routes>
          </Container>
        </Box>
    </Router>
    </ThemeProvider>
  );
}

export default App;
