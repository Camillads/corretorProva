import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  listaImagens = new Array<any>();
  result = '';
  private selectedItem: any;
  private icons = [
    'camera',
    'images',
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private camera: Camera, private appService: AppServiceService) {
    this.items.push({
      title: 'Câmera',
      note: ' ',
      icon: this.icons[0]
    });

    this.items.push({
      title: 'Galeria',
      note: ' ',
      icon: this.icons[1]
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
        this.listaImagens.push(imageData);
        this.result = 'tamanho = ' + this.listaImagens.length;
        this.corrigir();
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
        this.listaImagens.push(imageUri);
        this.result = 'tamanho = ' + this.listaImagens.length;
        this.corrigir();
      },
        (err) => {
          console.log(err);
        });
  }

  corrigir() {
    if (this.listaImagens.length >= 2) {
      debugger
      this.result = 'entrou';
      this.appService.corrigirProva(this.listaImagens[0], this.listaImagens[1]).subscribe(
        sucesso => {
          this.result = sucesso;
          this.listaImagens = [];
        },
        erro => {
          this.listaImagens = [];
          this.result = erro;
        }
      );
    }
  }
}
