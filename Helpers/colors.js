
import { StyleSheet } from 'react-native'


const colors = StyleSheet.create({

    buttonView: {
        width: "30%",
        margin: 10,
        alignItems: 'center',
    },
    buttonsContainer: {
         flexDirection: "row",
         marginTop: 100,
    },
    buttonText:{
        color: 'black',
        fontSize: 15,
        alignSelf:"center",
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
    signup: {
       
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        shadowColor: "#000",
        width: 250,
        height:50,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    login: {
        backgroundColor: "plum", 
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        width: 250,
        height:50,
        marginTop:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
  
    
})

export default colors;