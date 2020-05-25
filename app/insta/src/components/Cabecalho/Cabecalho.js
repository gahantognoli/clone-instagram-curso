import React from 'react';
import { Text, Image, View } from 'react-native'

import estilos from './style';

const Cabecalho = ({ nomeUsuario, urlImage }) => {
    return (
        <>
            <View style={estilos.container}>
                <Image
                    source={{uri: urlImage}}
                    style={estilos.fotoUsuario} />
                <Text style={estilos.negrito}>{nomeUsuario}</Text>
            </View>
        </>
    )
}

export default Cabecalho;