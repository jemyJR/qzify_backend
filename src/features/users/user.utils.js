const removePassword = (user) => {
    if (!user) return null;
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};

module.exports = { removePassword };