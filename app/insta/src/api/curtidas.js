const imgLike = (curtiu) => {
    return curtiu ? require('../../res/img/s2-checked.png') : require('../../res/img/s2.png');
}

const curtirFoto = (curtiu, likes) => {
    let qtd = likes;
    if (curtiu)
        qtd--;
    else
        qtd++;

    return [!curtiu, qtd];
}

export { imgLike, curtirFoto }