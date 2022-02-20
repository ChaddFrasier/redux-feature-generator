# redux-feature-generator
Generate redux feature code with the npm command line. Eventually this library will be capable of generating code files in JavaScript or TypeScript in various frameworks including React, and Redux.

## Installation
`npm install -g redux-feature-generator`

## Usage
`generate-feature <featureName>`

## Example
```
$ cd ./VSCode/Apps/pie2
$ generate-feature myfeature
Writing File: C:\Users\chadd\Documents\VSCode\Apps\pie2\src\features\myfeature\myfeature.module.css
Writing File: C:\Users\chadd\Documents\VSCode\Apps\pie2\src\features\myfeature\myfeature.spec.ts
Writing File: C:\Users\chadd\Documents\VSCode\Apps\pie2\src\features\myfeature\Myfeature.tsx
Writing File: C:\Users\chadd\Documents\VSCode\Apps\pie2\src\features\myfeature\myfeatureAPI.ts
Writing File: C:\Users\chadd\Documents\VSCode\Apps\pie2\src\features\myfeature\myfeatureSlice.ts
```

## Stable Releases       
* 1.0.1       First working global CLI implementation; bug fixes

## Testing Releases
* 0.1.1-rc.3  Command line argument parsing done by hand
* 0.0.3       Hello World