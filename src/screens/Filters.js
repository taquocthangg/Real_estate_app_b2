import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

export default function Filters({navigation}) {
  return (
    <View >
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:20,paddingLeft:10,height:80,alignItems:'center'}}>
      <View>

      </View>
      <Text style={{fontWeight:'bold',fontSize:17,paddingLeft:30}}>Filters</Text>
      <TouchableOpacity>
        <Text style={{color:'#5ED18F'}} onPress={()=>navigation.navigate('Add_Listing')} >Done</Text>
      </TouchableOpacity>

      </View>
      <View style={styles.contentFilters}>
        <View style={styles.itemFiters}>
          <Text style={styles.Texts}>Rent or Buy</Text>
          <Text style={styles.Texts}>Buy</Text>
        </View>
        <View style={styles.itemFiters}>
          <Text style={styles.Texts}>Square feet</Text>
          <Text style={styles.Texts}>500sqft - 1000 sqft</Text>
        </View>
        <View style={styles.itemFiters}>
          <Text style={styles.Texts}>Bedrooms</Text>
          <Text style={styles.Texts}>4bd</Text>
        </View>
        <View style={styles.itemFiters}>
          <Text style={styles.Texts}>Baths</Text>
          <Text style={styles.Texts}>2ba</Text>
        </View>
        <View style={styles.itemFiters}>
          <Text style={styles.Texts}>New Construction</Text>
          <Text style={styles.Texts}>Yes</Text>
        </View>
        <View style={styles.itemFiters}>
          <Text style={styles.Texts}>Year Built</Text>
          <Text style={styles.Texts}>200</Text>
        </View>
        <View style={styles.itemFiters}>
          <Text style={styles.Texts}>Close to Public Transportation</Text>
          <Text style={styles.Texts}>Yes</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentFilters:{
    flexDirection:'column'

  },
  itemFiters:{
    flexDirection:'row',
   padding:20,
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderColor:'#ccc'
  },
  Texts:{
    color:"#4A4A4A",fontSize:16
  }
})