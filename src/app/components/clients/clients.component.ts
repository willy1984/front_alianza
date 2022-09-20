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

  constructor(private services: ClientsService,
              public modalService: MatDialog,
              private message: AlertService
              ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.services.getClients().subscribe({
      next: (resp: ResponseDto) => {
        if (resp.state === 200) {
          this.dataSource = new MatTableDataSource(resp.response);
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource)
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

}
