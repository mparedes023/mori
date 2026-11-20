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

      {/* reading receipt portion */}
      <View style={styles.solidLine}>
        <Text style ={styles.receiptHeaderTitle}>MORI ARCHIVE DEPARTMENT</Text>
        <Text style ={styles.usernameReceipt}>@ELL3SMELLS</Text>
        <Text style={styles.receiptSubHeader}>MEMBER SINCE: NOV 2026</Text> 
      
        <View style={styles.dashedLine} />
      
      
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
    dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'dashed',
    width: '100%',
    marginVertical: 12,
  },
  solidLine:{
    marginTop:50,
    borderStyle:'solid',
    borderColor:'black',
    borderWidth:1,
    paddingTop:50,
    paddingHorizontal:5,
  },
    receiptHeaderTitle:{
textAlign:'center',
fontSize:18,
    fontFamily:theme.fonts.bold,

  },
  usernameReceipt:{
    textAlign:'center',
    fontFamily:theme.fonts.regular,
    marginTop:5,



  },
  receiptSubHeader:{
    textAlign:'center',
    fontFamily:theme.fonts.regular,
    marginTop:5,
  },

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