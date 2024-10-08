import { Dimensions, Image, Keyboard, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import Input from '@/components/input/input';
import Textarea from '@/components/textarea/textarea';
import MapView, { MapPressEvent, Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { mapCustomStyle } from '@/types/map/map';
import { Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Buttons from '@/components/button/button';
import axios from 'axios'; // Import axios
import { file_get, stadium_add_attachment, stadium_delete, stadium_get, stadium_get_one } from '@/helpers/api/api';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getConfig, getConfigImg } from '@/helpers/api/token';
import { Loading } from '@/components/loading/loading';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useGlobalRequest } from '@/helpers/global_functions/global-response/global-response';
import * as ImagePicker from 'expo-image-picker';
import CenteredModal from '@/components/modal/sentralmodal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const EditStadium = () => {
  const route = useRoute();
  const { id } = route.params as { id: string | number };
  const stadium = useGlobalRequest(`${stadium_get_one}/${id}`, 'GET');
  const delStadium = useGlobalRequest(`${stadium_delete}?id=${id}`, 'DELETE',)
  const [markerPosition, setMarkerPosition] = useState<Region | null>(null);
  const [images, setImages] = useState<string[]>([]);
  // const [attachmentId, setAttachmentId] = useState<string[]>([]);
  const [details, setDetails] = useState({ toilet: false, shower: false, shop: false });
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
  const [isDelModal, setIsDelModal] = useState(false);

  const showStartPicker = () => setStartPickerVisibility(true);
  const hideStartPicker = () => setStartPickerVisibility(false);
  const showEndPicker = () => setEndPickerVisibility(true);
  const hideEndPicker = () => setEndPickerVisibility(false);

  const toggleDelModal = () => setIsDelModal(!isDelModal)

  const handleStartConfirm = (date: Date) => {
    setStartTime(date);
    hideStartPicker();
  };

  const handleEndConfirm = (date: Date) => {
    setEndTime(date);
    hideEndPicker();
  };

  useFocusEffect(
    useCallback(() => {
      stadium.globalDataFunc();
    }, [id])
  );

  useEffect(() => {
    if (delStadium.response) {
      navigation.goBack();
    }
  }, [delStadium.response])

  useEffect(() => {
    if (stadium.response) {
      const stadiumData = stadium.response;
      setFormValues({
        name: stadiumData.name || '',
        description: stadiumData.description || '',
        count: stadiumData.number ? stadiumData.number.toString() : '',
        price: stadiumData.price ? stadiumData.price.toString() : '',
        initialPay: stadiumData.initialPay ? stadiumData.initialPay.toString() : '',
        width: stadiumData.width ? stadiumData.width.toString() : '',
        height: stadiumData.length ? stadiumData.length.toString() : ''
      });

      setDetails({
        toilet: stadiumData.toilet || false,
        shower: stadiumData.shower || false,
        shop: stadiumData.shopping || false,
      });

      setMarkerPosition({
        latitude: stadiumData.lat,
        longitude: stadiumData.lang,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setStartTime(new Date(new Date().setHours(stadiumData.startHour, stadiumData.startMinute)));
      setEndTime(new Date(new Date().setHours(stadiumData.endHour, stadiumData.endMinute)));
    }
  }, [stadium.response]);


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
  }, [formValues, markerPosition]);

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permissions are required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    } else {
      console.log("Camera action was canceled or no assets were selected.");
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Media library permissions are required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    } else {
      console.log("Gallery action was canceled or no assets were selected.");
    }
  };


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
      const { data } = await axios.put(`${stadium_get}?id=${id}`, payload, config || {});
      if (data.data) {
        images.length === 0 && navigation.goBack();
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
      images.length === 0 && setIsLoading(false)
    }
  };
  const addImage = async () => {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append('photos', {
          uri: image,
          name: `photos[${index}].jpg`,
          type: 'image/jpeg',
        } as any);
      });

      formData.append('mainPhotos', images[0])

      const config = await getConfigImg()
      const { data } = await axios.post(`${stadium_add_attachment}/${id}`, formData, config || {});
      if (data.data) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error add images:', error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleSubmit = () => {
    submitStadiumPost();
    images.length !== 0 && addImage()
  }

  function formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);

    // Soat va daqiqalarni ikki raqamli formatda ko'rsatish
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }

  if (stadium.loading || isLoading || delStadium.loading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <NavigationMenu name={stadium.response && stadium.response.name} deleteIcon={true} toggleModal={() => toggleDelModal()} />
      </View>
      <ScrollView style={{ paddingHorizontal: 16 }}>
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
                  latitude: stadium.response ? stadium.response.lat : 0,
                  longitude: stadium.response ? stadium.response.lang : 0,
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
            <Text style={{ textAlign: 'center', color: colors.white, fontSize: 20, marginTop: 10 }}>Maydon rasmlari</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={{ width: '47%' }}>
                <Buttons title='Rasm yuklash' onPress={pickImageFromGallery} />
              </View>
              <View style={{ width: '47%' }}>
                <Buttons title='Rasm tushurish' onPress={pickImageFromCamera} />
              </View>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <View style={[styles.imageRow, { marginVertical: 10 }]}>
                {images.map((image, index) => (
                  <Image source={{ uri: image }} key={index} style={styles.image} />
                ))}
                {stadium.response && stadium.response.attechmentIds.map((image: string, index: number) => (
                  <Image source={{ uri: file_get + image }} key={index} style={styles.image} />
                ))}
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Buttons isDisebled={!isFormValid || true} title='Saqlash' loading={isLoading} onPress={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback >
      </ScrollView>
      <CenteredModal
        btnRedText="O'chirish"
        btnWhiteText='Orqaga'
        isFullBtn
        isModal={isDelModal}
        toggleModal={toggleDelModal}
        onConfirm={delStadium.globalDataFunc}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <MaterialCommunityIcons name="cancel" size={100} color={colors.lightGreen} />
          <Text
            style={{ fontSize: 17, color: '#fff', textAlign: "center" }}
          >
            Siz aniq bu maydoni o'chirmoqchimisiz?
          </Text>
        </View>
      </CenteredModal>
    </SafeAreaView>
  );
}

export default EditStadium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  map: {
    width: screenWidth * 1.05,
    height: screenHeight / 2,
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  image: {
    width: screenWidth / 3 - 25,
    height: screenHeight / 7,
    borderRadius: 15,
  },
});
