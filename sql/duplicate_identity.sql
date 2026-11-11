SELECT id, COUNT(*) AS occurrences FROM bookings
GROUP BY id HAVING COUNT(*) > 1;
