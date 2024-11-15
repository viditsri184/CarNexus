const zod = require("zod");

const createCarBody = zod.object({
    title: zod.string(),
    description: zod.string(),
    tags: zod.array(zod.string()),
});

const updateCarBody = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    tags: zod.array(zod.string()).optional(),
});

module.exports = {createCarBody, updateCarBody};