import { Dimensions, Keyboard, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import Input from '@/components/input/input';
import Textarea from '@/components/textarea/textarea';
import MapView, { MapPressEvent, Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { getUserLocation } from '@/helpers/global_functions/user_functions/user-functions';
import { useUserStore } from '@/helpers/stores/user/user-store';
import { mapCustomStyle } from '@/types/map/map';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Buttons from '@/components/button/button';
import axios from 'axios'; // Import axios
import { stadium_post_master } from '@/helpers/api/api';
import { useNavigation } from '@react-navigation/native';
import { getConfig } from '@/helpers/api/token';
import { Loading } from '@/components/loading/loading';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { getSize } from '@/constants/sizes';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AddStadium = () => {
  const [markerPosition, setMarkerPosition] = useState<Region | null>(null);
  // const [images, setImages] = useState<any[]>([]);
  // const [attachmentId, setAttachmentId] = useState<string[]>([]);
  const [details, setDetails] = useState({ toilet: false, shower: false, shop: false });
  const { setUserLocation, userLocation } = useUserStore();
  const navigation = useNavigation();
  const [isFormValid, setIsFormValid] = useState<number | "" | undefined | boolean>(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    count: '',
    price: '',
    initialPay: '',
    width: '',
    height: ''
  });
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);

  const showStartPicker = () => setStartPickerVisibility(true);
  const hideStartPicker = () => setStartPickerVisibility(false);

  const showEndPicker = () => setEndPickerVisibility(true);
  const hideEndPicker = () => setEndPickerVisibility(false);

  const handleStartConfirm = (date: Date) => {
    setStartTime(date);
    hideStartPicker();
  };

  const handleEndConfirm = (date: Date) => {
    setEndTime(date);
    hideEndPicker();
  };
  useEffect(() => {
    const validateForm = () => {
      const isValid: number | "" | undefined | boolean =
        formValues.name &&
        formValues.count &&
        formValues.description &&
        formValues.height &&
        formValues.price &&
        formValues.width && markerPosition?.latitude && markerPosition?.longitude
      setIsFormValid(isValid);
    }
    validateForm()
  }, [formValues, markerPosition])

  useEffect(() => {
    getUserLocation(setUserLocation);
  }, [setUserLocation]);

  // useEffect(() => {
  //   if (images.length > 0) {
  //     uploadImages();
  //   }
  // }, [images]);

  // const uploadImages = async () => {
  //   const uploadedIds: string[] = [];

  //   for (let i = 0; i < images.length; i++) {
  //     const data = new FormData();
  //     data.append('file', {
  //       uri: images[i],
  //       name: `image_${i}.jpg`,
  //       type: 'image/jpeg',
  //     } as any);
  //     0
  //     try {
  //       const config = await getConfigImg()
  //       const response = await axios.post(file_upload, data, config ? config : {});
  //       if (response.data.data) {
  //         uploadedIds.push(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error('File upload error:', error);
  //     }
  //   }

  //   if (uploadedIds.length > 0) {
  //     setAttachmentId(uploadedIds);
  //   }
  // };

  // const pickImageFromGallery = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Rasm tanlash uchun ruxsat kerak!");
  //     return;
  //   }
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsMultipleSelection: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled && result.assets && result.assets.length > 0) {
  //     const newImages = result.assets.map(asset => asset.uri);
  //     setImages([...images, ...newImages]);
  //   }
  // };

  // const pickImageFromCamera = async () => {
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Kamera uchun ruxsat kerak!");
  //     return;
  //   }
  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled && result.assets && result.assets.length > 0) {
  //     setImages([...images, result.assets[0].uri]);
  //   }
  // };

  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
  };

  const payload = {
    name: formValues.name,
    description: formValues.description,
    width: +formValues.width,
    length: +formValues.height,
    number: +formValues.count,
    initialPay: +formValues.initialPay,
    lat: markerPosition?.latitude,
    lang: markerPosition?.longitude,
    shower: details.shower,
    shopping: details.shop,
    toilet: details.toilet,
    startHour: startTime.getHours(),
    startMinute: startTime.getMinutes(),
    endHour: endTime.getHours(),
    endMinute: endTime.getMinutes(),
    price: formValues.price
  };

  function formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);

    // Soat va daqiqalarni ikki raqamli formatda ko'rsatish
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }

  const handleInputChange = (field: string, value: string) => {
    if (['count', 'price', 'initialPay', 'width', 'height'].includes(field)) {
      if (/^\d*\.?\d*$/.test(value)) {
        setFormValues({ ...formValues, [field]: value });
      }
    } else {
      setFormValues({ ...formValues, [field]: value });
    }
  };

  const submitStadiumPost = async () => {
    setIsLoading(true)
    try {
      const config = await getConfig()
      const { data } = await axios.post(stadium_post_master, payload, config || {});
      if (data.data) {
        navigation.goBack();
        setFormValues({
          count: '',
          description: '',
          height: '',
          initialPay: '',
          name: '',
          price: '',
          width: ''
        })
        setMarkerPosition({
          latitude: 0,
          latitudeDelta: 0,
          longitude: 0,
          longitudeDelta: 0
        })
      }
    } catch (error) {
      console.error('Error posting stadium:', error);
    } finally {
      setIsLoading(false)
    }
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: getSize('defaultPadding'), paddingVertical: 16 }}>
        <NavigationMenu name={"Maydon qo'shish"} />
      </View>
      <ScrollView style={{ paddingHorizontal: getSize('defaultPadding') }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Input
              labalVisible
              label='Maydon nomi'
              placeholder='Maydon nomini kiriting'
              value={formValues.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <Input
              labalVisible
              label='Maydon soni'
              placeholder='Maydon sonini kiriting'
              type='numeric'
              value={formValues.count}
              onChangeText={(value) => handleInputChange('count', value)}
            />
            <Input
              labalVisible
              label='Maydon narxi'
              placeholder='Maydon narxini kiriting'
              type='numeric'
              value={formValues.price}
              onChangeText={(value) => handleInputChange('price', value)}
            />
            <Input
              labalVisible
              label="Boshlang'ich to'lov"
              placeholder="Boshlang'ich to'lovni kiriting"
              type='numeric'
              value={formValues.initialPay}
              onChangeText={(value) => handleInputChange('initialPay', value)}
            />
            <Text style={[styles.label, { marginBottom: 8 }]}>Maydon manzili</Text>
            <View style={{ borderRadius: 20, overflow: 'hidden', height: screenHeight / 3, marginBottom: 12 }}>
              <MapView
                provider={PROVIDER_DEFAULT}
                style={styles.map}
                customMapStyle={mapCustomStyle}
                onPress={handleMapPress}
                showsUserLocation
                initialRegion={{
                  latitude: userLocation?.coords ? userLocation.coords.latitude : 0,
                  longitude: userLocation?.coords ? userLocation.coords.longitude : 0,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {markerPosition && (
                  <Marker coordinate={markerPosition} />
                )}
              </MapView>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '47%' }}>
                <Input
                  labalVisible
                  label='Maydon eni'
                  placeholder='Maydon enini kiriting'
                  type='numeric'
                  value={formValues.width}
                  onChangeText={(value) => handleInputChange('width', value)}
                />
              </View>
              <View style={{ width: '47%' }}>
                <Input
                  labalVisible
                  label='Maydon uzunligi'
                  placeholder='Maydon uzunligini kiriting'
                  type='numeric'
                  value={formValues.height}
                  onChangeText={(value) => handleInputChange('height', value)}
                />
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={[styles.label, { marginBottom: 8 }]}>Maydon ta'riffi</Text>
              <Textarea
                onChangeText={(value) => handleInputChange('description', value)}
                placeholder="Maydon ta'riffini kiriting"
                value={formValues.description}
              />
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.inDarkGreen, padding: 10, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <FontAwesome5 name="toilet" size={24} color="white" />
                  <Text style={[styles.label]}>Hojathona</Text>
                </View>
                <Switch
                  onValueChange={() => setDetails({ ...details, toilet: !details.toilet })}
                  value={details.toilet}
                  trackColor={{ false: "#767577", true: colors.lightGreen }}
                  thumbColor={'#fff'}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.inDarkGreen, padding: 10, borderRadius: 10, marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Entypo name="shop" size={24} color="white" />
                  <Text style={[styles.label]}>Do'kon</Text>
                </View>
                <Switch
                  onValueChange={() => setDetails({ ...details, shop: !details.shop })}
                  value={details.shop}
                  trackColor={{ false: "#767577", true: colors.lightGreen }}
                  thumbColor={'#fff'}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.inDarkGreen, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <MaterialIcons name="shower" size={24} color="white" />
                  <Text style={[styles.label]}>Yuvinish honasi</Text>
                </View>
                <Switch
                  onValueChange={() => setDetails({ ...details, shower: !details.shower })}
                  value={details.shower}
                  trackColor={{ false: "#767577", true: colors.lightGreen }}
                  thumbColor={'#fff'}
                />
              </View>
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={{ width: '47%' }}>
                <Buttons title='Загрузить фото' onPress={pickImageFromGallery} />
              </View>
              <View style={{ width: '47%' }}>
                <Buttons title='Сделать фото' onPress={pickImageFromCamera} />
              </View>
            </View>
            <View style={[styles.imageRow, { marginVertical: 10 }]}>
              {images.map((image, index) => (
                <Image source={{ uri: image }} key={index} style={styles.image} />
              ))}
            </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ width: '47%' }}>
                <Text style={[styles.label]}>Maydon ochilish vaqti</Text>
                <Pressable onPress={showStartPicker} style={{ padding: 12, backgroundColor: colors.inDarkGreen, borderRadius: 10, marginTop: 10 }}>
                  <Text style={{ textAlign: 'center', color: colors.white, fontSize: 16 }}>{formatTime(`${startTime.getHours()}:${startTime.getMinutes()}`)}</Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isStartPickerVisible}
                  mode="time"
                  onConfirm={handleStartConfirm}
                  onCancel={hideStartPicker}
                  date={startTime}
                />
              </View>
              <View style={{ width: '47%' }}>
                <Text style={[styles.label]}>Maydon yopilishi vaqti</Text>
                <Pressable onPress={showEndPicker} style={{ padding: 12, backgroundColor: colors.inDarkGreen, borderRadius: 10, marginTop: 10 }}>
                  <Text style={{ textAlign: 'center', color: colors.white, fontSize: 16 }}>{formatTime(`${endTime.getHours()}:${endTime.getMinutes()}`)}</Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isEndPickerVisible}
                  mode="time"
                  onConfirm={handleEndConfirm}
                  onCancel={hideEndPicker}
                  date={endTime}
                />
              </View>
              {/* <View style={{ width: '47%' }}>
                <Text style={[styles.label]}>End Time</Text>
                <Buttons title="Set End Time" onPress={showEndPicker} />
                <DateTimePickerModal
                  isVisible={isEndPickerVisible}
                  mode="time"
                  onConfirm={handleEndConfirm}
                  onCancel={hideEndPicker}
                  date={endTime}
                />
              </View> */}
            </View>
            <View style={{ marginVertical: 20 }}>
              <Buttons isDisebled={!isFormValid || true} title='Saqlash' loading={isLoading} onPress={submitStadiumPost} />
            </View>
          </View>
        </TouchableWithoutFeedback >
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddStadium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
  },
  label: {
    color: "white",
    fontSize: getSize('smallText'),
  },
  map: {
    width: screenWidth * 1.05,
    height: screenHeight / 2,
  },
  // imageRow: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   gap: 10,
  // },
  // image: {
  //   width: screenWidth / 3 - 25,
  //   height: screenHeight / 7,
  //   borderRadius: 15,
  // },
});
