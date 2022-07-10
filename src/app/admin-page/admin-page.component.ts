import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ApartmentService } from '../apartment.service';
import { AuthService } from '../core/auth.service';
import { GlobalPriceRangeService } from '../global-price-range.service';
import { User } from '../models/user.model';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  global_min_value: any;
  global_max_value: any;
  global_price_range_list;
  recordRef: AngularFirestoreCollection<any>;
  people$: Observable<any[]>;
  addForm = new FormGroup({
    apartmentName: new FormControl('', Validators.required),
    associationName: new FormControl('', Validators.required),
    numOfFamilies: new FormControl('', Validators.required),
    minPricePerFamily: new FormControl(''),
    maxPricePerFamily: new FormControl(''),
  });
  updateForm: FormGroup;
  updateId: string = '';

  get apartmentName() {
    return this.addForm.get('apartmentName');
  }
  get associationName() {
    return this.addForm.get('associationName');
  }
  get numOfFamilies() {
    return this.addForm.get('numOfFamilies');
  }
  get minPricePerFamily() {
    return this.addForm.get('minPricePerFamily');
  }
  get maxPricePerFamily() {
    return this.addForm.get('maxPricePerFamily');
  }

  get U_apartmentName() {
    return this.updateForm.get('apartmentName');
  }
  get U_associationName() {
    return this.updateForm.get('associationName');
  }
  get U_numOfFamilies() {
    return this.updateForm.get('numOfFamilies');
  }
  get U_minPricePerFamily() {
    return this.updateForm.get('minPricePerFamily');
  }
  get U_maxPricePerFamily() {
    return this.updateForm.get('maxPricePerFamily');
  }

  constructor(
    public service: ApartmentService,
    public afs: AngularFirestore,
    public fb: FormBuilder,
    public gprs: GlobalPriceRangeService,
    public db: AngularFirestore
  ) {

    this.people$ = service.getRecordList().valueChanges({ idField: 'id' });

    this.updateForm = this.fb.group({
      apartmentName: ['', Validators.required],
      associationName: ['', Validators.required],
      numOfFamilies: ['', [Validators.required]],
      minPricePerFamily: ['', [Validators.required]],
      maxPricePerFamily: ['', [Validators.required]],
    });

    let a;
    this.recordRef = this.db.collection('/global-price-ranges');
    this.gprs
      .getRecordList()
      .valueChanges()
      .subscribe((list) => {
        this.global_min_value = list[1];
        this.global_max_value = list[0];
        console.log(this.global_min_value);
        console.log(list[0]);
      });


    console.log(this.global_price_range_list);
  }

  updateMinValue(event) {
    this.gprs.updateRecord('Min-Price-per-Family', {
      value: event.target.value,
    });
  }
  updateMaxValue(event) {
    this.gprs.updateRecord('Max-Price-per-Family', {
      value: event.target.value,
    });
  }

  delete(personid: any) {
    this.service.deleteRecord(personid);
  }

  minPrice() {
    if (this.minPricePerFamily.value > this.global_min_value.value && this.minPricePerFamily.value < this.global_max_value.value && !null) {
      return this.minPricePerFamily.value;
    }
    return this.global_min_value.value;
  }
  maxPrice() {
    if (this.maxPricePerFamily.value < this.global_max_value.value && 0 < this.maxPricePerFamily.value) {
      return this.maxPricePerFamily.value;
    }
    else return this.global_max_value.value;
    return this.global_max_value.value;
  }

  add() {
    let person = {
      apartmentName: this.apartmentName?.value,
      associationName: this.associationName?.value,
      numOfFamilies: this.numOfFamilies?.value,
      // maxPricePerFamily: this.maxPrice(),
      maxPricePerFamily: this.maxPricePerFamily?.value,
     minPricePerFamily: this.minPricePerFamily?.value,
      // minPricePerFamily: this.minPrice()
    };

    this.service.createRecord(person);

    this.addForm.reset();
  }

  updateButton(record: any, recordId: string) {
    this.updateId = recordId;

    this.U_apartmentName?.setValue(record.apartmentName);
    this.U_associationName?.setValue(record.associationName);
    this.U_numOfFamilies?.setValue(record.numOfFamilies);
    this.U_minPricePerFamily?.setValue(record.minPricePerFamily);
    this.U_maxPricePerFamily?.setValue(record.maxPricePerFamily);
  }

  cancel() {
    this.addForm.reset();
    this.updateForm.reset();
  }

  update() {
    let person = {
      apartmentName: this.U_apartmentName?.value,
      associationName: this.U_associationName?.value,
      numOfFamilies: this.U_numOfFamilies?.value,
      minPricePerFamily: this.U_minPricePerFamily?.value,
      maxPricePerFamily: this.U_maxPricePerFamily?.value,
    };

    this.service.updateRecord(this.updateId, person);

    this.updateForm.reset();
  }
}
