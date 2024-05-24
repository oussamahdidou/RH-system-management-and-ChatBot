import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private _myBool: boolean = false;

  @Output() myBoolChange = new EventEmitter<boolean>();

  get myBool(): boolean {
    return this._myBool;
  }

  set myBool(value: boolean) {
    this._myBool = value;
    this.myBoolChange.emit(this._myBool);
  }

  toggleBool() {
    this.myBool = !this.myBool;
  }
}
