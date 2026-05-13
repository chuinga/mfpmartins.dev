# Development Workflow

## Local Testing

- For every change that affects the UI or page behavior, verify it by testing directly on `localhost` (e.g., `http://localhost:3000`)
- Run the dev server (`npm run dev`) and visually confirm changes in the browser before considering a step complete
- Check both desktop and mobile viewports when making layout or responsive changes
- Verify that navigation, interactions, and dynamic content work as expected in the browser
- Do not rely solely on build success — always confirm the result visually on localhost

## User Validation

- After completing each task or meaningful step, **ask the user to test the web page** on their end before proceeding to the next task
- Provide the user with the localhost URL and a brief summary of what to test (e.g., "Please check the dark mode toggle and language switching on http://localhost:3000")
- Wait for user confirmation or feedback before moving on
- If the user reports issues, fix them before continuing to the next task
