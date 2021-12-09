import { Router } from "express";

import {
  CreateUserController,
  UpdateUserController,
  AuthenticateUserController,
  GetUsersController,
  UpdateUserRoleController
} from "./controllers/users";

import {
  CreateNewsController,
  GetLastMessagesController,
  GetNewsForCategController,
  GetNewsForIdController,
  PublishNewsController,
  GetNewsForEditorController
} from "./controllers/news";

import { CreateCommentsController } from "./controllers/comments";

import { CreateVisitsController } from "./controllers/visits";

import { CreateCooperationController } from "./controllers/cooperation";

import ensureAuthenticated from "./middlewares/ensureAuthenticated";

const router = Router();

router.get("/", function (req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

//Users
router.post("/signin", new AuthenticateUserController().handle);
router.post("/users", new CreateUserController().handle);
router.put("/users", ensureAuthenticated, new UpdateUserController().handle);
router.get("/users", ensureAuthenticated, new GetUsersController().handle);
router.put("/users/:userId/:role", ensureAuthenticated, new UpdateUserRoleController().handle);

//News
router.post("/news", ensureAuthenticated, new CreateNewsController().handle);
router.get("/news", new GetLastMessagesController().handle);
router.get("/news/category/:category", new GetNewsForCategController().handle);
router.get("/news/:newsId", new GetNewsForIdController().handle);
router.get(
  "/edit/news",
  ensureAuthenticated,
  new GetNewsForEditorController().handle
);
router.post("/news/:newsId/visit", new CreateVisitsController().handle);
router.put(
  "/news/:newsId/publish",
  ensureAuthenticated,
  new PublishNewsController().handle
);

//Comments
router.post(
  "/news/:newsId/comments",
  ensureAuthenticated,
  new CreateCommentsController().handle
);

//Cooperations
router.post(
  "/cooperations",
  ensureAuthenticated,
  new CreateCooperationController().handle
);

export { router };
