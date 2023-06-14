const { HttpError } = require("../helpers");
const {Contact} = require("../models/contact")
const { ctrlWrapper } = require("../decorators");



const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner })
    .skip(skip)
    .limit(limit)
    .populate("owner", "name email");

  res.json(result);

};

const getContactsById = async (req, res) => {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
        if (!result) {
            throw HttpError(404, `Contact with ${contactId} not found`);
        }
        res.json({ result });
}

const addContacts = async (req, res) => {
  const { _id: owner } = req.user;
        const result = await Contact.create({...req.body, owner});
        res.status(201).json(result)

};

const updateContactsById = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
      }
      res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const deleteContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({
    message: "Delete succes",
  });
}

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContacts: ctrlWrapper(addContacts),
  updateContactsById: ctrlWrapper(updateContactsById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  deleteContactsById: ctrlWrapper(deleteContactsById),
};