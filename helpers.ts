const bcrypt = require('bcryptjs');

export const cryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}