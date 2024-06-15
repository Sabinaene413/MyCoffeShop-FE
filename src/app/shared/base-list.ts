import { Injectable, OnInit } from '@angular/core';
import { AbstractApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseListComponent<DTO> implements OnInit {
  //used to show results filtered/paginated
  resultData: DTO[] = [];

  //used to store data after backend api call
  listData: DTO[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  filterText: string = '';

  constructor(private api: AbstractApiService<DTO>) {}

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: (res: DTO[]) => {
        this.listData = res;
        this.updatePagination();
      },
      error: (err: any) => console.log(err),
    });
  }

  private mapToFilter(): DTO[] {
    const filteredEntitiess = this.listData.filter((entity) =>
      this.FilterFields(entity)
    );
    return filteredEntitiess;
  }

  private FilterFields(entity: any): boolean {
    return Object.values(entity).some((value: any) =>
      value?.toString().toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  private updatePagination(): void {
    const filter = this.mapToFilter();
    this.totalPages = Math.ceil(filter.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.resultData = filter.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  onFilterTextChange(filterText: string): void {
    this.filterText = filterText;
    this.currentPage = 1;
    this.updatePagination();
  }
}
