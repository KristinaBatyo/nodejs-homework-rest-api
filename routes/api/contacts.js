const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");
const {schemas} = require("../../models/contact");

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

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateFavoriteById
);

module.exports = router;
