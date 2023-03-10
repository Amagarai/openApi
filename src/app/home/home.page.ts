import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Configuration, OpenAIApi } from "openai";
import hljs from 'highlight.js';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apikeys  = 'sk-89vFhQc7sOmt5orpXrptT3----##eXd7lsLK7fELO'
  endpoint = 'https://api.openai.com/v1/completions';
  resultat:any;
  loading : boolean = false;
  verifie = '';
  div = document.getElementById('resultat');
  list : any[] = []
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

      let conversation = {
        moi: true,
        text : datas.value.donnee
      }
      this.list.push(conversation)
      this.http.post(this.endpoint, data, {headers: this.header}).subscribe((response: any) => {
        if (response) {
          let conversation2 = {
            moi: true,
            text : datas.value.donnee
          }
          this.list.push(conversation2);
          this.loading = false;
          let text = response;
          this.verifie = ''
          this.resultat = this.translateToHtml(text.choices[0].text)
          console.log(text.choices[0].text);

          datas.reset();
        }
      });
    }
  }

  Ionchange(event: any){
    this.verifie = event.target.value
  }

  translateToHtml = (text: string) => text.split("\n").map((str) =>`<p>${str}</p>`).join("");

  // verifyCode = (text: string) => text.split('```')

  highlightCode(text: any) {
    const codeRegex = /<code>(.*?)<\/code>/gs;
    const hasCode = codeRegex.test(text);

    if (hasCode) {
      const matches = text.matchAll(codeRegex);
      let result = '';

      for (const match of matches) {
        const code = match[1];
        const language = 'javascript'; // Remplacez par la langue de votre choix
        const highlightedCode = hljs.highlight(language, code).value;
        result += `<pre><code class="hljs">${highlightedCode}</code></pre>`;
      }

      return result;
    } else {
      return text;
    }
  }

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
