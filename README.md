# redux-feature-generator
Generate redux feature code with the npm command line. Eventually this library will be capable of generating code files in JavaScript or TypeScript in various frameworks including React, and Redux.

## Installation
`npm install -g redux-feature-generator`

## Check Installation
`generate-feature -v`

## Usage
`generate-feature <featureName>`
`generate-feature <featureName> <path/to/features/folder>`

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
* 1.3.1         Added the ability to pass a folder path to the program to generate the files in a specified path
* 1.2.4         Added testing to code with no major changes to functionality
* 1.1.1         Code refactor patch level added unit tests
* 1.1.0         Added version command option for testing install
* 1.0.1         First working global CLI implementation; bug fixes

## Testing Releases
* 0.1.1-rc.3  Command line argument parsing done manually
* 0.0.3       Hello World

## Contribute
This project is open-source and can be contributed to by creating a PR on the GitHub page. Follow the instructions there for submitting a PR.

## Running Tests
You will need to run and write tests for any unit you add to the code base.

`yarn test`