import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import * as fs from 'fs';
import {HttpClient} from "@angular/common/http";

export interface ImageInfos {
  name: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'photo-looker';
  path = "D/Users/senred/Documents/photos/Z 50 7805382/DCIM/100NZ_50";
  allImages: ImageInfos[] | undefined;
  url = "http://localhost:8080";
  // @ts-ignore
  selectedImage: ImageInfos;
  isDataAvailable: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<ImageInfos[]>(this.url + "/hello").subscribe((data) => {
      this.allImages = data;
      this.selectedImage = this.allImages[0];
      console.log(this.selectedImage);
      this.isDataAvailable = true
    })
  }

  getUrl(imageInfos: ImageInfos) {
    return this.url + "/images/" + imageInfos.name;
  }

  showImage(imageInfos: ImageInfos) {
    console.log("opening image", imageInfos);
    this.selectedImage = imageInfos,
      this.getUrl(this.selectedImage);
  }
}


