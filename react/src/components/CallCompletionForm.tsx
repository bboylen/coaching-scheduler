import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Rating } from '@mui/material';
import { completeCall } from '../api';
import { Booking } from '../types';

interface CallCompletionFormProps {
  booking: Booking;
  onComplete: () => void;
}

const CallCompletionForm: React.FC<CallCompletionFormProps> = ({ booking, onComplete }) => {
  const [satisfactionScore, setSatisfactionScore] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (satisfactionScore !== null && notes !== '') {
      await completeCall(booking.id, satisfactionScore, notes);
      onComplete();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Complete Call
      </Typography>
      <Typography component="legend">Satisfaction Rating</Typography>
      <Rating
        name="satisfaction-score"
        value={satisfactionScore}
        onChange={(event, newValue) => {
          setSatisfactionScore(newValue);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="notes"
        label="Notes"
        name="notes"
        multiline
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={satisfactionScore === null || notes === ''}
      >
        Complete Call
      </Button>
    </Box>
  );
}

export default CallCompletionForm;
