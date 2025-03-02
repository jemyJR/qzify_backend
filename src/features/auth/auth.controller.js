const authService = require('./auth.service');

exports.register = async function (req, res, next) {
    try {
        const newUser = req.body;
        const user = await authService.registerUser(newUser);
        res.json({
            code: 201,
            message: 'User registered successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const loginData = await authService.loginUser(email, password);
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
};

exports.refreshToken = async function (req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        const tokenData = await authService.refreshToken(refreshToken);
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
};

exports.logout = async function (req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        const message = await authService.logout(refreshToken);
        res.clearCookie('refreshToken', {
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
};

exports.changePassword = async function (req, res, next) {
    try {
        const { id } = req.user;
        const { oldPassword, newPassword } = req.body;
        await authService.changePassword(id, oldPassword, newPassword);
        res.json({
            code: 200,
            message: 'Password changed successfully',
        });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const resetPasswordEmailsent = await authService.forgotPassword(email, req.protocol, req.get('host'));

        res.json({
            message: resetPasswordEmailsent,
            email: req.body.email,
            protocol: req.protocol,
            host: req.get('host')
        })
    } catch (err) {
        next(err)
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const { newPassword, passwordConfirmation } = req.body;

        const token = await authService.resetPassword(req.params.token, newPassword, passwordConfirmation);

        if (!token) {
            return res.status(400).send({ message: "Password reset failed" });
        }
        // const jwtExpiresInS = process.env.JWT_EXPIRES_IN_S;
        // res.cookie('jwt', token, { httpOnly: true, maxAge: jwtExpiresInS })

        res.json({
            message: "Password has been reset",
            data: token
        });
    } catch (err) {
        next(err);
    }
};