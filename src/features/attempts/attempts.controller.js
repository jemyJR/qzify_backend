const AttemptsService = require('./attempts.service');
const sendErrorResponse = require('../../shared/utils/errorHandler');

class AttemptsController {
    static getAttempts(req, res) {
        try {
            const attempts = AttemptsService.getAttempts();
            res.json(attempts);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    static getAttempt(req, res) {
        try {
            const id = parseInt(req.params.id);
            const attempt = AttemptsService.getAttempt(id);
            res.json(attempt);
        } catch (err) {
            console.error(err);
            if (err.message === 'Attempt not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static createAttempt(req, res) {
        try {
            const newAttempt = AttemptsService.createAttempt(req.body);
            res.json({
                code: 201,
                message: 'Attempt created successfully',
                attempt: newAttempt
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    static updateAttempt(req, res) {
        try {
            const id = parseInt(req.params.id);
            const updatedAttempt = AttemptsService.updateAttempt(id, req.body);
            res.json({
                code: 200,
                message: 'Attempt updated successfully',
                attempt: updatedAttempt
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Attempt not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static deleteAttempt(req, res) {
        try {
            const id = parseInt(req.params.id);
            AttemptsService.deleteAttempt(id);
            res.json({
                code: 200,
                message: 'Attempt deleted successfully',
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Attempt not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = AttemptsController;

