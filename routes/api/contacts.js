const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");
const { schemas } = require("../../models/contact");

const { validateBody } = require("../../decorators");
const { authenticate, isValidId } = require("../../middlewares");
router.get("/", authenticate, contactsController.getAllContacts);

router.get("/:contactId", authenticate, isValidId, contactsController.getContactsById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactsAddSchema),
  contactsController.addContacts
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteContactsById
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactsAddSchema),
  contactsController.updateContactsById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateFavoriteById
);

module.exports = router;
