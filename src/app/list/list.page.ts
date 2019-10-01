import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
  constructor(private camera: Camera) {
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
        this.corrigir();
        // this.result = 'Você acertou 20 questões!';
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
        this.listaImagens.push(ImageData);
        this.corrigir();
      },
        (err) => {
          console.log(err);
        });
  }

  corrigir() {
    if (this.listaImagens.length >= 2) {
      // Exemplo de requisição POST
      const ajax = new XMLHttpRequest();

      // Seta tipo de requisição: Post e a URL da API
      ajax.open('POST', 'https://gabrielsohza.pythonanywhere.com/api', true);
      ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      // Seta paramêtros da requisição e envia a requisição
      ajax.send(this.listaImagens[0]);

      // Cria um evento para receber o retorno.
      ajax.onreadystatechange = function () {

        // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
        if (ajax.readyState === 4 && ajax.status === 200) {

          const data = ajax.responseText;

          // Retorno do Ajax
          console.log(data);
        }
      }.bind(this);

      this.listaImagens = new Array<any>();
    }
  }
}
