"""Verify SQL detects known synthetic defects, and does not flag a clean extract."""
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    "pricing_mismatch": [("b3", 1, 1500)],
    "orphan_service": [("b4",)],
    "duplicate_identity": [("b1", 2)],
    "invalid_state": [("b6",)],
    "invalid_rooms": [("b5",)],
}
with sqlite3.connect(":memory:") as db:
    db.executescript((ROOT / "sql/fixture.sql").read_text(encoding="utf-8"))
    for name, expected in EXPECTED.items():
        query = (ROOT / f"sql/{name}.sql").read_text(encoding="utf-8")
        actual = db.execute(query).fetchall()
        if actual != expected:
            raise AssertionError(f"{name}: expected {expected!r}, got {actual!r}")
        print(f"PASS {name}: detected {actual!r}")
    db.execute("DELETE FROM bookings")
    db.executemany("INSERT INTO bookings VALUES (?, ?, ?, ?, ?)", [
        ("ok1", "cleaning", 1, 500, "confirmed"),
        ("ok2", "repair", 5, 3750, "cancelled"),
    ])
    for name in EXPECTED:
        query = (ROOT / f"sql/{name}.sql").read_text(encoding="utf-8")
        if db.execute(query).fetchall():
            raise AssertionError(f"{name}: false positive on clean data")
        print(f"PASS {name}: clean data has no findings")
print("10 SQL checks passed (5 detection checks + 5 clean-data controls).")
