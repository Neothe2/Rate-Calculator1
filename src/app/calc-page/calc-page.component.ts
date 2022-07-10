import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApartmentService } from '../apartment.service';
import { AuthService } from '../core/auth.service';
import { GlobalPriceRangeService } from '../global-price-range.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-calc-page',
  templateUrl: './calc-page.component.html',
  styleUrls: ['./calc-page.component.css'],
})
export class CalcPageComponent implements OnInit {
  selectedAPTS = [];
  Apartments = [];
  TotFamilies = 0;

  constructor(public auth: AuthService, public db: ApartmentService, public gprs: GlobalPriceRangeService) {
    this.db
      .getRecordList()
      .valueChanges({ idField: 'id' })
      .subscribe((data) => {
        this.Apartments = data;
      });
  }

  select(apartment) {
    console.log(apartment);
    if (!this.selectedAPTS.includes(apartment)) {
      this.selectedAPTS.push(apartment);
      this.calculate();
      return;
    }
    for (let i of this.Apartments) {
      if (i.id == apartment.id) {
        this.selectedAPTS.splice(this.selectedAPTS.indexOf(i), 1);
        this.calculate();
        return;
      }
    }
  }

  calculate() {
    this.TotFamilies = 0;
    for (let apartment of this.selectedAPTS) {
      this.TotFamilies += apartment.numOfFamilies * apartment.maxPricePerFamily;
    }
  }

  ngOnInit(): void {}
}
