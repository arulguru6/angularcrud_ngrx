import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addAssociate } from 'src/app/Store/Associate/Associate.Action';
import { Associates } from 'src/app/Store/Model/Associate.model';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.css']
})
export class AddassociateComponent implements OnInit {

  title = 'CreateAssociate';
  isEdit = false;
  dialogData: any

  constructor(private builder: FormBuilder,
    private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {

  }


  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
  }

  ClosePopUp() {
    this.ref.close();
  }


  associateform = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('CUSTOMER'),
    group: this.builder.control('level1'),
    status: this.builder.control('true'),


  })

  SaveAssociate() {
    if (this.associateform.valid) {
      const _obj: Associates = {
        id: this.associateform.value.id as number,
        name: this.associateform.value.name as string,
        email: this.associateform.value.email as string,
        phone: this.associateform.value.phone as string,
        associategroup: this.associateform.value.group as string,
        address: this.associateform.value.address as string,
        type: this.associateform.value.type as string,
        status: this.associateform.value.status as unknown as boolean
      }
      if (_obj.id === 0) {
        this.store.dispatch(addAssociate({ inputdata: _obj }))
      }
      this.ClosePopUp();

    }
  }

}
