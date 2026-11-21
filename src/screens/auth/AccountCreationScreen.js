import { TextInput,StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../../constants/theme';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
export default function AccountCreationScreen({navigation}){
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleAccountCreation = async () => {
    if (!email.trim() || !username.trim() || !password.trim()) {
      setError('Please fill in your email, username, and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);


    try {
      // 1. create account in firebase 
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const uid = userCredential.user.uid;
      // to get the month +year 
      const memberSince = new Date()
        .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        .toUpperCase();
      // 2. save user profile & starting receipt stats in firestore
      await setDoc(doc(db, 'users', uid), {
        username: username.trim().toLowerCase(),
        displayName: username.trim(),
        email: email.trim().toLowerCase(),
        bio: 'Tell the community a little about yourself! Share your interests, what you’re reading, or your favorite book. Tap "Edit Profile" to make this space yours.',
        memberSince,
        favouriteGenre: '---',
        currentlyReading: '---',
        stats: {
          booksRead: 0,
          tbr: 0,
          currentlyReading: 0,
          favourites: 0,
          pagesTurned: 0,
          dnf: 0,
        },
      });

      // 3. go directly into the main app once signed up
      navigation.replace('Main');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('That email is already registered.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.replace('Auth');
  };

    return(

    <View style={styles.container}>

        <Text style={styles.authTitle}>CREATE ACCOUNT</Text>
        <Text style={styles.authGreeting}>Welcome!</Text>
        <Text style={styles.authDescription}>Start tracking your books and building your personal library.</Text>
        <TextInput style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
        ></TextInput>
        <TextInput style={styles.textInput}
            placeholder="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (error) setError('');
            }}
            autoCapitalize="none"
        ></TextInput>
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
        <TouchableOpacity style={styles.authButton}  onPress={handleAccountCreation}><Text style={styles.authButtonText}>CREATE ACCOUNT</Text></TouchableOpacity>
        <View style={styles.boxAuth}>
          <Text style={styles.footerText}>Already have an account? | </Text>
          <TouchableOpacity onPress={goToLogin}>
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
  errorText: {
    color: '#8B0000',
    fontFamily: theme.fonts.bold,
    fontSize: 13,
    marginBottom: 15,
    textAlign: 'center',
  },
});