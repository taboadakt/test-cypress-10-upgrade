// For info / context, see
// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-window
export {};

declare global {
  interface Window {
    env: {
      AUTH0_CLIENT_ID: string;
      AUTH0_DOMAIN: string;
      GRAPHQL_ENDPOINT: string;
    };
  }
}
