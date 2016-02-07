'use strict';

/**
 * Module dependencies.
 */
var converter = require('xls-to-json'),
    async = require('async'),
    bsutils = require('./common.controller'),
    _ = require('lodash'),
    db = require('../config/sequelize');

var objectArrayData = {};

exports.list = function(req, res) {
    console.log('Inside PRoduct');
    res.status(200).send({
        message: 'HEY >> PRODUCTS RETURNING A RESPONSE'
    });
};

exports.upload = function (req, res){
    var uploafile = req.files;
    if(!uploafile.myFile){
        return res.status(400).send({
            message: 'Please upload a excel SpreadSheet Data with extenstion of [*.xls] '
        });
    }

    if (!bsutils.endsWith(uploafile.myFile.originalname, '.xls')) {
        res.status(400).send({
            message: 'Not a valid file, Please upload only [*.xls] files to continue.'
        });
        return;
    }

    converter({
        input: './monthlyuploads/'+ uploafile.myFile.originalname,
        output: null
    }, function(err, results) {
        if(err) {
            console.log('Error:', err);
        } else {

            /*objectArrayData = _.filter(results, function(result) { return  (result.ID_DR !=='' && result.ID_DR !== null && result.ID_DR !== undefined); });
            if(	objectArrayData.length <= 0){
                db.UploadedData.create({
                    excelJSONData: JSON.stringify(results),
                    uploadedUserID: userid,
                    uploadedStatus: 'The Uploaded Data is Invalid Data'
                }).success(function (uploadCreated){ }).error( function (error){ console.log('Error:', error);});
                objectArrayData = null;
            }else{
                db.UploadedData.create({
                    excelJSONData: JSON.stringify(results),
                    uploadedUserID: userid,
                    uploadedStatus: '{The Uploaded Data is Valid Data}'
                }).success(function (uploadCreated){ }).error( function (error){ console.log('Error:', error);});
            }*/
        }
        return	res.status(200).send(objectArrayData);
    });
};