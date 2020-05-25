import { Platform } from 'react-native';

const efetuarLogin = async (usuario, senha) => {
    let url = "10.0.2.2";
    if (Platform.OS == "ios") url = "localhost";

    const resposta = await fetch(`http://${url}:3030/users/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            {
                userName: usuario,
                password: senha
            }
        )
    });

    if (resposta.ok) 
        return resposta.headers.get('x-access-token');
    else 
        throw new Error('Usuário ou senha inválido!');
}

export default efetuarLogin;