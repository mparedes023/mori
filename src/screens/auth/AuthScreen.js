import { TextInput,StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';


export default function AuthScreen({ navigation }) {


// will add actual handleSignIn logic later
  const handleSignIn = () => {
    navigation.replace('Main');
  };

  return (

    <View style={styles.container}>

        <Text style={styles.authTitle}>SIGN IN</Text>
        <Text style={styles.authGreeting}>Welcome Back!</Text>
        <Text style={styles.authDescription}>To access your libraries, please sign in below.</Text>
        <TextInput style={styles.textInput}
            placeholder="Username"
        ></TextInput>
        <TextInput style={styles.textInput}
            placeholder="Password"
            secureTextEntry
        >
        </TextInput>
        <TouchableOpacity style={styles.authButton}  onPress={handleSignIn}><Text style={styles.authButtonText}>LOGIN</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    background:{
    backgroundColor: '#C4AADC',
    },
  container: {
    flex: 1,
    backgroundColor: '#C4AADC',
    paddingHorizontal: 50,
    height:'100%',
        paddingTop: 120, 

  },
  authTitle:{
    fontSize:40,
    textAlign:'left',
    marginTop:60,
    
    fontFamily:theme.fonts.bold,
    
  },
  authGreeting:{
    fontSize:20,
fontFamily:theme.fonts.bold,
  },
  authDescription:{
    fontSize:14,
fontFamily:theme.fonts.bold,
marginBottom:20,
  },
  textInput:{
    backgroundColor:'#E4D0FF',
    fontSize:15,
    marginBottom:20,
    fontFamily:theme.fonts.regular,

  },
  authButton:{

    backgroundColor: '#FFF7C9',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 24,
    shadowColor: '#2b2b2b',
    shadowOffset: { width:10, height: 10},
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6, 
  },
  authButtonText:{
    fontFamily:theme.fonts.regular,
    fontSize:15,
  },
});