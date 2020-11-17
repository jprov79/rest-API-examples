"use strict";

module.exports.register = (app, database) => {

    app.get('/', async (req, res) => {
        res.status(200).send("You did it! I am now running:) ").end();
    });

    app.get('/api/emp', async (req, res) => {
        if (req.query.name) {
            let _name = req.query.name;
            database.collection('rest_emp').find({ name: _name }).toArray(function (err, result) {
                if (err)
                    throw err
                res.status(200).send(JSON.stringify(result)).end();
            })
        } else {
            database.collection('rest_emp').find({}).toArray(function (err, result) {
                if (err)
                    throw err
                res.status(200).send(JSON.stringify(result)).end();
            })
        }
    });

    app.get('/api/emp/:id', async (req, res) => {
        let _id = req.params.id;
        database.collection('rest_emp').findOne({ id: _id }, function (err, result) {
            if (err)
                throw err
            res.status(200).send(JSON.stringify(result)).end();
        })
    });

    app.post('/api/emp', async (req, res) => {
        let _name = req.body.name;
        let _phone = req.body.phone;
        let _email = req.body.email;
        let _address = req.body.address;

        database.collection('rest_emp').insertOne({ name: _name, phone: _phone, address: _address, email: _email }, function (err, result) {
            if (err)
                throw err
            res.status(200).send('Employee added successfully!').end();
        })

    });



};
