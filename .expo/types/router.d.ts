/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(client)` | `/(client)/` | `/(client)/(dashboard)` | `/(client)/client` | `/(client)/explore` | `/(dashboard)` | `/(master)` | `/(master)/` | `/(master)/explore` | `/(master)/master` | `/(pages)` | `/(pages)/(client)` | `/(pages)/(client)/(dashboard)` | `/(pages)/(client)/client` | `/(pages)/(dashboard)` | `/(pages)/(master)/master` | `/(pages)/client` | `/(pages)/master` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(client)` | `/(tabs)/(client)/` | `/(tabs)/(client)/explore` | `/(tabs)/(master)` | `/(tabs)/(master)/` | `/(tabs)/(master)/explore` | `/(tabs)/explore` | `/..\components\button\button` | `/..\components\navigation\NavigationMenu` | `/..\components\welcome\welcome` | `/..\layout\layout` | `/..\types\button\button` | `/..\types\root\root` | `/_sitemap` | `/client` | `/explore` | `/master`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
