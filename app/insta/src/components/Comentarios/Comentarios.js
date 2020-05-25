import React, { useState } from 'react';
import { FlatList, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';

import estilo from './style';

const Comentarios = ({ comentarios, adicionarComentario }) => {
    let conteudoComentario = '';
    let campoComentario;
    const [estComentarios, setComentarios] = useState(comentarios)

    const comentar = () => {
        campoComentario.clear();
        const novoComentario = adicionarComentario(
            conteudoComentario, 'gahantognoli');
        setComentarios([...estComentarios, novoComentario]);
    }

    return (
        <>
            <FlatList
                data={estComentarios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={estilo.linha}>
                        <Text style={estilo.negrito}>{item.userName} </Text>
                        <Text>{item.text}</Text>
                    </View>
                }
            />
            <View style={estilo.linha}>
                <TextInput
                    onChangeText={ texto => conteudoComentario = texto }
                    ref={ textInput => campoComentario = textInput }
                    placeholder={'Deixe seu comentário...'}
                    style={estilo.input} />
                <TouchableOpacity onPress={comentar}>
                    <Image
                        source={require('../../../res/img/send.png')}
                        style={estilo.imgSend} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Comentarios;