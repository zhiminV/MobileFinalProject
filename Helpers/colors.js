
import { StyleSheet } from 'react-native'


const colors = StyleSheet.create({

    buttonView: {
        width: "35%",
        margin: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      button: {
        flex: 1,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
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
        marginBottom: 0,
        alignSelf: 'flex-start',
        marginLeft:30,
        marginTop:10
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
        marginRight: 20,  
    },

    cancle:{
        backgroundColor:"crimson",
    },
    save:{
        backgroundColor:"mediumblue",
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
  
    
})

export default colors;