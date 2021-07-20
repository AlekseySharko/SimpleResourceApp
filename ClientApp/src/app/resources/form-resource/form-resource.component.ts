import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogMessageHandlerService} from "../services/dialog-message-handler.service";
import {Resource} from "../classes/resource";
import {ResourceProviderService} from "../services/resource-provider.service";
import {Subscription} from "rxjs";

export class FormResourceData {
  isEdit: boolean = false;
  resource: Resource = new Resource();
}


@Component({
  selector: 'app-form-resource',
  templateUrl: './form-resource.component.html',
  styleUrls: ['./form-resource.component.css']
})
export class FormResourceComponent implements OnInit {
  localResource: Resource = new Resource();
  resourceSubscription = new Subscription();

  constructor(private dialogRef: MatDialogRef<FormResourceComponent>,
              private errorHandler: DialogMessageHandlerService,
              private resourceProvider: ResourceProviderService,
              @Inject(MAT_DIALOG_DATA) public data: FormResourceData) { }

  ngOnInit(): void {
    this.localResource.resourceId = this.data.resource?.resourceId;
    this.localResource.value = this.data.resource?.value;
  }

  onSubmit() {
    let observable;
    if(this.data.isEdit) {
      observable = this.resourceProvider.putResources(this.localResource);
    } else {
      observable = this.resourceProvider.postResources(this.localResource);
    }
    this.resourceSubscription = observable.subscribe(
      () => {},
      error => {
        this.errorHandler.onHttpError(error);
        this.dialogRef.close();
      },
      () => this.dialogRef.close(true)
    );
  }
  onCancel() {
    this.dialogRef.close();
  }
}
