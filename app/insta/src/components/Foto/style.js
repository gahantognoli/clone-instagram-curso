import { StyleSheet, Dimensions } from 'react-native';

const largura = Dimensions.get('screen').width;

export default StyleSheet.create({
	descricao: {
		margin: 5
	},
	imagem: {
		width: largura,
		height: largura
	},
	like: {
		width: 30,
		height: 30,
		margin: 5
	},
	viewLike: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});