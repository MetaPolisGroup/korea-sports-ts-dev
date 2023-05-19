import { createAction } from "@reduxjs/toolkit";
import { EAction } from "./type";

const MatchesRequest = createAction(
    EAction.MATCHES_REQUEST,
    (payload) => ({ payload })
);
const MatchesFetching = createAction(
    EAction.MATCHES_FETCHING,
    (payload) => ({ payload })
);
const MatchesFailure = createAction(
    EAction.MATCHES_FAILURE,
    (error: string) => ({ payload: error })
);

export const AuthActions = {
    MatchesRequest,
    MatchesFetching,
    MatchesFailure
}