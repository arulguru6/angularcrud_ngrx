import { createAction, props } from "@ngrx/store";
import { Associates } from "../Model/Associate.model";

export const LOAD_ASSOCIATE = '[associate page]load associate'
export const LOAD_ASSOCIATE_SUCCESS = '[associate page]load associate success'
export const LOAD_ASSOCIATE_FAILURE = '[associate page]load associate failure'

export const ADD_ASSOCIATE = '[associate page]add associate'
export const ADD_ASSOCIATE_SUCCESS = '[associate page]add associate success'

export const loadAssociate = createAction(LOAD_ASSOCIATE);
export const loadAssociateSuccess = createAction(LOAD_ASSOCIATE_SUCCESS, props<{ list: Associates[] }>());
export const loadAssociateFailure = createAction(LOAD_ASSOCIATE_FAILURE, props<{ errormessage: string }>());

export const addAssociate = createAction(ADD_ASSOCIATE, props<{ inputdata: Associates }>());
export const addAssociateSuccess = createAction(ADD_ASSOCIATE_SUCCESS, props<{ inputdata: Associates }>());
