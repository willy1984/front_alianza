import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../services/clients.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';
import { ResponseDto } from 'src/app/models/responseDto';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['sharedId', 'businessId', 'email', 'phone', 'dataAdded', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  filter: any;
  temp: any = [];

  constructor(private services: ClientsService,
              public modalService: MatDialog,
              private message: AlertService
              ) { }

  ngOnInit(): void {
    this.getClients();
  }

  /**
   * @description Method to get customers
   */
  getClients(): void {
    this.services.getClients().subscribe({
      next: (resp: ResponseDto) => {
        if (resp.state === 200) {
          this.dataSource = new MatTableDataSource(resp.response);
          this.dataSource.paginator = this.paginator;
          this.temp = [this.dataSource]
        }
      },
      error: () => {
        this.message.getInfoMessageCreate(
          'Error',
          'Query Failed',
          'error'
        );
      }
    });
  }

  /**
   * @description Create to get customers
   * @param cliente 
   */
  createClient(cliente: any) {
    const modalRef = this.modalService.open(CreateUserComponent, {
      data: cliente
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == 1) {
      modalRef.close();
      this.getClients()
    }
    });
  }

  /**
   * Esta funcionalidad se realiza cuando se requieres buscar en front
   * @param event 
   */
  updateFilterdesdeFront(event: string) {
    const val = event.toLowerCase();
    const temp = this.temp[0].filteredData.filter( (item: any) => {
      if (item) {
        return item.sharedKey.toLowerCase().indexOf(val) !== -1 || !val;
      }
      else {
        this.dataSource.filteredData = temp;
        return false;
      }    });
      this.dataSource = new MatTableDataSource(temp);
      this.dataSource.paginator = this.paginator;
  }

  updateFilter(shared: string) {
    this.services.getBySharedKey(shared).subscribe({
      next: (resp: ResponseDto) => {
        this.dataSource = new MatTableDataSource(resp.response);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.message.getInfoMessageCreate(
          'Error',
          'Query Failed',
          'error'
        );
      }
    });
  }

  deleteClient(id: number): void {
    this.services.deleteClient(id).subscribe({
      next: (resp: ResponseDto) => {
        if (resp.state === 200) {
          this.message.getInfoMessageCreate(
            'Succes',
            'Client delete successfully',
            'success'
          );
          this.getClients();
        }
      },
      error: () => {
        this.message.getInfoMessageCreate(
          'Error',
          'Query Failed',
          'error'
        );
      }
    });
  }

}
