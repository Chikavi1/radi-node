module.exports.increment = async function (model, id, points = 1) {

    let result = await model.findOne({where: {id: id, "status": {[Op.ne]: 0}}, attributes: ['score']});

    result.score = result.score + points;

    model.update(result, {where: {id: id, "status": {[Op.ne]: 0}}}).then(data => {
        return data;
    }).catch(err => {
        return err;
    })

}

module.exports.decrement = async function (model, id, points = 1) {

    let result = await model.findOne({where: {id: id, "status": {[Op.ne]: 0}}, attributes: ['score']});

    result.score = result.score - points;

    model.update(result, {where: {id: id, "status": {[Op.ne]: 0}}}).then(data => {
        return data;
    }).catch(err => {
        return err;
    })

}