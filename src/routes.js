"use strict";

module.exports.register = (app, database) => {

    app.get('/', async (req, res) => {
        res.status(200).send("You did it:) I am now running with Firestore! ").end();
    });

    //Ex. http://localhost:8080/api/emp
    //Ex. http://localhost:8080/api/emp?name=Demo%20User
    app.get('/api/emp', async (req, res) => {
        let ref;
        if (req.query.name) {
            let _name = req.query.name;
            ref = database.collection("rest_emp").where("name", "==", _name);
        } else {
            ref = database.collection("rest_emp");
        }
        ref.get().then((collections) => {
            let values = []
            collections.forEach((doc) => {
                values.push(doc.data());
            })
            res.status(200).send(JSON.stringify(values)).end();
        }).catch((error) => {
            console.log(error);
            res.status(500).send(JSON.stringify("Invalid Request")).end()
        });
    });

    //Ex. http://localhost:8080/api/user/SiSeyvV9A5bJXAupal4HjoODpzt2
    app.get('/api/emp/:id', async (req, res) => {
        let _id = req.params.id;
        const ref = database.collection("rest_emp").doc(_id);
        ref.get().then(doc => {
            res.status(200).send(JSON.stringify(doc.data())).end();
        })
            .catch(() => res.status(500).send(JSON.stringify("Invalid Request")).end());
    });

    //Ex. http://localhost:8080/api/user
    // {
    //     "name": "Posted User",
    // }
    app.post('/api/emp', async (req, res) => {
        let _name = req.body.name;

        const newRecord = {
            "name": _name
        }
        const ref = database.collection("rest_emp");
        ref.add(newRecord)
            .then(() => { res.status(201).send("User added successfully!"); })
            .catch(() => { res.status(500).send("Invalid Request!"); });
    });

    //Ex. http://localhost:8080/api/user
    // {
    //     "name": "Patched User",
    //     "id": "phYAzAMz8TJHzwvpWOUf"
    // }

    app.patch('/api/emp', async (req, res) => {
        let _name = req.body.name;
        let _id = req.body.id;

        const userCredential = {
            "name": _name
        }

        const ref = database.collection("rest_emp").doc(_id);
        ref.set(userCredential)
            .then(() => { res.status(201).send("User added successfully!"); })
            .catch(() => { res.status(500).send("Invalid Request!"); });
    });

};
