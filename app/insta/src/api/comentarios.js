const adicionarComentario = (conteudoComentario, usuario) => {
    const novoComentario = {
        date: Date.now(),
        text: conteudoComentario,
        userName: usuario
    }
    return novoComentario;
}

export default adicionarComentario;