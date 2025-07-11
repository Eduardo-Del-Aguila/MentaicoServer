const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { poolPromise, sql } = require('../db/sql');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM Users WHERE Email = @email');

        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'Correo ya registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .query(`INSERT INTO Users (Username, Email, PasswordHash)
                    VALUES (@username, @email, @password)`);

            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error en el servidor', details: err.message });
        }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Email = @email');

        const user = result.recordset[0];
        if (!user) return res.status(401).json({ message: 'Correo no encontrado' });

        const valid = await bcrypt.compare(password, user.PasswordHash);
        if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.UserID, email: user.Email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({
            message: 'Login exitoso',
            token,
            userID: user.UserID,
            name: user.Username 
        });

    } catch (err) {
        res.status(500).json({ error: 'Error en login', details: err.message });
    }
};
