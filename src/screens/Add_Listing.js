import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Modal, TouchableOpacity, Image, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { data } from '../../data';


export default function Add_Listing({ navigation, route }) {
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
        <View style={{backgroundColor:'white'}}>
            <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', paddingLeft: 15, paddingRight: 5 ,backgroundColor:'white'}}>
                <Text style={{ width: '59%', textAlign: 'right', fontWeight: 'bold' }}>Add Listing</Text>
                <TouchableOpacity style={{ width: '35%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: '#5ED18F' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <View style = {{backgroundColor:'white'}}>
                <View style={styles.title}>
                    <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="864 Fulton Street"
                        keyboardType="default"
                    />
                </View>
                <View style={styles.Description}>
                    <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Cozy apartment, in a great area - perfect for a family."
                        keyboardType="default"
                    />
                </View>
            </View>

            <View style={{ padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        Price
                    </Text>
                    <TextInput
                        placeholder='0$'
                        keyboardType='default'
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        Filters
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filters')}>
                        <Text style={{ color: '#4A4A4A' }}>2a2b10c</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, paddingRight: 10 }}>
                <Text style={{ fontWeight: 'bold', paddingLeft: 20, }}>
                    Location
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
                    <Text style={{ paddingRight: 10, color: '#4A4A4A' }}>{title ? title : 'Unknown'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: 10, paddingRight: 10, paddingLeft: 15, paddingTop: 20 }}>
                <TouchableOpacity >
                    <Text style={{ fontWeight: 'bold', paddingBottom: 20 }}>Add Photo</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity onPress={() => setModalBtn(true)}>
                        <View style={{ padding: 18, backgroundColor: '#20C065', borderRadius: 8 }}>
                            <Image
                                style={styles.imgDetail}
                                source={require('../img/icon/imageadd.png')}
                            />
                        </View>
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
            </View>
            <View style={styles.postListing}>
                <TouchableOpacity style={styles.button1}>
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>Post Listing</Text>
                </TouchableOpacity>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    Description: {
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 30,
        borderWidth: 10,
        borderColor: '#EFEFEF',
        flexDirection: 'column',


    },
    title: {
        padding: 20,
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
        // padding: 10,
       // elevation: 2,
        backgroundColor: 'white'
    },
    buttonOpen: {
        // backgroundColor: '#F194FF',

    },
    buttonClose: {
        backgroundColor: '#2196F3',
        width: '90%',

        paddingTop: 10,
        paddingBottom: 10
    },
    textStyle: {
       // color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',


    },
    imgDetail: {
        height: 65,
        width: 65,
    },
    postListing: {
        flexDirection: 'row',
        justifyContent: 'center',
        // marginTop:50,

    },
    button1: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#20C065',
        paddingTop: 18,
        marginTop: 5,
        paddingBottom: 18,
        borderRadius: 10,
    },
    box: {

    },
    text: {
        color: '#4A4A4A',
        fontSize: 18,
        paddingBottom: 5,
    },
})