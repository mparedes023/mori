import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>


      <View style={styles.topRow}>
        <TouchableOpacity style={styles.editProfileButton} activeOpacity={0.8}>
          <Text style={styles.editProfileText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userBox}>
        <Image source={require('../../../assets/melody.jpg')} 
          style={styles.userImage} ></Image>
        <Text style={styles.username}>Elle</Text>
        <Text style={styles.description}>Tell the community a little about yourself! Share your interests, what you're reading, or your favorite book. Tap "Edit Profile" to make this space yours.</Text>
        <Text style={styles.stars}>☆★☆</Text>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:'#f59fd403',
    padding:30,
  },
  topRow:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 70,

  },
  editProfileButton:{
justifyContent:'flex-end',
  },
  editProfileText:{
justifyContent:'flex-end',

  },
  userBox:{
justifyContent:'center',
alignItems:'center',
  },
  userImage:{
    width:'100',
    height:'100',
    borderRadius: 50,
    marginTop:50,
    marginBottom: 5,
    borderStyle:'solid',
    borderWidth:2,
    borderColor:'black',
  },
  username:{
    textTransform:'uppercase',
    fontSize:24,
    fontFamily:theme.fonts.bold,
    marginBottom: 5,
  },
  description:{
    textAlign:'center',
    fontFamily:theme.fonts.regular,

  },
  stars:{
    marginTop:10,
  },

});