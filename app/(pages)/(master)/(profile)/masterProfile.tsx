import Buttons from '@/components/button/button';
import Layout from '@/layout/layout';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

interface ProfileState {
    isEditing: boolean;
    name: string;
    phone: string;
}

export class Profile extends Component<{}, ProfileState> {
    state: ProfileState = {
        isEditing: false,
        name: 'Гузаль Шерматова',
        phone: '+998 93 123-45-67',
    };

    toggleEdit = () => {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing,
        }));
    };

    handleNameChange = (text: string) => {
        this.setState({ name: text });
    };

    handlePhoneChange = (text: string) => {
        this.setState({ phone: text });
    };

    render() {
        const { isEditing, name, phone } = this.state;
        return (
            <Layout scroll style={styles.container}>
                <View style={styles.profile}>
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.avatar} />
                    <View style={styles.profileInfo}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={this.handleNameChange}
                            />
                        ) : (
                            <Text style={styles.name}>{name}</Text>
                        )}
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={this.handlePhoneChange}
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <Text style={styles.phone}>{phone}</Text>
                        )}
                    </View>
                    <Buttons
                        title={isEditing ? 'Save' : 'Edit'}
                        onPress={this.toggleEdit}
                    />
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
        // backgroundColor: '#333',
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
        backgroundColor: '#333',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        width: 200,
        marginTop: 5,
    },
});

export default Profile;
