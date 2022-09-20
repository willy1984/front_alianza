import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { AlertService } from '../../../services/alert.service';
import { Constants } from '../../../constants';
import { ResponseDto } from '../../../models/responseDto';

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
      const newSharekey: string = this.formUser.value.sharedKey;
      this.formUser.value.sharedKey = newSharekey.toLowerCase();
      this.service.createClient(this.formUser.value).subscribe({
        next: (resp: ResponseDto) => {
          if (resp.state === 200) {
            this.message.getInfoMessageCreate(
              'Succes',
              'Client created successfully',
              'success'
            );
            this.passEntry.emit(1);
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

  soloNumeros($event: KeyboardEvent) {
    const stringKey: string = $event.key;
    const match = stringKey.match(Constants.SOLO_NUMEROS_PATTERN);
    if (!match) {
      $event.preventDefault();
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
