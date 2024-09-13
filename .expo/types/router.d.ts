/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(client)` | `/(client)/` | `/(client)/(dashboard)` | `/(client)/client` | `/(client)/explore` | `/(dashboard)` | `/(master)` | `/(master)/` | `/(master)/explore` | `/(master)/master` | `/(pages)` | `/(pages)/(client)` | `/(pages)/(client)/(dashboard)` | `/(pages)/(client)/client` | `/(pages)/(dashboard)` | `/(pages)/(master)/master` | `/(pages)/client` | `/(pages)/master` | `/(pages)\(master)\(dashboard)\MasterDashboard` | `/(pages)\(master)\(stadium)\stadium` | `/(pages)\(master)\master` | `/(pages)\(master)\stadium` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(client)` | `/(tabs)/(client)/` | `/(tabs)/(client)/explore` | `/(tabs)/(master)` | `/(tabs)/(master)/` | `/(tabs)/(master)/explore` | `/(tabs)/explore` | `/(tabs)\(client)\profile` | `/(tabs)\(master)\dashboard` | `/(tabs)\(master)\profile` | `/(tabs)\(master)\stadium` | `/..\layout\layout` | `/_sitemap` | `/client` | `/explore` | `/master`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
