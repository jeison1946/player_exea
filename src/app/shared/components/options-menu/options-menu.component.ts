import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class OptionsMenuComponent {
  @Output() itemSelect = new EventEmitter<any>();

  @Input() listItems: any[] = [];

  @Input() backgroudColor: string = ''

  public currentItem: string = 'request_song';

  ngOnInit(): void {
    
  }

  onItemSelected(item: any) {
    this.itemSelect.emit(item);
    this.currentItem = item.id;
  }
}
