import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageInfos} from "../app.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  fetchImagesMeta(){
    return this.httpClient.get<ImageInfos[]>(environment.apiUrl + "/images");
  }

  validate(selectedImage: ImageInfos){
    return this.httpClient.post(environment.apiUrl + "/" + selectedImage.name, undefined);
  }
}
