/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(client)` | `/(client)/(dashboard)` | `/(client)/client` | `/(client)/dashboard` | `/(client)/profile` | `/(client)/stadium` | `/(dashboard)` | `/(dashboard)/MasterDashboard` | `/(master)` | `/(master)/(dashboard)/MasterDashboard` | `/(master)/(profile)/masterProfile` | `/(master)/(stadium)/stadium` | `/(master)/MasterDashboard` | `/(master)/dashboard` | `/(master)/master` | `/(master)/masterProfile` | `/(master)/profile` | `/(master)/stadium` | `/(pages)` | `/(pages)/(client)` | `/(pages)/(client)/(dashboard)` | `/(pages)/(client)/client` | `/(pages)/(dashboard)` | `/(pages)/(dashboard)/MasterDashboard` | `/(pages)/(master)/(dashboard)/MasterDashboard` | `/(pages)/(master)/(profile)/masterProfile` | `/(pages)/(master)/(stadium)/stadium` | `/(pages)/(master)/MasterDashboard` | `/(pages)/(master)/master` | `/(pages)/(master)/masterProfile` | `/(pages)/(master)/stadium` | `/(pages)/(profile)/masterProfile` | `/(pages)/(stadium)/stadium` | `/(pages)/MasterDashboard` | `/(pages)/client` | `/(pages)/master` | `/(pages)/masterProfile` | `/(pages)/stadium` | `/(profile)/masterProfile` | `/(stadium)/stadium` | `/(tabs)` | `/(tabs)/(client)` | `/(tabs)/(client)/dashboard` | `/(tabs)/(client)/profile` | `/(tabs)/(client)/stadium` | `/(tabs)/(master)` | `/(tabs)/(master)/dashboard` | `/(tabs)/(master)/profile` | `/(tabs)/(master)/stadium` | `/(tabs)/dashboard` | `/(tabs)/profile` | `/(tabs)/stadium` | `/..\helpers\global_functions\global-response\global-response` | `/MasterDashboard` | `/_sitemap` | `/client` | `/dashboard` | `/master` | `/masterProfile` | `/profile` | `/stadium`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
