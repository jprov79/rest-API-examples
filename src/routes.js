"use strict";

module.exports.register = (app, database) => {

    app.get('/', async (req, res) => {
        res.status(200).send("You did it:) I am now running with Firestore! ").end();
    });


    app.get('/api/user', async (req, res) => {
        const ref = database.collection("user").doc("test@test.com");
        ref.get().then(x => {
            res.status(200).send(JSON.stringify(x.data())).end();
        })
            .catch(() => res.status(500).send(JSON.stringify("Invalid Request")).end());
    });


    app.post('/api/user', async (req, res) => {
        let _name = req.body.name;
        let _email = req.body.email;

        const userCredential = {
            "name": _name
        }

        const ref = database.collection("user").doc(_email);
        ref.set(userCredential)
            .then(() => { res.status(201).send("User added successfully!"); })
            .catch(() => { res.status(500).send("Invalid Request!"); });
    });

};
