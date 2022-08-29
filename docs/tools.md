# Tools Used

## Components
[react](https://reactjs.org/)
Why?
Seems like the way engineering is moving towards is using [React Native](https://reactnative.dev/) + [React Native Web](https://necolas.github.io/react-native-web/)
Plus, the ecosystem is a lot larger in terms of packages and tooling

### Form

__NOTE: Still a WIP__
[formik](https://formik.org/docs/overview)?
[react final form](https://final-form.org)?
[yup](https://github.com/jquense/yup) for __validation__

### Table

Depends...
__If__ we need to render __a lot of data in one table/list/etc__:
[react-virtualized](https://www.npmjs.com/package/react-virtualized)
__Otherwise__, let's just go with simpe HTML table markup

Another popular option: https://react-table.tanstack.com/

## GraphQL
### Client
[urql](https://formidable.com/open-source/urql/)
Why?
Lightweight and more flexible than [Apollo Client](https://www.apollographql.com/docs/react/)
Apollo Client includes a lot, including a means to manage [local state](https://www.apollographql.com/docs/react/local-state/local-state-management/)
It's a bit weird though
The idea is you can still describe state using the GraphQL SDL but the functions to interface with it are different
If you're unsure about the tool or want a compare and contrast diagram, see [here](https://formidable.com/open-source/urql/docs/comparison/) from the makers of urql

Additionally, it seems the community enjoys the experience of urql more
[StackOverflow](https://stackoverflow.com/questions/57084996/why-should-i-use-apollo-relay-over-urql), [logrocket](https://blog.logrocket.com/why-i-finally-switched-to-urql-from-apollo-client/), Reddit (not linking because...it's Reddit...)

__NOTE: may change! Still doing research__
Looking into tools like [Nexus](https://nexusjs.org/) and [GraphQL Code Generator](https://www.graphql-code-generator.com) for automatically creating types and React hooks based off of schemas

### How do I make a query?

#### Method 1 : urql's `useQuery`
Just write it out in a string and pass it to urql's `useQuery` hook
i.e.
```typescript jsx
// someComponent.tsx
import { useQuery } from 'urql';

const MyQuery = `
query {
  rootField {
    ...
  }
}
`;

const MyComponent = () => {
  const [result, _executeQuery] = useQuery({ query: MyQuery });
  // Deconstructure some properties from result
  const { data, fetching, error } = result;

  console.log(data.rootField) // will print data
}
```

### Method 2: urql's CodeGen
1. Create a .graphql file, in `src/graphql/` with your query/mutation/etc
2. from console, `npm run generate`
3. in your code, import `@/generated/graphql-operations` and use

Example:

```typescript jsx
// someComponent.tsx
import { useMutationCreateArtistMutation } from '../generated/graphql-operations';

const MyComponent = () => {

    const [mutationResult, mutation] = useMutationCreateArtistMutation();

    const onSubmit = async () => {
        const {data, error} = await mutation({
            id: 'lorem-ipsum',
            name: 'Lorem Ipsum'
        });
        // observe data/error
        ...
    }
}
```


## Routing

[react-router](https://reactrouter.com)
Why?
Easy and simple routing package that's been around for a while and is actively developed

## State management

[redux-toolkit](https://redux-toolkit.js.org/)
Why?
[Redux](https://redux.js.org/) has been round for a while
It's relatively simple to pick up and the toolkit leverages popular design patterns proven to work (similar to [ReDucks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/))

## Testing
### Unit Testing
[Jest](https://jestjs.io/)
Jest is great for unit testing (both utility modules and components through using a library like [Testing Library](https://testing-library.com/))

### End to End Testing
[Cypress](https://www.cypress.io/)
Cypress makes end to end testing feel like unit testing without the hassle of tools like Selenium or other web-drivers

### Mocking Server
~[MirageJS](https://miragejs.com/)~
MirageJS was once considered for mocking the GraphQL layer but proved to be an unintuitive process.

## Tooling
### Package Management
[npm](npmjs.com/)
just regular 'ole npm (no [yarn](https://yarnpkg.com/))
why? keep things simple. yarn does have faster installation times, but we don't need to be constantly installing dependencies. plus, snowpack is very fast at building.

Here's a [handy guide](https://www.sitepoint.com/npm-guide/) if you're new to npm

[dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/about-dependabot-version-updates) for **package security**
Dependabot will automatically make PRs with any dependency that has been updated
Right now it's on a daily schedule and updates packages to the latest version

### Developing and Building for Production
[webpack](https://webpack.js.org/)
Why?
tl;dr - Webpack is a time-tested tool that works on multiple platforms

More details:
Originally this template was built using [Snowpack](https://snowpack.dev/)
Snowpack approached the developer experience differently, using ESM when running a development server for a way faster experience
However, building for production was rough
By default it uses [esbuild](https://esbuild.github.io/), which did look awesome at the time, but it was still at an early stage
Even the Snowpack docs advised against this

> However, esbuild is still young and [not yet production-ready](https://esbuild.github.io/faq/#production-readiness). At the moment, we only recommended this for smaller projects.
> ...
> For now, we recommend using @snowpack/plugin-webpack until our built-in optimize support is more mature.

I tried using their webpack plugin but there were [system errors](https://github.com/snowpackjs/snowpack/issues/3630) when running the build scripts in Docker
This _needs_ to run in Docker since that's what we use for spinning up environments

At this point I tried taking a hybrid approach of Snowpack for development and Webpack for building
One big pain point was handling tree-shaking, specifically conditional statements that provided functionality specifically for development (like a Mirage/Mocking server)
Another pain point was how the two tools respected TypeScript config files (tsconfig.json)
React 17 introduced a [new JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) function with a few benefits including not having to write `import React from 'react'` at the top of every file
Sounds great right?
One less thing to worry about
And this was simple to include; just a small tweak in the TypeScript confg
However, Snowpack did not seem to respect the changes and thus was failing
It was time to throw in the towel

Snowpack is a great tool for simple projects or projects not using Docker for deploys (i.e. traditional scp files from '/dist' to a server) but unfortunately did not seem fit for our needs

If wondering why not just use a template like [create-react-app](https://create-react-app.dev/) (CRA), CRA makes it difficult to change the configuration
It also runs on the previous version of Webpack, does not support loading graphql files out of the box, and has numerous issues piling up (over 1k at the time of writing)

When making the webpack template, [CreateApp](https://createapp.dev/webpack/react--babel--cleanwebpackplugin--code-split-vendors--copywebpackplugin--css--cypress--html-webpack-plugin--jest--minicssextractplugin--prettier--react-hot-loader--typescript--webpack-bundle-analyzer) was used to get the basis.
Small tweaks were needed to support other things, but thankfully it's all in one file now

### Auto Formatting
[prettier](https://prettier.io/)
The current config at .prettierrc is very bare bones
See [here](https://prettier.io/docs/en/options.html) for options and their default values

__NOTE:__ There's a good chance your editor can auto-format using the configuration
Please check your editor's docs

### Linting
[eslint](https://eslint.org/)
eslint encompasses linting for both [javascript and typescript](https://github.com/palantir/tslint/issues/4534) so we don't have to worry about tslint
Right now there are two eslint configs, one for development and one that adds on a few options for code to be committed (so we're not including things like `console.log` or `debugger` statements)

__NOTE:__ There's a good chance your editor can auto-lint using the configuration
Please check your editor's docs

### Git Hooks
[husky](https://github.com/typicode/husky)
Git hooks made easy
There is one git hook already for pre-commits
It formats code, lints it, and then runs tests



### Authentication / auth0

Auth0 React Quickstart : [https://auth0.com/docs/quickstart/spa/react/01-login](https://auth0.com/docs/quickstart/spa/react/01-login)

Also provided, is a `AdminUserLoginChecker` if you would like to
 - restrict your application for a certain role ("admin")
 - store the user object and token in redux (src/state/auth)

Example: Auth Token for UrqlProvider

```typescript jsx
// App.tsx

const createClientWithToken = (token: string) => {
  return createClient({
    url: window.env.GRAPHQL_ENDPOINT,
    fetchOptions: () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }),
  });
};

const App = () => {
  const urlqConfig = createClientWithToken(useAppSelector((state) => state.auth.token)!);
  return (
    <>
      <AdminUserLoginChecker>
        <UrqlProvider value={urlqConfig}>
        ...
```
