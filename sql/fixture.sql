-- Synthetic warehouse extract; deliberately permits corrupt rows for QA exercises.
-- Separate from the in-memory application. Never use real customer data here.
CREATE TABLE services (id TEXT PRIMARY KEY, price INTEGER NOT NULL);
CREATE TABLE bookings (id TEXT, service_id TEXT, rooms INTEGER, total INTEGER, status TEXT);
INSERT INTO services VALUES ('cleaning', 500), ('repair', 750);
INSERT INTO bookings VALUES
 ('b1', 'cleaning', 2, 1000, 'confirmed'),
 ('b2', 'repair', 1, 750, 'cancelled'),
 ('b3', 'cleaning', 3, 1, 'confirmed'), -- incorrect total
 ('b4', 'unknown', 1, 500, 'confirmed'), -- orphan service
 ('b5', 'cleaning', 0, 0, 'confirmed'), -- invalid boundary
 ('b6', 'repair', 1, 750, 'pending'), -- invalid status
 ('b1', 'cleaning', 2, 1000, 'confirmed'); -- duplicate identity
