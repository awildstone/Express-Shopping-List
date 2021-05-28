const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');
const middleware = require("./middleware");

/** Get all items. */
router.get('', function(req, res) {
    return res.json(items)
});

/** Create new item. */
router.post('', middleware.checkRequestBody, middleware.checkDuplicate, function(req, res) {
    let newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({added: newItem})
});

/** Get an item by name. */
router.get('/:name', middleware.checkExists, function(req, res) {
    let { item } = res.locals;
    return res.json(item)
});

/** Update an item by name. */
router.patch('/:name', middleware.checkRequestBody, middleware.checkExists, function(req, res) {
    let { item } = res.locals;
    item.name = req.body.name;
    item.price = req.body.price;
    return res.json({updated: item})
});

/** Delete an item by name. */
router.delete('/:name', middleware.checkExists, function(req, res) {
    let { item } = res.locals;
    items.splice(item, 1);
    return res.json({message: 'deleted'})
});

module.exports = router;