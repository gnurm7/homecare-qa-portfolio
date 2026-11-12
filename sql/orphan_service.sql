SELECT b.id FROM bookings b
LEFT JOIN services s ON s.id = b.service_id WHERE s.id IS NULL;
