import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/clickOutSideDirective';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-out-mobile',
  imports: [CommonModule, ClickOutsideDirective, RouterModule],

  templateUrl: './log-out-mobile.component.html',
  styleUrls: ['./log-out-mobile.component.scss']
})
export class LogOutMobileComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  onClickOutside() {
    this.close.emit();
  }
}
