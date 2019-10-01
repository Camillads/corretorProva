import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  result = '';
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private camera: Camera) {
    this.items.push({
      title: 'Câmera',
      note: ' ',
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    });

    this.items.push({
      title: 'Galeria',
      note: ' ',
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  abrirImagens(item: any) {
    if (item.title === 'Câmera') {
      this.takePicture();
    } else {
      this.uploadImage();
    }
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        // chamar a api e passar imageData como parametro
        this.result = 'Você acertou 20 questões!';
      },
        (err) => {
          console.log(err);
        });
  }

  uploadImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    this.camera.getPicture(options)
      .then((imageUri) => {

      },
        (err) => {
          console.log(err);
        });
  }
}
