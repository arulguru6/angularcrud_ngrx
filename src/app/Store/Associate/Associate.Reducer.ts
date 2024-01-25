import { createReducer, on } from "@ngrx/store";
import { AssociateState } from "./Associate.state";
import { addAssociateSuccess, loadAssociateFailure, loadAssociateSuccess } from "./Associate.Action";

const _AssociateReducer = createReducer(AssociateState,
  on(loadAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: ''
    }
  }),
  on(loadAssociateFailure, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errormessage
    }
  }),
  on(addAssociateSuccess, (state, action) => {
    const _maxid = Math.max(...state.list.map(o => o.id));
    const _newdata = { ...action.inputdata };
    _newdata.id = _maxid + 1;
    return {
      ...state,
      list: [...state.list, _newdata],
      errormessage: ''
    }
  }),

)

export function AssociateReducer(state: any, action: any) {
  return _AssociateReducer(state, action);
}
