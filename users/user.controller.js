const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { createUser, getUsers, getUsersById, updateUser, deleteUser, getUserByUserEmail } = require('./user.service');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser : (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (error, results) => {
            if(error)
            {
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
    getUsersById : (req, res) => {
        const id = req.params.id;
        getUsersById(id, (error, results) => {
            if(error)
            {
                console.log(error);
                return;
            }
            if(!results)
            {
                return res.json({
                    success : 0,
                    message : "Record Not Found"
                });
            }
            return res.json({
                success : 1,
                data : results
            });
        });
    },
    getUsers : (req, res) => {
        getUsers((error, results) => {
            if(error)
            {
                console.log(error);
                return;
            }
            return res.json({
                success : 1,
                data : results
            });
        });
    },
    updateUser : (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (error, results) => {
            if(error)
            {
                console.log(error);
                return error;
            }
            return res.json({
                success : 1,
                message : "Updated Successfully"
            });
        });
    },
    deleteUser : (req, res) => {
        const data = req.body;
        deleteUser(data, (error, results) => {
            if(error)
            {
                console.log(error);
                return;
            }
            if(!results)
            {
                return res.json({
                    success : 0,
                    message : "User Not Found"
                });
            }
            return res.json({
                success : 1,
                message : "User Deleted Successfully!"
            });
        });
    },
    getUserByUserEmail : (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (error, results) => {
            if(error)
            {
                console.log(error);
                return;
            }
            if(!results)
            {
                return res.json({
                    success : 0,
                    message : "Incorrect Email or Password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result)
            {
                results.password = undefined;
                const jsonwebtoken = sign( {result : results}, "qwe1234", {
                    expiresIn : "1h"
                });
                return res.json({
                    success : 1,
                    message : "Login Successful",
                    token : jsonwebtoken
                });
            }
            else
            {
                return res.json({
                    success : 0,
                    data : "Incorrect Email or Password"
                });
            }
        });

    }
};