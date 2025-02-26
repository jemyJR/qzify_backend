const AuthService = require('./auth.service');

class AuthController {
    static async register(req, res, next) {
        try {
            const newUser = req.body;
            const user = await AuthService.registerUser(newUser);
            res.json({
                code: 201,
                message: 'User registered successfully',
                user,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const loginData = await AuthService.loginUser(email, password);
            res.cookie('refreshToken', loginData.refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            
            res.json({
                code: 200,
                message: 'User logged in successfully',
                ...loginData,
            });
        } catch (err) {
            next(err);
        }
    }
    static async refreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
            const tokenData = await AuthService.refreshToken(refreshToken);
            res.cookie('refreshToken', tokenData.refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.json({
                code: 200,
                message: 'Token refreshed successfully',
                ...tokenData,
            });
        } catch (err) {
            next(err);
        }
    }
    static async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
            const message = await AuthService.logout(refreshToken);
            res.clearCookie('refreshToken',{
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
            res.json({
                code: 200,
                message,
            });
        } catch (err) {
            next(err);
        }
    }
    static async changePassword(req, res, next) {
        try {
            const { id } = req.user;
            const { oldPassword, newPassword } = req.body;
            await AuthService.changePassword(id, oldPassword, newPassword);
            res.json({
                code: 200,
                message: 'Password changed successfully',
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
