import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-grid',
  templateUrl: './top-grid.html',
  styleUrls: ['./top-grid.scss']
})
export class PaginationFilterComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() filterTextChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();

  filterText: string = '';

  onFilter(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterText = target.value;
    this.filterTextChange.emit(this.filterText);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
