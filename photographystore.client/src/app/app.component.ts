import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private renderer: Renderer2 ) { }
  ngOnInit() {
    this.loadScript('assets/js/main.js');
    this.loadScript('assets/js/vendor/modernizr-3.11.2.min.js');
    this.loadScript('assets/js/vendor/jquery-3.6.0.min.js');
    this.loadScript('assets/js/vendor/jquery-migrate-3.3.2.min.js');
    this.loadScript('assets/js/plugins/slick.min.js');
    this.loadScript('assets/js/plugins/jqueryui.min.js');
    this.loadScript('assets/js/plugins/jquery.nice-select.min.js');
    this.loadScript('assets/js/plugins/jquery.zoom.min.js');
    this.loadScript('assets/js/plugins/imagesloaded.pkgd.min.js');
    this.loadScript('assets/js/plugins/masonry.pkgd.min.js');
    this.loadScript('assets/js/plugins/ajaxchimp.min.js');





  }


  loadScript(src: string) {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }












}
