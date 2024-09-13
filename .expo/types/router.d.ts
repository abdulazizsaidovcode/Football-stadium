/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(client)` | `/(client)/` | `/(client)/(dashboard)` | `/(client)/client` | `/(client)/explore` | `/(dashboard)` | `/(master)` | `/(master)/(dashboard)` | `/(master)/dashboard` | `/(master)/master` | `/(master)/stadium` | `/(pages)` | `/(pages)/(client)` | `/(pages)/(client)/(dashboard)` | `/(pages)/(client)/client` | `/(pages)/(dashboard)` | `/(pages)/(master)` | `/(pages)/(master)/(dashboard)` | `/(pages)/(master)/master` | `/(pages)/client` | `/(pages)/master` | `/(pages)\(master)\(dashboard)\MasterDashboard` | `/(pages)\(master)\(stadium)\stadium` | `/(pages)\(master)\stadium` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(client)` | `/(tabs)/(client)/` | `/(tabs)/(client)/explore` | `/(tabs)/(master)` | `/(tabs)/(master)/dashboard` | `/(tabs)/(master)/stadium` | `/(tabs)/dashboard` | `/(tabs)/explore` | `/(tabs)/stadium` | `/(tabs)\(client)\dashboard` | `/(tabs)\(client)\profile` | `/(tabs)\(client)\stadium` | `/(tabs)\(master)\profile` | `/_sitemap` | `/client` | `/dashboard` | `/explore` | `/master` | `/stadium`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
