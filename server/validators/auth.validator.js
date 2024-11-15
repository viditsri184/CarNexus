const zod = require("zod");


const register = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
});

const loginBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

module.exports = { register, loginBody };