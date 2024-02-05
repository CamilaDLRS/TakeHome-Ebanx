import cors from "cors";
import express from "express";
import { TakeHomeController } from "../services/takeHome.controller";
import { TakeHomeServices } from "../services/takeHome..services";
import { ResourceValidation } from "../middlewares/resourceValidation.middleware";
import { checkAccountId } from "../middlewares/schemas/id.schema";
import { createEventSchema } from "../middlewares/schemas/event.schema";
import { FakeDatabase } from "../database/db";


const fakeDatabase = new FakeDatabase();
const takeHomeServices = new TakeHomeServices(fakeDatabase);
const takeHomeController = new TakeHomeController(takeHomeServices);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const takeHomeRouter = express.Router();

takeHomeRouter.post(
  "/reset",
  (req, res) =>  takeHomeController.resetDatabase(req, res)
);

takeHomeRouter.get(
  "/balance",
  ResourceValidation.validateRequest(checkAccountId),
  (req, res) =>  takeHomeController.getBalance(req, res)
);

takeHomeRouter.post(
  "/event",
  ResourceValidation.validateRequest(createEventSchema),
  (req, res) =>  takeHomeController.createAccountEvent(req, res)
);

app.use(takeHomeRouter);

export default app;