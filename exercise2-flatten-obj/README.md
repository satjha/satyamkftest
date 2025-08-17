Object Flattener (TypeScript)
A small TypeScript utility that converts nested objects into a single-level object with path-like keys (e.g. { user: { name: "A" } } => { "user.name": "A" }).

...existing code...

## Quick start


Install:
```bash
npm install
```

Run example (dev):
```bash
npx ts-node src/index.ts
```

Build and run:
```bash
npx tsc
node dist/index.js
```

Run tests:
```bash
npx jest --config jest.config.cjs
# or
npm test
```

## Features (short)
Flattens objects and arrays (indexes used as segments).
Preserves Date, null and undefined.
Type helper: Flatten<T>.
Tested with Jest. 