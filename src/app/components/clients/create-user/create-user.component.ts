import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  formUser: FormGroup = new FormGroup({});
  @Output() passEntry : EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private service: ClientsService,
              private message: AlertService
              ) { }

  ngOnInit(): void {
    this.builderForm();
  }

  builderForm(): void {
    this.formUser = this.fb.group({
      sharedKey: ['', Validators.required],
      bussinesId: ['', Validators.required],
      email: ['', Validators.required],
      phone: [],
      dataAdded: []
    });
  }

  create(): void {
    if (this.formUser.valid) {
      this.service.createClient(this.formUser.value).subscribe({
        next: (resp: any) => {
          this.message.getInfoMessageCreate(
            'Succes',
            'Client created successfully',
            'success'
          );
          this.passEntry.emit(1);
        }
      });
    }
  }

   /**
   * @author: Wil Faver Garcia
   * @description: Controles para los datos del formulario
   * 20/09/2021
   */
    get sharedKey() { return this.formUser.get('sharedKey'); }
    get bussinesId() { return this.formUser.get('bussinesId'); }
    get email() { return this.formUser.get('email'); }

}
