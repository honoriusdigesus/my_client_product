import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @Input()
  placeholder: string = '';

  @Output()
  onValue = new EventEmitter<string>();

  emitValue(value: string) : Observable<string>{
    this.onValue.emit(value);
    return of("Este es un producto");
  }

}
