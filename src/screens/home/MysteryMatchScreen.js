import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';

export default function MysteryMatchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.mysteryTitle}>BLIND DATE WITH A BOOK</Text>
      <Text style={styles.subheader}>Looking for a new read? No covers, no synopses.Take this quiz and find a book based on your mood.</Text>
      <View style={styles.dashedLine} />
      <View style={styles.stampButtonContainer}>
        <Image source={require('../../../assets/stamps/moriMysteryStamp.png')} style={styles.mysteryStamp}></Image>
        <TouchableOpacity style={styles.takeQuizButton}><Text style={styles.takeQuizText}>TAKE QUIZ</Text></TouchableOpacity>
      </View>
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  stampButtonContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },

  takeQuizButton:{
    borderColor:'black',
    borderWidth:1,
    width:100,
    padding:8,
    height:40,
    backgroundColor:'#121212',
    marginTop:150,
    marginRight:15,
  },
  takeQuizText:{
    textAlign:'center',
    color:'#FFFCCD',

  },
  container:{
    backgroundColor:'#FFFCCD',
    paddingTop:150,
    paddingHorizontal:20,
    height:'100%',
  },
  mysteryTitle:{
    fontFamily:theme.fonts.bold,
    fontSize:28,
    paddingRight:150,
    

  },
  subheader:{
    fontFamily:theme.fonts.regular,

  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'dashed',
    width: '100%',
    marginVertical: 12,
  },
  mysteryStamp:{
    width:230,
    height:198,
  },

});