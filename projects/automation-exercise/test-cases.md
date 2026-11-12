# E-commerce test scenarios

All scenarios are planned. Use a fresh browser session for guest checks and a dedicated synthetic account for account checks. Expected outcomes marked as a product question require agreement before a deviation becomes a confirmed defect.

| ID | Priority | Steps | Expected outcome / test basis |
|---|---|---|---|
| EC-01 | High | Open Products, search `top`, open a result | Results match the term and the selected product detail identifies the same product; published UI case 9 |
| EC-02 | High | Record unit price, choose quantity 3 on the detail page, add to cart | Cart has the same product and unit price, quantity 3 and line total equal to price × 3; UI case 13 |
| EC-03 | High | Continue shopping, add a different product, return to cart | Both product lines, prices and quantities agree with the selections; UI case 12 |
| EC-04 | High | Remove one product and refresh the cart | Removed product stays absent and the other line stays correct; UI case 17 |
| EC-05 | High | With a guest cart, choose checkout | Registration/login prompt appears; UI case 15 |
| EC-06 | High | Log in with the test account after adding guest products | Previously added products remain available with correct values; UI case 20 |
| EC-07 | High | Register a unique synthetic account, continue to the application | Account creation succeeds and the correct display name appears; UI case 1 |
| EC-08 | Medium | Try registration with that account's email again | Duplicate email error appears; UI case 5 |
| EC-09 | High | Enter an incorrect password, then retry with correct credentials | Invalid login gives an error; valid retry signs in as the test user; UI cases 2–3 |
| EC-10 | High | Log out, refresh, navigate back and open a new tab | Record authenticated navigation and page behaviour. Product question concerns access to protected pages after logout; UI case 4 covers return to login |
| EC-11 | High | Compare delivery and billing address at checkout with registration data | Address fields agree with the account inputs; UI case 23 |
| EC-12 | High | Review order lines, totals and a synthetic order comment | Product names, quantities, prices and totals agree with the cart; UI case 16 |
| EC-13 | High | Complete the practice payment form with synthetic values | Confirmation appears; compare any displayed order details with review; UI case 16 |
| EC-14 | Medium | Download invoice after an order and inspect its content | Invoice downloads; record and compare available identity and amount fields; UI case 24 |
| EC-15 | Medium | Filter a category, then a brand; open a product | Selected category/brand and displayed products agree; UI cases 18–19 |
| EC-16 | Medium | Search a unique nonsense term, then search a valid term | Record empty-result feedback and successful recovery. Empty-state presentation is a product question |
| EC-17 | Medium | On product detail, try quantity 0, -1, 1.5 and empty | Record validation and whether a request/cart entry is created. Accepted quantity rules are a product question |
| EC-18 | High | Open a separate private browser session while the first holds a cart | Record whether cart and login state stay isolated between independent sessions; product question |
| EC-19 | Medium | Follow search → detail → cart at 375px and using keyboard controls | Record focus visibility, reachable controls, clipping and any blocked action; usability investigation |
| EC-20 | Medium | Compare product/search API results with UI; omit search parameter | Catalogue values agree across layers. Missing search parameter returns the documented application code 400 and error message; API cases 1, 5–6 |

Published cases are linked from the [project overview](README.md). Use those sources for detailed prerequisites. Session isolation, input edge cases and usability investigations extend the published examples and need observed evidence and explicit product expectations.
