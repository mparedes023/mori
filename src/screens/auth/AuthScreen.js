import { TextInput,StyleSheet, View, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import { theme } from '../../constants/theme';
import {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('Main');
    } catch (err) {
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

    const handleAccountCreation = () => {
        navigation.replace('AccountCreation');
    };

  return (

    <View style={styles.container}>

        <Text style={styles.authTitle}>SIGN IN</Text>
        <Text style={styles.authGreeting}>Welcome Back!</Text>
        <Text style={styles.authDescription}>To access your libraries, please sign in below.</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError('');
            }}
            secureTextEntry
        >
        </TextInput>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.authButton}  onPress={handleSignIn}>
          {loading ? (
          <ActivityIndicator color="#f011a2" />
          ) : (
            <Text style={styles.authButtonText}>LOGIN</Text>
          )}
        </TouchableOpacity>
        <View style={styles.boxAuth}>
          <Text style={styles.footerText}>Don’t have an account? | </Text>
          <TouchableOpacity onPress={handleAccountCreation}>
            <Text style={styles.createAccountText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: '#8B0000',
    fontFamily: theme.fonts.bold,
    fontSize: 13,
    marginBottom: 15,
    textAlign: 'center',
  },
    background:{
    backgroundColor: '#C4AADC',
    },
  container: {
    flex: 1,
    backgroundColor: '#C4AADC',
    paddingHorizontal: 40,
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