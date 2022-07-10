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
  TotAmount = 0;
  TotFamiliesSelected = 0;

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
    this.TotAmount = 0;
    this.TotFamiliesSelected = 0;
    let x1 = 1;
    let x2 = 0;
    let y1 = 140;
    let y2 = 30;

    for (let apartment of this.Apartments) {
      x2 += apartment.numOfFamilies;
    }
    let m = (y2-y1)/(x2-x1);
    // finding c
    let c = y1 - m



    for (let apartment of this.selectedAPTS) {
      this.TotFamiliesSelected += apartment.numOfFamilies;
      this.TotAmount += m * apartment.numOfFamilies + y2;
    }
    this.TotAmount = (Math.round( m * this.TotFamiliesSelected + c)) * this.TotFamiliesSelected;

    console.log(this.TotFamiliesSelected)
    console.log(x1)
    console.log(x2)
    console.log(y1)
    console.log(y2)
    console.log(m)
    console.log(this.TotFamiliesSelected)
  }

  ngOnInit(): void {}
}
