import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent {
  @Input() data?: string;
  @Output() dataChange = new EventEmitter<string>();

  onChildDataChange() {
    this.dataChange.emit(this.data);
  }
  @Input() flexDirection: FlexDirection = 'column';

  @HostBinding('style.display') get display() {
    return 'flex';
  }

  @HostBinding('style.flex-direction') get direction() {
    return this.flexDirection;
  }
}
