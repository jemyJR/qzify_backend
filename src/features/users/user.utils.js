exports.removeSensitiveInfo = function (user) {
    if (!user) return null;
    const { password, tokenVersion, resetPassToken, resetPassTokenExpire, isVerified, verificationToken, verificationTokenExpire, ...userWithoutSensitiveInfo } = user.toObject();
    return userWithoutSensitiveInfo;
};