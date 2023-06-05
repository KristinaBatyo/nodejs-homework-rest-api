const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../decorators")

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError)

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactsAddSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {Contact, schemas};
