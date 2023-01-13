'use strict'

const res = require('express/lib/response');
const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

/**
 * Metodo para agregar usuarios
 * 
 * PARAMETROS: Nombre, Apellido, #Casa, Dirección, Teléfono, Correo, Contraseña -> #Casa, iniciales y un caracter especial <-
 */
const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.send('Record saved succesfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * Obtiene todos los usuarios
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if (data.empty) {
            res.status(404).send('No user record found');
        } else {
            data.forEach(doc => {
                const userData = new User(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().noHome,
                    doc.data().address,
                    doc.data().phone,
                    doc.data().email,
                    doc.data().password
                );
                usersArray.push(userData);
            });
            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * Obtiene un usuario en especifico
 */
const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if (!data.exists) {
            res.status(404).send('User with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await firestore.collection('users').doc(id);
        
        await user.update(data);
        res.send('User record updated Succesfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('User deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}