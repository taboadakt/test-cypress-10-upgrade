# Template: React, TS, and more

[![concourse.odeko.com](https://concourse.odeko.com/api/v1/teams/main/pipelines/template--react-ts-and-more-main/jobs/test/badge)](https://concourse.odeko.com/teams/master/pipelines/template--react-ts-and-more-main)

Here is a template configured w/ the following:
- TypeScript
- React
- Redux
- ThemeUI
- GraphQL (via Urql w/ codegen)
- Testing (Jest for Unit, Cypress for E2E)

## For more documentation on tooling,
- refer to [tools.md](./docs/tools.md) for a more detailed overview

The demo app is a very rough music single page app with pages to browse your music, albums, artists, and add albums and artists.
The idea behind it is you can view albums and artists and add them to your collection which is viewable on the home page

## Get up and running
- Install node v16.13.0
    - May I recommend [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if you do not have a preferred Node version manager?
        - run `nvm use` to auto-install and switch to the Node version used here
        - alternatively, look into [this section](https://github.com/nvm-sh/nvm#deeper-shell-integration) of the NVM docs to configure auto-install/switching based on the directory
- Install dependencies with `npm i`
- Start the app! `npm run start`

## Regarding CI pipelines
Download and run the [setup-concourse script](https://github.com/OdekoTeam/concourse/blob/master/resources/scripts/setup-concourse).
Why was this not included in the repo?
To guard against having multiple places to update the script.
It's inconvenient, but at least a small one where the trade-off is justifiable.

## Environment variables
Add any environment variables to the `env.js` file and reference them using `window.env.MY_VAR` in the codebase.
The reason for this approach is to prevent having multiple Docker images per environment.
If we were to use `process.env` we would have to inject any environment variables into the Dockerfile somehow since the product of this repo is a built React app.
This would result in having multiple Docker images that differ only slightly.

## Doppio Integration

__Note.__ It's a temporal section that will be removed once we update internal doppio dependencies.

Doppio relies on the `react-native-web@^0.17.0`. Some internal dependencies may load lower `react-native-web` versions.
To force Doppio using `0.17` we provide a webpack alias:
```js
// webpack.config.js
alias: {
  'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web')
}
```

In case of using yarn, a resolutions option can be used instead of aliasing 'react-native-web' dependency:
```json
{
  "name": "project",
  "dependencies": {
    "@odekoteam/doppio": "0.2.0",
    "react-native-web": "0.17.7"
  },
  "resolutions": {
    "react-native-web": "0.17.7"
  }
}
```
