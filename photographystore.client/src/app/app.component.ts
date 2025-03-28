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

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.loadScripts([
      'assets/js/main.js',
      'assets/js/vendor/modernizr-3.11.2.min.js',
      'assets/js/vendor/jquery-3.6.0.min.js',
      'assets/js/plugins/jqueryui.min.js',
      'assets/js/vendor/jquery-migrate-3.3.2.min.js',
      'assets/js/plugins/slick.min.js',
      'assets/js/plugins/jquery.nice-select.min.js',
      'assets/js/plugins/jquery.zoom.min.js',
      'assets/js/plugins/imagesloaded.pkgd.min.js',
      'assets/js/plugins/masonry.pkgd.min.js',
      'assets/js/plugins/ajaxchimp.min.js'
    ]);
  }



  loadScripts(scripts: string[]) {
    scripts.forEach(script => {
      let scriptElement = document.createElement('script');
      scriptElement.src = script;
      scriptElement.type = 'text/javascript';
      scriptElement.async = true;
      document.body.appendChild(scriptElement);
    });
  }



}
