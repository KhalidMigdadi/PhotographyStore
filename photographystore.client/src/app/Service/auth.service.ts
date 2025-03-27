import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userIdSubject = new BehaviorSubject<string | null>(null);  // تخزين الـ userId في BehaviorSubject
  userId$ = this.userIdSubject.asObservable();  // نشر userId للمكونات الأخرى

  constructor(private urlService: UrlService) { }

  // تعيين الـ userId بعد تسجيل الدخول
  setUserId(userId: string) {
    this.userIdSubject.next(userId);
  }

  // جلب الـ userId من الـ API بعد تسجيل الدخول
  getUserId() {
    this.urlService.getUserIdFromAPI().subscribe(userId => {
      this.setUserId(userId);  // تحديث BehaviorSubject
    });
  }
}
