import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ApiService} from "./service/api.service";

export interface ImageInfos {
  name: string;
  status: string;
  originalImageURL: string;
  thumbedImageURL: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = environment.title;
  allImages: ImageInfos[];
  selectedImage: ImageInfos;
  isDataAvailable: boolean = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.fetchImagesMeta().subscribe((data) => {
      this.allImages = data;
      this.selectedImage = this.allImages[0];
      this.isDataAvailable = true
    })
  }
  showImage(imageInfos: ImageInfos) {
    this.selectedImage = imageInfos;
  }

  validate() {
    this.apiService.validate(this.selectedImage).subscribe(
      () => {
        let indexToUpdate = this.allImages.findIndex(element => this.selectedImage.name === element.name);
        this.allImages[indexToUpdate].status = 'OK';
        },
      (error) => {
        console.log('some error happend' + error);
      })

  }
}


