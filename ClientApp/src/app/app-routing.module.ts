import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: "resources", loadChildren: () => import("./resources/resources.module").then(m => m.ResourcesModule)},
  {path: "", redirectTo: "resources", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
