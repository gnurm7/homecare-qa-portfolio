SELECT id FROM bookings WHERE status NOT IN ('confirmed', 'cancelled') OR status IS NULL;
