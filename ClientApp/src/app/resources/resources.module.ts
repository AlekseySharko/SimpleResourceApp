import {NgModule} from "@angular/core";
import {ResourcesComponent} from "./resources.component";
import {ResourcesRoutingModule} from "./resources-routing.module";
import {MatTableModule} from "@angular/material/table";
import {ResourceProviderService} from "./services/resource-provider.service";
import {CommonModule} from "@angular/common";
import { ResourcesButtonControlComponent } from './resources-button-control/resources-button-control.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { FormResourceComponent } from './form-resource/form-resource.component';
import {DialogMessageHandlerService} from "./services/dialog-message-handler.service";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatDialogModule} from "@angular/material/dialog";
import {CommonDialogsModule} from "../shared/common-dialogs/common-dialogs.module";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    ResourcesComponent,
    ResourcesButtonControlComponent,
    FormResourceComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonDialogsModule,
    ResourcesRoutingModule,
  ],
  providers: [
    ResourceProviderService,
    DialogMessageHandlerService
  ]
})
export class ResourcesModule {

}
