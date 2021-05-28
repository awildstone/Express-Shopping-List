const { NotFound, EmptyInput, EmptyName, EmptyPrice, DuplicateValue } = require('./error');
const items = require('./fakeDb');

/** Check the request body has all required inputs. */
function checkRequestBody(req, res, next) {
    try {
        if (!req.body.name && !req.body.price) throw new EmptyInput('Name and Price input are required.', 400)
        if (!req.body.name) throw new EmptyName('Name input is required.', 400)
        if (!req.body.price) throw new EmptyPrice('Price input is required.', 400)
        return next()
    } catch (err) {
        return next(err)
    }
}

/** Check that the item exists in the DB. */
function checkExists(req, res, next) {
    try {
        let item = items.find( item => item.name === req.params.name)
        if (!item) throw new NotFound(`${req.params.name} not found.`, 404)
        res.locals.item = item;
        return next()
    } catch (err) {
        return next(err)
    }
}

/** Check if the new item in the request body already exists in the DB. */
function checkDuplicate(req, res, next) {
    try {
        let item = items.find( item => item.name === req.body.name)
        if (item) throw new DuplicateValue(`${item.name} already exists!`, 409)
        // res.locals.item = item;
        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = { checkRequestBody, checkExists, checkDuplicate };