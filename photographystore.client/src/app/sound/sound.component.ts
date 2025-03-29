//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-sound',
//  templateUrl: './sound.component.html',
//  styleUrl: './sound.component.css'
//})
//export class SoundComponent {

//  name: string = '';
//  greetingMessage: string = '';

//  namesList: string[] = ['بتول', 'محمد', 'سامي', 'علي', 'فاطمة', "براء"];

//  constructor() { }

//  startVoiceRecognition() {
//    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//    if (!SpeechRecognition) {
//      alert('المتصفح لا يدعم البحث الصوتي');
//      return;
//    }

//    const recognition = new SpeechRecognition();
//    recognition.lang = 'ar-EG';
//    recognition.interimResults = false;
//    recognition.maxAlternatives = 1;

//    recognition.start();

//    recognition.onresult = (event: any) => {
//      const spokenName = event.results[0][0].transcript;
//      console.log("Recognized Name: ", spokenName);
//      this.checkNameInList(spokenName);
//    };

//    recognition.onerror = (event: any) => {
//      console.error('حدث خطأ أثناء التعرف على الصوت:', event.error);
//      if (event.error === 'no-speech') {
//        alert('لم يتم التعرف على أي صوت.');
//      } else if (event.error === 'audio-capture') {
//        alert('حدث خطأ في الميكروفون.');
//      } else if (event.error === 'not-allowed') {
//        alert('لم يتم السماح باستخدام الميكروفون.');
//      } else {
//        alert('حدث خطأ غير معروف: ' + event.error);
//      }
//    };
//  }

//  checkNameInList(spokenName: string) {
//    // Normalizing the spoken name: removing extra spaces, and converting to lowercase
//    const normalizedSpokenName = spokenName.trim().toLowerCase().replace(/\s+/g, '').replace(/[^\wء-ي]/g, '');

//    console.log("Normalized Name: ", normalizedSpokenName); // Log the normalized name for debugging

//    const nameSubstitutions: { [key: string]: string } = {
//      "عالي": "علي",
//      "أهالي": "علي",
//      "باترول": "بتول",
//      "باتول": "بتول",
//      "بترول": "بتول",


//    };

//    const correctedName = nameSubstitutions[normalizedSpokenName] || normalizedSpokenName;

//    if (this.namesList.some(name => name.toLowerCase() === correctedName)) {
//      this.greetingMessage = `الاسم "${spokenName}" موجود في القائمة! مرحباً ${spokenName}`;


//    } else {
//      this.greetingMessage = `الاسم "${spokenName}" غير موجود في القائمة.`;
//    }
//  }

//}
