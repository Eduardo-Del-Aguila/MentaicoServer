const { poolPromise, sql } = require('../db/sql');

exports.saveResponse = async (req, res) => {
    const { userID, groupNumber, optionText } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('userID', sql.Int, userID)
            .input('groupNumber', sql.Int, groupNumber)
            .input('optionText', sql.NVarChar, optionText)
            .query(`INSERT INTO Responses (UserID, GroupNumber, OptionText)
                    VALUES (@userID, @groupNumber, @optionText)`);

            res.status(200).json({ message: 'Respuesta guardada correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al guardar la respuesta', details: err.message });
        }
};
