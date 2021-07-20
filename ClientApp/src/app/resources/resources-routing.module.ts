import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ResourcesComponent} from "./resources.component";

const routes: Route[] = [
  {path: "", component: ResourcesComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
