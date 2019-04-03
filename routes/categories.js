let express = require('express');
let categoriesRouter = express.Router();
let mongoose = require('mongoose');
require('../models/category.js');
let categorySchema = mongoose.model('Category')

categoriesRouter.get('/', (req, res, next) => {
    categorySchema.find({}, (err, data) => {
        if (!err) {
            // console.log(data);
            res.render('categories', {
                title: 'categories',
                categories: data
            });

        } else {
            res.sendStatus(404).send('error....')

        }
    }).limit().sort([
        ['title']
    ])

});

//add category//
categoriesRouter.post('/add', (req, res) => {
    let category = new categorySchema({
        title: req.body.title,
        description: req.body.description
    })
    category.save((err, data) => {
        if (!err) {
            res.redirect('/manage/categories')
        } else {
            res.send(err)
        }
    })
});


//edit category post

categoriesRouter.post('/edit/:id', (req, res) => {
    categorySchema.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: {
            title: req.body.title,
            description: req.body.description
        }
    }, {
        new: true
    }, (err, data) => {
        if (!err) {
            res.sendStatus(200)
            res.redirect('/manage/categories')
        } else {
            res.send(err)

        }
    })
});


//delete category


categoriesRouter.delete('/delete/:id', (req, res) => {
    categorySchema.findOneAndDelete({
        _id: req.params.id
    }, (err, data) => {
        if (!err) {
            res.sendStatus(200)
        } else {
            res.send(err)
        }
    })

})








module.exports = categoriesRouter;