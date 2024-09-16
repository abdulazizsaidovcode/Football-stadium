import Buttons from '@/components/button/button';
import Layout from '@/layout/layout';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { BASE_URL } from '@/helpers/api/api';
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import { getConfig } from '@/helpers/api/token';

interface ProfileState {
    isEditing: boolean;
    name: string;
    phone: string;
}

export class Profile extends Component<{}, ProfileState> {
    state: ProfileState = {
        isEditing: false,
        name: '',
        phone: '',
    };

    componentDidMount() {
        this.fetchMasterData();
    }

    fetchMasterData = async () => {
        const { response } = useGlobalRequest<any[]>(`${BASE_URL}/api/v1/user/me`, 'GET', getConfig());
        if (response) {
            this.setState({
                name: `${response.data.firstName} ${response.data.lastName}`,
                phone: response.data.phoneNumber,
            });
        }
        console.log(response);
    };

    render() {
        const { isEditing, name, phone } = this.state;
        return (
            <Layout scroll style={styles.container}>
                <View style={styles.profile}>
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.avatar} />
                    <Text>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.phone}>{phone}</Text>
                        <Text>{phone}</Text>
                    </Text>
                </View>
            </Layout>
        );
    }
}

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

export default Profile;
