module.exports = function (model, body) { // Regresa true si todos los datos estan completos, regresa un arreglo con los props nulos

    let fields_empty = [];

    for (let key_model of Object.keys(model)) {

        if (!body[key_model] && key_model !== 'id' && key_model !== "createdAt" && key_model !== "updatedAt")
            fields_empty.push(key_model);
        
    }

    return !(fields_empty.length) ? true : fields_empty;

};