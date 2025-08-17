## Minimal Vite + React + TypeScript app with tests.

- exercise1_code_review

## Quick commands

```
Install: npm install
Dev server: npm run dev
Build: npm run build
Preview build: npm run preview
Tests: npm test
Coverage: npm test -- --coverage
Notes

Set runtime API in .env: VITE_API_URL=https://api.example.com
Use import.meta.env.VITE_API_URL in browser code (not process.env).

```
---

## Code review note

---
## Potential issues(bug)
- If the user is leaving the page, it leaves the page, it can trigger a memory leak or warning.
- Failing API calls or network issues leave the user hanging - nothing has been shown.
- Using any use in the typescript can hide types of mistakes.
- Hard-coded API URL app makes less flexible in the atmosphere.

## Suggestions for Readability
- Keep a separate position for loading and errors.
- Comment on side effects like API calls.
- Define appropriate typescript types for user objects.
- Show users a friendly error message with an option to retry.

---
## Performance & Best Practices
- Cancel fetches on unmount using AbortController.
- Leave React.FC until you need it for children.
- Consider transferring the logic that brought into a useful hook to reuse it.

---
## Testing
- Always mock - don't rely on real API calls.
- Test loading, success and error states.
- Ensure that the API is called with the right parameters and the loading disappears after bringing the data.

---
## Security
- Do not show raw errors to users; Log in for developers only.
---
