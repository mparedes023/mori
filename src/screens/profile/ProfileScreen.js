import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';

export default function ProfileScreen({navigation}) {
    const goToLibraries = () => {
        navigation.navigate('Home');
    };
  return (
    
      <ScrollView 
      style={styles.screen} 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >



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

        <View style={styles.contentContainer}>
          <Text style={styles.itemTitle}>ITEM</Text>
          <Text style={styles.totalTitle}>TOTAL</Text>
        </View>
        <View style={styles.dashedLine} />

        <View style={styles.receiptBox}>
          <View style={styles.bookCategories}>
            <Text style={styles.bookCategoryTitle}>BOOKS READ</Text>
            <Text style={styles.bookCategoryTitle}>TO BE READ (TBR)</Text>
            <Text style={styles.bookCategoryTitle}>CURRENTLY READING</Text>
            <Text style={styles.bookCategoryTitle}>ULTIME FAVOURITES</Text>
            <Text style={styles.bookCategoryTitle}>PAGES TURNED</Text>
            <Text style={styles.bookCategoryTitle}>COULD NOT FINISH</Text>
          </View>

          <View style={styles.readingStats}>
            <Text style={styles.readingStatNumber}>123</Text>
            <Text style={styles.readingStatNumber}>124</Text>
            <Text style={styles.readingStatNumber}>146</Text>
            <Text style={styles.readingStatNumber}>123</Text>
            <Text style={styles.readingStatNumber}>24</Text>
            <Text style={styles.readingStatNumber}>14</Text>

          </View>
        </View>
        <View style={styles.dashedLine} />
        <Text style={styles.genre}>FAVOURITE GENRE: SCI-FI</Text>
        <Text style={styles.currentRead}>CURRENTLY READING: THE LOST SYMBOL</Text>
        <View style={styles.dashedLine} />
        <View style={styles.viewContainer}>
          <TouchableOpacity style={styles.viewLibrariesButton} onPress={goToLibraries}><Text style={styles.viewLibrariesText}>VIEW MY LIBRARIES →</Text></TouchableOpacity>
        </View>
      </View>
    

        </ScrollView>
  );
}

const styles=StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  viewLibrariesButton: {
    paddingVertical: 10,
  },
  viewLibrariesText: {
    fontFamily: theme.fonts.bold,
    fontSize:19,
    textDecorationLine: 'underline',
  },
  genre:{
    paddingLeft:15,
    paddingTop:15

  },
  currentRead:{
    paddingLeft:15,
    paddingVertical:15

  },
  receiptBox:{
    display:'flex',
    backgroundColor:'rgba(198, 202, 207, 0.39)',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:15,
  },
  bookCategoryTitle:{
    fontSize:19,
    lineHeight:45,
    fontFamily:theme.fonts.bold,

  },

  readingStatNumber:{
    fontSize:23,
    lineHeight:45,
    textAlign:'right',
    fontFamily:theme.fonts.bold,

  },
  contentContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10,
    
  },
  itemTitle:{
    fontFamily:theme.fonts.regular,

  },
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
    backgroundColor:'rgba(220, 224, 228, 0.39)',

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
    padding:20,
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
    width:150,
    height:150,
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