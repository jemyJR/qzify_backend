const User = require('./user.model');

exports.findOne = async (filter) => {
    return await User.findOne(filter);
}
exports.findAll = async () => {
    return await User.find().select('-password');
}
exports.findById = async (id) => {
    return await User.findById(id).select('-password');
}
exports.save = async (user) => {
    if (user.id) {
        return await User.findByIdAndUpdate(user.id, user);
    }
    return await User.create(user);
};
exports.deleteById = async (id) => {
    return await User.findByIdAndDelete(id);
};

