import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, style, animate, transition,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
  animations: [
    trigger('logoAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate(0, 0)' }), 
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translate(0, 0)' })) 
      ]),
      transition(':leave', [
        animate('1s ease-in', style({ opacity: 0, transform: 'translate(-20%, -20%)' })) 
      ])
    ]),
    trigger('letterAnimation', [
      transition(':enter', [
        query('span', [
          style({ opacity: 0 }),
          stagger('150ms', [  
            animate('500ms', style({ opacity: 1 }))  
          ])
        ])
      ])
    ])
  ]
})

export class SplashScreenComponent {
  showSplash = true;
  letters: string[] = 'DA-Bubble'.split('');

  ngOnInit() {
    setTimeout(() => {
      document.getElementById('splash-screen')?.classList.add('splash-hidden');
     
    }, 3000); 
  }
}

