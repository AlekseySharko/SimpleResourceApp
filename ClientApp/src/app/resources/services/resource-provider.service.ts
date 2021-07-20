import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Resource} from "../classes/resource";

@Injectable()
export class ResourceProviderService {
  constructor(private http: HttpClient) { }

  public getResources(){
    return this.http.get<Resource[]>("api/resources");
  }
  public postResources(resource: Resource){
    return this.http.post("api/resources", resource);
  }
  public putResources(resource: Resource){
    return this.http.put("api/resources", resource);
  }
  public deleteResources(resource: Resource){
    return this.http.delete("api/resources/" + resource.resourceId);
  }
}
