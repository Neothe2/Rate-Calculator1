import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApartmentService } from '../apartment.service';
import { AuthService } from '../core/auth.service';
import { GlobalPriceRangeService } from '../global-price-range.service';
  import { FirstDataRenderedEvent } from 'ag-grid-community';
  import { User } from '../models/user.model';

@Component({
  selector: 'app-calc-page',
  templateUrl: './calc-page.component.html',
  styleUrls: ['./calc-page.component.css'],
})
export class CalcPageComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridColumnApi: ColumnApi;
  private gridApi: GridApi
  
  selectedAPTS = [];
  Apartments = [];
  TotAmount = 0;
  GrandTotal = 0;
  TotFamiliesSelected = 0;
  global_min_value = 0;
  global_max_value = 0;

  colDefs = [
    {field: "apartmentName", checkboxSelection: true, headerCheckboxSelection: true},
    {field: "associationName"},
    {field: "numOfFamilies"},
  ]
  defaultColDef = {
    sortable: true, filter: true, resizable: true,
  }

  constructor(public auth: AuthService, public db: ApartmentService, public gprs: GlobalPriceRangeService) {
    this.gridApi = new GridApi;
    this.db
      .getRecordList()
      .valueChanges({ idField: 'id' })
      .subscribe((data) => {
        this.Apartments = data;
      });
    this.gprs.getRecordList().valueChanges({ idField: 'id' }).subscribe(list => {
      this.global_min_value = list[1].value;
      this.global_max_value = list[0].value;
    })
  }

  public onFirstDataRedndered(event: FirstDataRenderedEvent){
      event.api.sizeColumnsToFit();
  }

  select(apartment) {
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
    let selectedAPTS = this.agGrid.api.getSelectedRows()
    this.selectedAPTS = selectedAPTS;
    this.TotAmount = 0;
    this.TotFamiliesSelected = 0;
    this.GrandTotal = 0;
    let x1 = 1;
    let x2 = 0;
    let y1 = 0;
    let y2 = 0;

    for (let apartment of this.Apartments) {
      x2 += apartment.numOfFamilies;
    }    


    for (let apartment of selectedAPTS) { 
      this.TotFamiliesSelected += apartment.numOfFamilies;
    }

    for (let apartment of selectedAPTS) {    
      y1 =  this.global_max_value;
      y2 = this.global_min_value;

      let m = (y2-y1)/(x2-x1);
      // finding c
      let c = y1 - m


      let ratePerFamily = (Math.round( m * this.TotFamiliesSelected + c))
      let ratePerFamilyPerApt = 0;

      if (ratePerFamily > apartment.maxPricePerFamily){
        ratePerFamilyPerApt = apartment.maxPricePerFamily;
      }else if (ratePerFamily < apartment.minPricePerFamily){
        ratePerFamilyPerApt = apartment.minPricePerFamily;
      }else{
        ratePerFamilyPerApt= ratePerFamily;
      }
    
      this.TotAmount = ratePerFamilyPerApt * apartment.numOfFamilies;

      this.GrandTotal += this.TotAmount;

      console.log(ratePerFamily + " " + ratePerFamilyPerApt)

  }
  
}

  ngOnInit(): void {}
}
