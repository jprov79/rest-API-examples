"use strict";

module.exports.register = (app, pool) => {
    app.get('/api/emp', async (req, res) => {
        let query;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + req);
        if (req.query.name) {
            let _name = req.query.name;
            query = pool.query(
                'select * from rest_emp where name = ?',
                [_name]
            );
        } else {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>9");
            query = pool.query(
                'SELECT * FROM rest_emp'
            );
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>90");
        console.log(query);
        const emps = await query;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>900");
        res.status(200).send(JSON.stringify(emps)).end();
    });
    app.get('/api/emp/:id', async (req, res) => {
        let _id = req.params.id;
        const query = pool.query(
            'select * from rest_emp where id = ?',
            [_id]
        );
        const emps = await query;
        res.status(200).send(JSON.stringify(emps)).end();
    });
    app.post('/api/emp', async (req, res) => {
        let _name = req.body.name;
        let _phone = req.body.phone;
        let _email = req.body.email;
        let _address = req.body.address;

        const query = pool.query(
            'insert into rest_emp(name, phone, email, address) values (?, ?, ?, ?)',
            [_name, _phone, _email, _address]
        );
        const emps = await query;
        res.status(200).send('Employee added successfully!').end();
    });
};
