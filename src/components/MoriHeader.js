import {StyleSheet,View, Text} from 'react-native';
import { theme } from '../constants/theme';

export default function MoriHeader(){
    return(
        <View style={styles.headerContainer}>
            <View style={styles.solidLine}></View>
            <View style={styles.textContainer}>
                <Text style={styles.moriHeaderTitle}>MORI</Text> 
                <Text style={styles.moriHeaderTitle}>☆★☆</Text>
            </View>

            <View style={styles.dottedLine}></View>

        </View>
    );
}

const styles=StyleSheet.create({
    headerContainer:{
        display:"flex",
        flexDirection:"column",

    },
    solidLine:{
        borderBottomWidth: 2,
        borderColor: '#000',
        marginBottom: 6,
        width:'100%',
    },
    dottedLine:{
        borderBottomWidth: 2,
        borderColor: '#000',
        marginBottom: 6,
        borderStyle:'dotted',
        width:'500px',
    },
    textContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        fontFamily:theme.fonts.regular,
    },
    moriHeaderTitle:{
        fontFamily:theme.fonts.bold,
            letterSpacing: 2,
fontSize:20,
    paddingHorizontal: 20,

    },
}
)