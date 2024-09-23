import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Layout from '@/layout/layout';
import Buttons from '@/components/button/button';
import { BASE_URL, file_get, user_me } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { getConfig } from '@/helpers/api/token';
import { AntDesign } from '@expo/vector-icons';

const ClientProfile = () => {
  const userMee = useGlobalRequest<any[]>(user_me, 'GET');

  useEffect(() => {
    userMee.globalDataFunc()
  }, [userMee.globalDataFunc])

  return (
    <Layout scroll style={styles.container}>
      <View style={styles.profile}>
        {userMee.response && userMee.response.attaachmentId ?
          <Image source={file_get + userMee.response.attaachmentId} style={styles.avatar} />
          : <AntDesign name="user" size={70} color="white" />

        }
        <View style={styles.profileBody}>
          <Text>
            <Text style={styles.name}>{userMee.response && userMee.response.lastName || "Network error"} </Text>
            <Text style={styles.name}>{userMee.response && userMee.response.firstName || "Network error"}</Text>
          </Text>
          <Text style={styles.phone}>{userMee.response && userMee.response.phoneNumber || "Network error"}</Text>
        </View>
      </View>
    </Layout>
  );
};

export default ClientProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  profile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    marginTop: 50,
  },
  profileBody: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  input: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: "#fff",
    minWidth: 250,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
    width: 200,
    marginTop: 5,
  },
});
