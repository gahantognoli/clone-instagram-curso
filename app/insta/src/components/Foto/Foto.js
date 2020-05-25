import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import estilo from './style';


const Foto = ({ urlFoto, descricao, qtdLikes, curtirFoto, imgLike }) => {
    const [curtiu, setCurtiu] = useState(false);
    const [likes, setLikes] = useState(qtdLikes)

    const curtir = () => {
        const [estCurtiu, qtdLikes] = curtirFoto(curtiu, likes);
        setLikes(qtdLikes);
        setCurtiu(estCurtiu);
    }

    return (
        <>
            <Image
                source={{ uri: urlFoto }}
                style={estilo.imagem}
            />
            <Text style={estilo.descricao}>{descricao}</Text>
            <View style={estilo.viewLike}>
                <TouchableOpacity onPress={curtir}>
                    <Image
                        source={imgLike(curtiu)}
                        style={estilo.like} />
                </TouchableOpacity>
                <Text>curtidas: {likes}</Text>
            </View>
        </>
    )
}



export default Foto;