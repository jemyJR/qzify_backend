exports.removePassword = function (user) {
    if (!user) return null;
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};

exports.removeSensitiveInfo = function (user) {
    if (!user) return null;
    const { password, tokenVersion, resetPassToken, resetPassTokenExpire, isVerified, verificationToken, verificationTokenExpire, ...userWithoutSensitiveInfo } = user.toObject();
    return userWithoutSensitiveInfo;
};