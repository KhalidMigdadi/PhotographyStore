import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  //constructor(private contactService: ContactService) { }

  //onSubmit(form: any) {
  //  this.contactService.sendContactForm(form.value).subscribe(response => {
  //    console.log('Message sent successfully:', response);
  //    // هنا يمكنك عرض رسالة تأكيد للمستخدم
  //  }, error => {
  //    console.error('Error sending message:', error);
  //    // هنا يمكنك عرض رسالة خطأ للمستخدم
  //  });
  //}

  // دالة ارسال النموذج
  onSubmit(form: any) {
    // التحقق من أن جميع الحقول غير فارغة
    if (form.valid) {
      // عرض رسالة الـ Alert
      alert('The massage was sent successfully');

      // مسح الحقول بعد العرض
      form.reset();
    } else {
      // إذا كانت هناك حقول فارغة، يظهر رسالة تنبيه للمستخدم
      alert('Please Fill all fields');
    }
  }
}
