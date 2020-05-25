import React, { useState } from 'react';
import {
    Text,
    Image,
    TextInput,
    Button,
    View,
    AsyncStorage,
    Platform
} from 'react-native';

import estilo from './style';
import efetuarLogin from '../../api/login';

const Login = ({ navigation }) => {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    const logar = async () => {
        try {
            const token = await efetuarLogin(usuario, senha);
            await AsyncStorage.setItem('meuapp_token', token);
            navigation.replace('Feed', {
                usuario
            });
        } catch (error) {
            setMensagemErro(error.message);
        }
    }

    return (
        <>
            <View style={estilo.container}>
                <Image
                    source={require('../../../res/img/instafake.png')}
                    style={estilo.imgLogo}
                />
                <View style={estilo.view}>
                    <TextInput
                        placeholder="Usuário"
                        style={estilo.input}
                        onChangeText={texto => setUsuario(texto)}
                    />
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={true}
                        style={estilo.input}
                        onChangeText={(texto) => setSenha(texto)}
                    />
                    <Text>{mensagemErro}</Text>
                </View>
                <View style={estilo.view}>
                    <Button
                        title="Entrar"
                        style={estilo.button}
                        onPress={logar} />
                </View>
            </View>
        </>
    )
};

Login.navigationOptions = () => {
    const opcoes = {
        title: 'Faça seu Login'
    }

    if(Platform.OS == "android")
        opcoes.headerShown = false;

    return opcoes;
};

export default Login;