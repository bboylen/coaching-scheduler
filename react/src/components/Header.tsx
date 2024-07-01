import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { fetchUsers } from '../api';
import { User } from '../types';

interface HeaderProps {
  setUser: (user: User | null) => void;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({setUser, user}) => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  };

  const handleUserChange = (event: SelectChangeEvent, child: React.ReactNode) => {
    const userId = event.target.value as number;
    const selectedUser = users.find(user => user.id === userId) || null;
    setUser(selectedUser);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Coaching App
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 120, marginY: 2 }}>
            <InputLabel id="user-select-label">User</InputLabel>
            <Select
              labelId="user-select-label"
              value={user?.id.toString() || ''}
              onChange={handleUserChange}
              label="User"
            >
              {users.map(coach => (
                <MenuItem key={coach.id} value={coach.id}>{coach.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
