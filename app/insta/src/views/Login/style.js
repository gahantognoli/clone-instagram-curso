import { StyleSheet, Dimensions } from 'react-native';

const largura = Dimensions.get('screen').width;

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    view: {
        width: largura*0.8,
    },
    input: {
        fontSize: 18
    },
    button: {
        fontSize: 18
    },
    imgLogo: {
        width: 80,
        height: 80,
        marginBottom: 20
    }
});;