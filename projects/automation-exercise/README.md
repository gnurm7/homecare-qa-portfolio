# E-commerce QA study — Automation Exercise

**Gülsüm Nur Maslak · QA portfolio**

This study follows customer journeys across registration, login, product discovery, product details, cart, checkout and order confirmation. It focuses on data consistency between pages, session state, quantity calculations and recovery from invalid input.

## Application and test basis

Automation Exercise provides an e-commerce practice website, published UI scenarios and API documentation. Reviewed on 2026-11-12.

- [Application](https://automationexercise.com/)
- [Published UI scenarios](https://automationexercise.com/test_cases)
- [API reference](https://automationexercise.com/api_list)

## Priorities

| Priority | Risk | Investigation |
|---|---|---|
| High | Incorrect product, quantity or total at checkout | Compare product detail, cart and order review values |
| High | Cart lost during authentication | Build a guest cart, sign in and compare its contents |
| High | Session state inconsistent after logout | Check navigation, refresh and a second browser session |
| Medium | Search and category navigation hide expected products | Compare results with the catalogue and search API |
| Medium | Invalid input prevents recovery | Check error messages, retained input and successful retry |
| Medium | Small screens or keyboard navigation block checkout | Follow the complete journey at a narrow viewport and with the keyboard |

Use synthetic account and address data and a unique test email. For the practice payment form, use synthetic values. Record browser version, viewport, execution time and exact inputs. Create observations while testing and assign a result after checking the expected outcome.

## Execution

[Scenario matrix](test-cases.md) contains 20 planned checks. [Session record](session-record.md) holds actual observations and a defect template. Execution is pending.

Start with EC-01 through EC-04. Keep the product name, displayed unit price and selected quantity in the session record so subsequent cart and checkout checks can use the same data.

API checks will compare the documented application response code and message with the HTTP status actually returned. The public API covers catalogue, search and account operations. Cart and checkout consistency will be checked through the browser. SQL investigation belongs to the separate HomeCare sample-data exercise because this application's backing database is unavailable.
