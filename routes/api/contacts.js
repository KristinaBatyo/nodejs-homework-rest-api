const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");
const schemas = require("../../schemas/contacts-schemas.js");

const { validateBody } = require("../../decorators");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactsById);

router.post(
  "/",
  validateBody(schemas.contactsAddSchema),
  contactsController.addContacts
);

router.delete("/:contactId", contactsController.deleteContactsById);

router.put(
  "/:contactId",
  validateBody(schemas.contactsAddSchema),
  contactsController.updateContactsById
);

module.exports = router;
