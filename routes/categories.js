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
    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('add_category', {
            errors: errors,
            title: 'Create Category'
        })
    } else {
        let category = new categorySchema({
            title: req.body.title,
            description: req.body.description
        })
        category.save((err, data) => {
            if (!err) {
                req.flash('success', 'Category Saved')
                res.redirect('/manage/categories')
            } else {
                res.send(err)
            }
        })

    }


});


//edit category post

categoriesRouter.post('/edit/:id', (req, res) => {
    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('edit_category', {
            errors: errors,
            title: 'Create Category'
        })
    } else {
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
                req.flash('success', 'Category updated')
                res.redirect('/manage/categories')
            } else {
                res.send(err)

            }
        })
    }


});


//delete category


categoriesRouter.delete('/delete/:id', (req, res) => {
    categorySchema.findOneAndDelete({
        _id: req.params.id
    }, (err, data) => {
        if (!err) {
            res.sendStatus(200)
            req.flash('error', 'Category deleted')
        } else {
            res.send(err)
        }
    })

})








module.exports = categoriesRouter;