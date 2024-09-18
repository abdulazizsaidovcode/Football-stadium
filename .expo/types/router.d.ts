/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(add-stadium)/add-stadium` | `/(auth)/(check-code)/check-code` | `/(auth)/(login)/login` | `/(auth)/(register)/getInfo` | `/(auth)/(register)/register` | `/(auth)/check-code` | `/(auth)/getInfo` | `/(auth)/login` | `/(auth)/register` | `/(check-code)/check-code` | `/(client)` | `/(client)/(dashboard)/dashboard` | `/(client)/dashboard` | `/(client)/history` | `/(client)/ordersDay` | `/(client)/profile` | `/(dashboard)/MasterDashboard` | `/(dashboard)/dashboard` | `/(edit-stadium)/edit-stadium` | `/(history)/(client)/history` | `/(history)/(master)/history` | `/(history)/history` | `/(login)/login` | `/(maps)/(stadium-locations)/stadium-locations` | `/(maps)/stadium-locations` | `/(master)` | `/(master)/(add-stadium)/add-stadium` | `/(master)/(dashboard)/MasterDashboard` | `/(master)/(edit-stadium)/edit-stadium` | `/(master)/(order)/order` | `/(master)/(profile)/masterProfile` | `/(master)/(stadium)/(add-stadium)/add-stadium` | `/(master)/(stadium)/(edit-stadium)/edit-stadium` | `/(master)/(stadium)/add-stadium` | `/(master)/(stadium)/edit-stadium` | `/(master)/(stadium)/stadium` | `/(master)/MasterDashboard` | `/(master)/add-stadium` | `/(master)/dashboard` | `/(master)/edit-stadium` | `/(master)/history` | `/(master)/master` | `/(master)/masterProfile` | `/(master)/order` | `/(master)/orders` | `/(master)/profile` | `/(master)/stadium` | `/(order)/(order-datails)/order-datails` | `/(order)/(order-save)/order-save` | `/(order)/(payment)/payment` | `/(order)/order` | `/(order)/order-datails` | `/(order)/order-save` | `/(order)/payment` | `/(order-datails)/order-datails` | `/(order-save)/order-save` | `/(pages)/(add-stadium)/add-stadium` | `/(pages)/(auth)/(check-code)/check-code` | `/(pages)/(auth)/(login)/login` | `/(pages)/(auth)/(register)/getInfo` | `/(pages)/(auth)/(register)/register` | `/(pages)/(auth)/check-code` | `/(pages)/(auth)/getInfo` | `/(pages)/(auth)/login` | `/(pages)/(auth)/register` | `/(pages)/(check-code)/check-code` | `/(pages)/(client)/(dashboard)/dashboard` | `/(pages)/(client)/dashboard` | `/(pages)/(client)/history` | `/(pages)/(dashboard)/MasterDashboard` | `/(pages)/(dashboard)/dashboard` | `/(pages)/(edit-stadium)/edit-stadium` | `/(pages)/(history)/(client)/history` | `/(pages)/(history)/(master)/history` | `/(pages)/(history)/history` | `/(pages)/(login)/login` | `/(pages)/(maps)/(stadium-locations)/stadium-locations` | `/(pages)/(maps)/stadium-locations` | `/(pages)/(master)/(add-stadium)/add-stadium` | `/(pages)/(master)/(dashboard)/MasterDashboard` | `/(pages)/(master)/(edit-stadium)/edit-stadium` | `/(pages)/(master)/(order)/order` | `/(pages)/(master)/(profile)/masterProfile` | `/(pages)/(master)/(stadium)/(add-stadium)/add-stadium` | `/(pages)/(master)/(stadium)/(edit-stadium)/edit-stadium` | `/(pages)/(master)/(stadium)/add-stadium` | `/(pages)/(master)/(stadium)/edit-stadium` | `/(pages)/(master)/(stadium)/stadium` | `/(pages)/(master)/MasterDashboard` | `/(pages)/(master)/add-stadium` | `/(pages)/(master)/edit-stadium` | `/(pages)/(master)/history` | `/(pages)/(master)/master` | `/(pages)/(master)/masterProfile` | `/(pages)/(master)/order` | `/(pages)/(master)/stadium` | `/(pages)/(order)/(order-datails)/order-datails` | `/(pages)/(order)/(order-save)/order-save` | `/(pages)/(order)/(payment)/payment` | `/(pages)/(order)/order` | `/(pages)/(order)/order-datails` | `/(pages)/(order)/order-save` | `/(pages)/(order)/payment` | `/(pages)/(order-datails)/order-datails` | `/(pages)/(order-save)/order-save` | `/(pages)/(payment)/payment` | `/(pages)/(profile)/masterProfile` | `/(pages)/(register)/getInfo` | `/(pages)/(register)/register` | `/(pages)/(stadium)/(add-stadium)/add-stadium` | `/(pages)/(stadium)/(edit-stadium)/edit-stadium` | `/(pages)/(stadium)/add-stadium` | `/(pages)/(stadium)/edit-stadium` | `/(pages)/(stadium)/stadium` | `/(pages)/(stadium-locations)/stadium-locations` | `/(pages)/MasterDashboard` | `/(pages)/add-stadium` | `/(pages)/check-code` | `/(pages)/dashboard` | `/(pages)/edit-stadium` | `/(pages)/getInfo` | `/(pages)/history` | `/(pages)/login` | `/(pages)/master` | `/(pages)/masterProfile` | `/(pages)/order` | `/(pages)/order-datails` | `/(pages)/order-save` | `/(pages)/payment` | `/(pages)/register` | `/(pages)/stadium` | `/(pages)/stadium-locations` | `/(payment)/payment` | `/(profile)/masterProfile` | `/(register)/getInfo` | `/(register)/register` | `/(stadium)/(add-stadium)/add-stadium` | `/(stadium)/(edit-stadium)/edit-stadium` | `/(stadium)/add-stadium` | `/(stadium)/edit-stadium` | `/(stadium)/stadium` | `/(stadium-locations)/stadium-locations` | `/(tabs)` | `/(tabs)/(client)` | `/(tabs)/(client)/dashboard` | `/(tabs)/(client)/ordersDay` | `/(tabs)/(client)/profile` | `/(tabs)/(master)` | `/(tabs)/(master)/dashboard` | `/(tabs)/(master)/orders` | `/(tabs)/(master)/profile` | `/(tabs)/(master)/stadium` | `/(tabs)/dashboard` | `/(tabs)/orders` | `/(tabs)/ordersDay` | `/(tabs)/profile` | `/(tabs)/stadium` | `/MasterDashboard` | `/_sitemap` | `/add-stadium` | `/check-code` | `/dashboard` | `/edit-stadium` | `/getInfo` | `/history` | `/login` | `/master` | `/masterProfile` | `/order` | `/order-datails` | `/order-save` | `/orders` | `/ordersDay` | `/payment` | `/profile` | `/register` | `/stadium` | `/stadium-locations`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
