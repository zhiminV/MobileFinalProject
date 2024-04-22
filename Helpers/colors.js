
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
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
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
        backgroundColor: 'white',
        color: "black",
        fontSize: 20,
        height: 60,
        borderColor: "#f2f7fe",
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        width: "95%",   
        marginTop: 10,
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
        fontSize: 13,
        alignSelf: 'flex-start',
        marginLeft: 10,  
    },
    iconColor:{
        color: "goldenrod",
    },
    hearderColor:{
        backgroundColor:"white",
    },
   
    Context:{
        width: 130,
        flexDirection: 'row', 
    },

    iconContaner:{
        marginRight: 20,  
    },

    cancle:{
        backgroundColor:"indianred",
    },
    save:{
        backgroundColor:"lightskyblue",
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 50,
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
        justifyContent: 'center',
        backgroundColor: "#0040ff", 
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        width: 360,
        height:50,
        marginTop:20,
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