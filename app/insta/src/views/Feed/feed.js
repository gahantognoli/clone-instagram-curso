import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	FlatList,
	StatusBar,
	Platform
} from 'react-native';

import { Cabecalho } from '../../components/Cabecalho'
import { Foto } from '../../components/Foto';
import { Comentarios } from '../../components/Comentarios';

import { lerFotos } from '../../api/feed';
import { imgLike, curtirFoto } from '../../api/curtidas';
import adicionarComentario from '../../api/comentarios';

const Feed = () => {
	const [fotos, setFotos] = useState([]);
	let alturaStatusBar = 0;

	useEffect(() => {
		lerFotos(setFotos);
	}, []);

	return (
		<ScrollView style={{ marginTop: alturaStatusBar }}>
			<StatusBar
				backgroundColor="white"
				barStyle="dark-content"
			/>
			<FlatList
				data={fotos}
				keyExtractor={(item, index) => item.id.toString()}
				renderItem={({ item }) =>
					<>
						<Cabecalho
							nomeUsuario={item.userName}
							urlImage={item.userURL} />
						<Foto
							urlFoto={item.url}
							descricao={item.description}
							qtdLikes={item.likes}
							imgLike={imgLike}
							curtirFoto={curtirFoto} />
						<Comentarios
							comentarios={item.comentarios}
							adicionarComentario={adicionarComentario} />
					</>
				}
			/>
		</ScrollView>
	);
};

Feed.navigationOptions = ({ navigation }) => {
	const opcoes = {
		title: navigation.getParam('usuario')
    }

	if (Platform.OS == "android")
		opcoes.headerShown = false;

	return opcoes;
};

export default Feed;
