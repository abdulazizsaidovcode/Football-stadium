import NavigationMenu from '@/components/navigation/NavigationMenu'
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import Layout from '@/layout/layout'
import React from 'react'
import { Text, View } from 'react-native'

export default function favourite() {
  const AddFav = useGlobalRequest(``, "GET");
  
  return (
    <Layout scroll padding>
      <NavigationMenu name='Любимый' />
        <Text>

        </Text>
    </Layout>
  )
}
