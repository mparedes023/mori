import { TextInput,StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';
export default function AccountCreationScreen({navigation}){
    const handleAccountCreation=()=>{
        navigation.replace('Auth');
    };

    return(

    <View style={styles.container}>

        <Text style={styles.authTitle}>CREATE ACCOUNT</Text>
        <Text style={styles.authGreeting}>Welcome!</Text>
        <Text style={styles.authDescription}>Start tracking your books and building your personal library.</Text>
        <TextInput style={styles.textInput}
            placeholder="Username"
        ></TextInput>
        <TextInput style={styles.textInput}
            placeholder="Password"
            secureTextEntry
        >
        </TextInput>
        <TouchableOpacity style={styles.authButton}  onPress={handleAccountCreation}><Text style={styles.authButtonText}>CREATE ACCOUNT</Text></TouchableOpacity>
        <View style={styles.boxAuth}>
          <Text style={styles.footerText}>Already have an account? | </Text>
          <TouchableOpacity onPress={handleAccountCreation}>
            <Text style={styles.createAccountText}>LOGIN</Text>
          </TouchableOpacity>
        </View>

    </View>
    )
}


const styles = StyleSheet.create({
    background:{
    backgroundColor: '#D3A9C0',
    },
  container: {
    flex: 1,
    backgroundColor: '#D3A9C0',
    paddingHorizontal: 40,
    height:'100%',
        paddingTop: 100, 

  },
  authTitle:{
    fontSize:40,
    textAlign:'left',
    marginTop:60,
    lineHeight:40,
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
    backgroundColor:'#FFE0F1',
    fontSize:15,
    marginBottom:20,
    fontFamily:theme.fonts.regular,

  },
  authButton:{

    backgroundColor: '#FFF7C9',
    alignSelf: 'center',
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
  boxAuth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    textAlign:'center',
    alignItems: 'center',
    justifyContent:'center',
  },
  footerText: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
  },
  createAccountText: {
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    textDecorationLine: 'underline',

  },

});