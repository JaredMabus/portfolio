# Portfolio Landing Page

A landing page for posting my projects.

## Tech Stack

- <strong>React:</strong> create-react-app, styled-components
- <strong>Python:</strong> Flask, poetry
- <strong>Docker</strong>
- <strong>Cloud:</strong> GC Run and GC Build

## Running Poetry Dev Virtual Env

`Installing Poetry`

```zsh
pip install poetry==1.1.7

# or with curl

curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

`Install Python dependencies`

```zsh
poetry install
```

`Run Virtual Env`

```zsh
# start
poetry shell

# stop
exit
```

## Start Flask dev server

`Run "main.py" default port 8000`

```zsh
python3 main.py
```

## Start Node dev server

```zsh
#start server port 3000
npm start

# compile to build folder
npm run build
```

# Docker

## Build

docker build -t portfolio-image .

## Run

docker run -it -p 8080:8080 --name portfolio-container portfolio-image /bin/sh

gunicorn -b 0.0.0.0:8080 main:app

docker run -it -p 8080:8080 -v $(pwd)/proxy:/etc/nginx/conf.d --name portfolio-container3 portfolio-image3 /bin/sh

docker run -it -p 8080:8080 --name portfolio-container portfolio-image

# TypeScript React

## Global Types

`./types` folder Stores `.d.ts` files for global types.

## Install

```bash
npm install typescript @types/node @types/react @types/react-dom @types/jest
```

## React Type Definitions Example

- `FC`: TypeScript built in type "Function Component"

```ts
interface ExampleComponent {
  foo: number;
  bar: string;
}

const Component: React.FC<ExampleComponent> = (props) => {
  return <>{props.children}</>;
};
```

## Config Example

```ts
{
  "compilerOptions": {
    "target": "es5", // Specify ECMAScript target version
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ], // List of library files to be included in the compilation
    "allowJs": true, // Allow JavaScript files to be compiled
    "skipLibCheck": true, // Skip type checking of all declaration files
    "esModuleInterop": true, // Disables namespace imports (import * as fs from "fs") and enables CJS/AMD/UMD style imports (import fs from "fs")
    "allowSyntheticDefaultImports": true, // Allow default imports from modules with no default export
    "strict": true, // Enable all strict type checking options
    "forceConsistentCasingInFileNames": true, // Disallow inconsistently-cased references to the same file.
    "module": "esnext", // Specify module code generation
    "moduleResolution": "node", // Resolve modules using Node.js style
    "isolatedModules": true, // Unconditionally emit imports for unresolved files
    "resolveJsonModule": true, // Include modules imported with .json extension
    "noEmit": true, // Do not emit output (meaning do not compile code, only perform type checking)
    "jsx": "react", // Support JSX in .tsx files
    "sourceMap": true, // Generate corrresponding .map file
    "declaration": true, // Generate corresponding .d.ts file
    "noUnusedLocals": true, // Report errors on unused locals
    "noUnusedParameters": true, // Report errors on unused parameters
    "incremental": true, // Enable incremental compilation by reading/writing information from prior compilations to a file on disk
    "noFallthroughCasesInSwitch": true // Report errors for fallthrough cases in switch statement
  },
  "include": [
    "src/**/*" // *** The files TypeScript should type check ***
  ],
  "exclude": ["node_modules", "build"] // *** The files to not type check ***
}
```
