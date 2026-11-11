# SQL data quality exercise

Run from the repository root with Python 3.12+ (standard library only):

```bash
python scripts/check_sql.py
```

An in-memory SQLite database loads [fixture.sql](../sql/fixture.sql), a synthetic analytical extract with deliberately corrupt rows. No application server or database service is required. Each query must identify the exact expected finding, then return zero findings on a clean extract; failures exit nonzero in CI.

| Check | SQL skill | Expected seeded finding |
|---|---|---|
| [Pricing](../sql/pricing_mismatch.sql) | INNER JOIN, calculated expected value | b3: stored 1; expected 1500 |
| [Orphan service](../sql/orphan_service.sql) | LEFT JOIN, NULL detection | b4 |
| [Duplicate identity](../sql/duplicate_identity.sql) | GROUP BY, COUNT, HAVING | b1 occurs twice |
| [Invalid state](../sql/invalid_state.sql) | NOT IN and NULL handling | b6 |
| [Room bounds](../sql/invalid_rooms.sql) | BETWEEN and NULL handling | b5 |

Ten checks mean five seeded-data expectations plus five clean-data controls. These queries demonstrate basic data investigation; they do not validate all possible type, null or schema defects. The permissive extract schema allows dirty data intentionally. The booking app itself still uses a JavaScript Map: no database integration, persistence or SQL performance claim is made.
