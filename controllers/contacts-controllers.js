const { HttpError } = require("../helpers");
const contactsService = require("../models/index");
const { ctrlWrapper } = require("../decorators");



const getAllContacts = async (req, res) => {
        const result = await contactsService.listContacts();
        res.json(result);

};

const getContactsById = async (req, res) => {
        const { contactId } = req.params;
        const result = await contactsService.getContactById(contactId);
        if (!result) {
            throw HttpError(404, `Contact with ${contactId} not found`);
        }
        res.json({ result });
}

const addContacts = async (req, res) => {
        const result = await contactsService.addContact(req.body)
        res.status(201).json(result)

};

const updateContactsById = async (req, res) => {
      const { contactId } = req.params;
      const result = await contactsService.updateContacts(contactId, req.body);
      if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
      }
      res.json(result);
};

const deleteContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
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
  deleteContactsById: ctrlWrapper(deleteContactsById),
};