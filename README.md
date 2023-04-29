# BT-WEB

This project serves as the frontend application for my bachelor thesis web application.

## Initial setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Commands

```bash
# validates the code format
$ yarn prettier

# validates the code format and fixes it if possible
$ yarn prettier:fix

# validates the code and code style
$ yarn lint

# validates the code and code style and fixes it if possible
$ yarn lint:fix

# installs husky git hooks, runs automatically when running `yarn install`
$ yarn prepare

# runs Jest tests without coverage report
$ yarn test

# runs Jest tests with coverage report
$ yarn test:coverage
```

## Folder structure

Nuxt folders were moved to `src/` folder along with the `README.md` file.

## Important files

### [`.eslintrc.js`](./.eslintrc.js)

Configuration file for eslint linter.

### [`.prettierrc.json`](./.prettierrc.json)

Configuration file for prettier code formatter.

### [`commitlint.config.js`](./commitlint.config.js)

Configuration file commit messages linting before commit.

### [`jest.config.js`](./jest.config.js)

Configuration file for jest testing package.

### [`lint-staged.config.js`](./lint-staged.config.js)

Configuration file for lint-staged package, which performs set of task before commit.

### [`tailwind.config.ts`](./tailwind.config.ts)

Configuration file tailwind css styles.

### [`tsconfig.json`](./tsconfig.json)

Configuration file for typescript.

## Icons

All icons used in this project were taken from Heroicons. For more information, go to https://heroicons.com/.
