import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Modal, TouchableOpacity, Image, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { data } from '../../data';


export default function Add_Listing({ navigation ,route }) {
    const { title } = route.params || {};
    const { Categories } = data;
    const [images, setImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalBtn, setModalBtn] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const openCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Thêm hình ảnh từ máy ảnh vào danh sách images
            setImages([...images, result.uri]);
            setModalBtn(false)
        }
    };
    const openImageLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Thêm hình ảnh vào danh sách images
            setImages([...images, result.assets[0].uri]);
            setModalBtn(false)
        }
    };

    return (
        <View>
            <View>
                <Text>Title</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        placeholder="864 Fulton Street"
                        keyboardType="default"
                    />
                </SafeAreaView>
            </View>
            <View>
                <Text>Description</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        placeholder="Cozy apartment, in a great area - perfect for a family."
                        keyboardType="default"
                    />
                </SafeAreaView>
            </View>
            <View>
                <View>
                    <Text>
                        Price
                    </Text>
                    <TextInput
                        placeholder='123$'
                        keyboardType='default'
                    />
                </View>
                <View>
                    <Text>
                        Category
                    </Text>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{
                                    marginBottom: 20,
                                    fontSize: 20,
                                    fontWeight: '500'
                                }}>Category</Text>
                                {Categories.map((category) => (
                                    <View key={category.id} style={styles.box}>
                                        <TouchableOpacity
                                            key={category.id}
                                            style={styles.box}
                                            onPress={() => {
                                                setSelectedCategory(category.name);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.text}>{category.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>
                            {selectedCategory || (Categories.length > 0 ? Categories[0].name : 'Category')}
                        </Text>
                    </Pressable>
                </View>
                <View>
                    <Text>
                        Filters
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filters')}>
                        <Text>Press Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text>
                    Location
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
                <Text>{title ? title : ''}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => setModalBtn(true)}>
                    <Text>Chọn ảnh</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalBtn}
                    onRequestClose={() => setModalBtn(false)}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            width: '100%',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                            <Button title="Mở máy ảnh" onPress={openCamera} />
                            <Button title="Mở thư viện ảnh" onPress={openImageLibrary} />
                            <Button title="Hủy" onPress={() => setModalBtn(false)} />
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={{ width: 100, height: 100, marginRight: 10 }}
                        />
                    )}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '80%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',


    },
})