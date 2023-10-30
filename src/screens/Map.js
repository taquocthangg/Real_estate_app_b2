import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from 'react'

export default function Map({ navigation }) {
    const [mapLat, setMapLat] = useState(6.841776681);
    const [mapLong, setMapLong] = useState(79.869319);
    const locationData = [
        { latitude: 6.841776681, longitude: 79.869319 ,title:"One Mission Bay",description:'Cô lô nhuê'},
        { latitude: 6.84076664, longitude: 79.871323,title:"1410 Steiner St",description:'Cô lô nhuê' },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.headerMap}>
                <TouchableOpacity onPress={() => navigation.navigate('Add_Listing')} >
                    <View style={styles.directional}>
                        <Image
                            source={require('../img/icon/backgrow.png')} // Thay đổi đường dẫn tương ứng với hình ảnh của bạn
                            style={styles.inputIcon}
                        />
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#20C065',
                        }} >Home</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 19,
                    fontWeight: 'bold',
                }}>
                    Map View
                </Text>
            </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: mapLat,
            longitude: mapLong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        {locationData.map((data, index) => (
            <Marker
            key={index}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title={data.title}
            description={data.description}
            onPress={() => navigation.navigate('Add_Listing', { title: data.title })}
            />
          ))}
        </MapView>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    containerMap: {

    },
    directional: {
        flexDirection: 'row',
        gap: 10,
        paddingRight: 80,

    },
    headerMap: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E1DEDE',
        height: 70,
        textAlign: 'center',
        
    },

})