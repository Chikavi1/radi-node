module.exports = (...props) => { // Regresa true si todos los datos estan completos

    let flag = true;
    
    for (let item of props) {
        flag = !!item;

        if (!flag)
            break;
    }

    return flag;

};