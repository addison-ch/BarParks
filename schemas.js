const Joi = require('joi');



module.exports.parkSchema = Joi.object({
    park: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        address: Joi.string().required(),
        // images: Joi.string().required(),
        description: Joi.string().required(),
        equipment: Joi.array().items(Joi.string()).single().required()
    })
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()

    }).required()
})