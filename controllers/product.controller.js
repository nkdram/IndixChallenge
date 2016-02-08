'use strict';

/**
 * Module dependencies.
 */
var Converter = require("csvtojson").Converter,
    async = require('async'),
    bsutils = require('./common.controller'),
    _ = require('lodash'),
    db = require('../config/sequelize');

var fs = require('fs');

var objectArrayData = {};

exports.list = function(req, res) {
    console.log('Inside Product');
    res.status(200).send({
        message: 'HEY >> PRODUCTS RETURNING A RESPONSE'
    });
};

var total = 0,completed = 0;

exports.uploadstatus = function (req, res){

    db.Product.count({ where: { id: { $ne: 0 } } }).then(function(count){
        res.status(200).send({
            data: {
                completed: count
            }
        });
    });


};

exports.upload = function (req, res){
    var uploafile = req.files;
    console.info(req.files);
    if(!uploafile.myFile){
        return res.status(400).send({
            message: 'Please upload a excel SpreadSheet Data with extenstion of [*.csv] '
        });
    }

    if (!bsutils.endsWith(uploafile.myFile.originalname, '.csv')) {
        res.status(400).send({
            message: 'Not a valid file, Please upload only [*.csv] files to continue.'
        });
        return;
    }

    var converter = new Converter({});



    converter.fromFile('./uploads/'+ uploafile.myFile.name,function(err,results){

        console.log(results);
        if(err) {
            console.log('Error:', err);
        }
        else
        {
            console.log("GETTING LENGTH OF UPLOADED CSV");
            console.log(results.length);

            if(results.length > 0)
            {
                total = results.length;
                db.Product.destroy({
                    where: {
                        id: {
                            $ne: 0
                        }
                    }
                }).then(function(afterDelete){
                    async.eachLimit(results,1000,function(item, callback){

                            //console.log("GETTING DETAILS OF :" + item.Title);
                            db.Product.create({
                                //id: item.ID,
                                prodid: item.ID,
                                title: item.Title,
                                store: item.Store,
                                price: item.Price,
                                toplevelcategory: item['Top Level Category'],
                                subcategory: item['Sub Category']
                            }).then(function (createdItems) {
                                completed+=1000;
                                callback();
                            });

                        },
                        function(err) {
                            console.log('limit done');
                            fs.unlinkSync('./uploads/'+ uploafile.myFile.name);

                        });
                    res.status(200).send({
                        message: 'upload done',
                        total: total
                    });
                });
            }
            else
            {
                res.status(200).send({
                    message: 'upload done',
                    total: 0
                });
            }
        }


    });

};