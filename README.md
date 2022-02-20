# redux-feature-generator
Generate redux feature code with the npm command line. Eventually this library will be capable of gnerating code files in JavaScript or TypeScript in various frameworks including React, and Redux.

## Installation
`npm install -g redux-feature-generator`

## Usage
```{bash}
cd <my/redux/project>
generate-feature myFeature --template redux-typescript
```

## Success
```
> generate-feature customName --template redux-typescript
>
> C:\Users\chadd\Documents\VSCode\Libraries\redux-feature-generator
> Printed Files: C:\Users\chadd\Documents\VSCode\Libraries\redux-feature-generator\customName\customName.module.css
> C:\Users\chadd\Documents\VSCode\Libraries\redux-feature-generator\customName\customName.spec.ts
> C:\Users\chadd\Documents\VSCode\Libraries\redux-feature-generator\customName\CustomName.tsx
> C:\Users\chadd\Documents\VSCode\Libraries\redux-feature-generator\customName\customNameAPI.ts
> C:\Users\chadd\Documents\VSCode\Libraries\redux-feature-generator\customName\customNameSlice.ts
> Arguments Parsed Successfully
```

## Stable Releases
0.1.1-rc.3 Command line argument parsing done by hand
0.0.3 Hello World