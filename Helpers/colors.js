
import { StyleSheet } from 'react-native'


const colors = StyleSheet.create({

    buttonView: {
        width: "30%",
        margin: 10,
    },
    buttonsContainer: {
         flexDirection: "row",
         marginTop: 100,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenContainer:{
        flex: 1,
        backgroundColor: 'plum',
        alignItems: 'center',
        justifyContent:"flex-start",
        marginTop:"50",
    },
    input: {
        color: "darkmagenta",
        fontSize: 20,
        borderColor: "darkmagenta",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        width: "85%",   
    },
    text: { 
        color: 'purple',
        fontSize: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft:30,
        marginTop:22
    },
    errorText: {
        color: 'dimgray',
        fontSize: 18,
        alignSelf: 'flex-start',  
    },
    iconColor:{
        color: "goldenrod",
    },
    hearderColor:{
        backgroundColor:"linen",
    },
   
    Context:{
        width: 130,
        flexDirection: 'row', 
    },

    iconContaner:{
        marginLeft: 30,  
    },

    cancle:{
        backgroundColor:"crimson",
    },
    save:{
        backgroundColor:"mediumblue",
    },

    buttonText:{
        color: 'white',
        fontSize: 15,
        alignSelf:"center",
    },
    
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
})

export default colors;