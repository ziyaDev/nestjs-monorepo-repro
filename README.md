# NestJS Monorepo Path Resolution Issues - Minimum Reproduction Repository

This is a minimum reproduction repository to demonstrate path resolution issues encountered when using external libraries (outside app root) in a NestJS monorepo setup with SWC and TSC builders.

## Repository Structure

```
├── README.md
├── apps
│   └── api
│       ├── package.json
│       ├── src
│       │   ├── main.ts
│       │   ├── my-app.controller.spec.ts
│       │   ├── my-app.controller.ts
│       │   ├── my-app.module.ts
│       │   └── my-app.service.ts
│       ├── test
│       │   ├── app.e2e-spec.ts
│       │   └── jest-e2e.json
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── nest-cli.json
├── package.json
├── packages
│   └── sar
│       └── index.ts
├── pnpm-lock.yaml
├── shared-config
│   └── typescript-config
│       └── nestjs-config.json
└── tsconfig.base.json
```

## Issue Description

There are path resolution issues when using SWC and TSC builders for external libraries (outside app root).

### Expected Behavior

External library paths should resolve relative to the app root directory.

### Actual Behavior

Paths resolve relative to the current working directory instead of the app root.

## Steps to Reproduce

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Run `nest start` (builds successfully initially)
4. Change builder to TSC in nest-cli.json
5. Run `nest start` - Notice nested build output structure:
   ```
   └── apps
       └── api
           ├── apps
           │   └── api
           │       └── src
           │           ├── main.js
           │           └── ...
   ```
6. Update `apps/api/tsconfig.build.json` outDir to `../../dist`
7. Run `nest start` - Nesting fixed but path issues remain:
   ```
   ├── packages
   │   └── sar
   │       ├── index.js
   │       └── index.js.map
   └── tsconfig.build.tsbuildinfo
   ```
8. Switch back to SWC builder in nest-cli.json
9. Run `nest start` - Get flat structure but error:
   ```
   └── dist
       ├── apps
       │   └── api
       │   └── src
       │       ├── main.js
       │       └── ...
   ```
   Error output:
   ```
   node:internal/modules/cjs/loader:1148
     throw err;
     ^

   Error: Cannot find module '/Users/ziyadev/Desktop/repos/my-project/dist/main'
       at Module._resolveFilename (node:internal/modules/cjs/loader:1145:15)
       at Module._load (node:internal/modules/cjs/loader:986:27)
       at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
       at node:internal/main/run_main_module:28:49 {
     code: 'MODULE_NOT_FOUND',
     requireStack: []
   }

   Node.js v20.15.1
   ```

Note: main.js is located in the api/src folder
