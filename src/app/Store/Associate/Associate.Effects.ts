import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import { addAssociate, addAssociateSuccess, loadAssociate, loadAssociateFailure, loadAssociateSuccess } from "./Associate.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";

@Injectable()
export class AssociateEffects {

  constructor(private actin$: Actions, private service: AssociateService) { }

  _loadassociate = createEffect(() =>
    this.actin$.pipe(
      ofType(loadAssociate),
      exhaustMap((action) => {
        return this.service.GetAllAssociate().pipe(
          map((data) => {
            return loadAssociateSuccess({ list: data })
          }),
          catchError((_error) =>
            of(loadAssociateFailure({ errormessage: _error.message }))
          )
        )
      })
    )
  );

  _addassociate = createEffect(() =>
    this.actin$.pipe(
      ofType(addAssociate),
      switchMap((action) => {
        return this.service.CreateAssociate(action.inputdata).pipe(
          switchMap((data) => {
            return of(addAssociateSuccess({ inputdata: action.inputdata }),
              showalert({ message: 'Created successfully.', resulttype: 'pass' }))
          }),
          catchError((_error) => of(showalert({ message: 'Failed to create associate', resulttype: 'fail' })))
        )
      })
    )
  )



}
