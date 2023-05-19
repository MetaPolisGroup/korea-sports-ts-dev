import { createAction } from "@reduxjs/toolkit";
import { EAction } from "./type";

const ChangeCategory = createAction(
    EAction.CHANGE_CATEGORY,
    (payload) => ({ payload })
);

export const AuthActions = {
    ChangeCategory,

}