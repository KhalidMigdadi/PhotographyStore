import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  ngOnInit() {
    const stylesheets = [
      'assets/vendors/mdi/css/materialdesignicons.min.css',
      'assets/vendors/flag-icon-css/css/flag-icon.min.css',
      'assets/vendors/css/vendor.bundle.base.css',
      'assets/vendors/jquery-bar-rating/css-stars.css',
      'assets/vendors/font-awesome/css/font-awesome.min.css',
      'assets/css/demo_1/style.css',
      'assets/dashboard/dashboard-styles.css' // إضافة ملف الـ CSS الخاص بالـ Dashboard
    ];

    stylesheets.forEach(stylesheet => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = stylesheet;
      document.head.appendChild(link);
    });
  }


}
