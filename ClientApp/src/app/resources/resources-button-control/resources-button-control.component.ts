import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormResourceComponent} from "../form-resource/form-resource.component";
import {MatDialog} from "@angular/material/dialog";
import {Resource} from "../classes/resource";
import {AreYouSureDialogComponent} from "../../shared/common-dialogs/are-you-sure-dialog/are-you-sure-dialog.component";
import {ResourceProviderService} from "../services/resource-provider.service";
import {Subscription} from "rxjs";
import {DialogMessageHandlerService} from "../services/dialog-message-handler.service";

@Component({
  selector: 'app-resources-button-control',
  templateUrl: './resources-button-control.component.html',
  styleUrls: ['./resources-button-control.component.css']
})
export class ResourcesButtonControlComponent implements OnInit {
  @Input() resource: Resource = new Resource();
  @Output() departmentChanged: EventEmitter<any> = new EventEmitter<any>();
  deleteSubscription = new Subscription();

  constructor(private dialog: MatDialog,
              private resourceProvider: ResourceProviderService,
              private errorHandler: DialogMessageHandlerService) { }

  ngOnInit(): void {}

  onEdit() {
    const dialogRef = this.dialog.open(FormResourceComponent, {
      width: '40rem',
      minWidth: '20rem',
      data: { isEdit: true, resource: this.resource }
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.onChange();
      }
    });
  }
  onDelete() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      width: '24rem',
      minWidth: '20rem',
      data: {
        question: "Are you sure you want to delete ",
        bold: this.resource.value + '?',
        okButton: "Delete",
        cancelButton: "Cancel"
      }
    });
    dialogRef.afterClosed().subscribe(data => {
        if(data) {
          this.deleteSubscription = this.resourceProvider.deleteResources(this.resource).subscribe(
            () => {},
            error => this.errorHandler.onHttpError(error),
            () => this.departmentChanged.emit()
          )
        }
      }
    );
  }
  onChange(){
    this.departmentChanged.emit();
  }
}
