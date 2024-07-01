import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Slot } from '../types';

interface SlotCreatorProps {
  onCreateSlot: (slotData: Omit<Slot, 'id'>) => Promise<void>;
  coachId: number;
}

const SlotCreator: React.FC<SlotCreatorProps> = ({ onCreateSlot, coachId }) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  useEffect(() => {
    if (startTime) {
      const end = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
      setEndTime(end);
    } else {
      setEndTime(null);
    }
  }, [startTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startTime && endTime) {
      onCreateSlot({ coach_id: coachId, start_time: startTime.toString(), end_time: endTime.toString() });
      setStartTime(null);
      setEndTime(null);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Add New Time Slot
      </Typography>
      <DatePicker
        selected={startTime}
        onChange={(date: Date | null) => setStartTime(date)}
        showTimeSelect
        placeholderText="Select a start time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      {endTime && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          End Time: {endTime.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }).replace(',', '')}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Create Slot
      </Button>
    </Box>
  );
}

export default SlotCreator;
