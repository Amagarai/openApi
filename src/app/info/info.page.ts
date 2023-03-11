import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openWeb = async () => {
    await Browser.open({ url: 'https://portfolio-80395.web.app/' });
  };

  openLinkedin = async () => {
    await Browser.open({ url: 'https://www.linkedin.com/in/amagara%C3%AF-guindo-355590151/' });
  };

  openInsta = async () => {
    await Browser.open({ url: 'https://www.instagram.com/a__guindo/?hl=fr' });
  };

  openWatsap = async () => {
    await Browser.open({ url: 'https://wa.me/22375077544' });
  };

}
