import { DocumentDefinition } from "mongoose";
import { User } from "../models/User.model";

export type DocUser = DocumentDefinition<User>;
export type PromiseUser = Promise<User>;
