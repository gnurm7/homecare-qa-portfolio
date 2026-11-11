SELECT b.id, b.total, b.rooms * s.price AS expected_total
FROM bookings b JOIN services s ON s.id = b.service_id
WHERE b.total <> b.rooms * s.price;
