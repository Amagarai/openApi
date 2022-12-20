import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Configuration, OpenAIApi } from "openai";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apikeys  = 'sk-OW*******PXy'
  endpoint = 'https://api.openai.com/v1/completions';
  resultat:any;
  loading : boolean = false;
  verifie = '';
  constructor(private http: HttpClient, private alertController: AlertController) {}

  header = new HttpHeaders({
    "Authorization" : "Bearer "+ this.apikeys ,
  });

  Submit(datas: NgForm){
    if (this.verifie === '') {
      this.presentAlert('','Champs vide')
    } else {
      this.loading = true
      let data = {
        prompt: datas.value.donnee,
        model: 'text-davinci-003',
        max_tokens: 2000,
      };
      this.http.post(this.endpoint, data, {headers: this.header}).subscribe((response: any) => {
        if (response) {
          this.loading = false;
          let text = response;
          this.verifie = ''
          this.resultat = text.choices[0].text
          datas.reset();
        }
      });
    }
  }

  Ionchange(event: any){
    this.verifie = event.target.value
  }

  translateToHtml = (text: string) => text.split("\n").map((str) =>`<p>${str}</p>`).join("");

  async presentAlert(header : string, message : string) {
    const alert = await this.alertController.create({
      header: header,
      // subHeader: 'Subtitle',
      mode: 'ios',
      cssClass: 'my-custom-class',
      message: '<b>'+message+'</b>',
      buttons: ['OK']
    });

    await alert.present();
  }

}
