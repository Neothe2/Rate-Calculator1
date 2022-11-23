import { Component, OnInit } from '@angular/core';
import { FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-lift-calc',
  templateUrl: './lift-calc.component.html',
  styleUrls: ['./lift-calc.component.css']
})
export class LiftCalcComponent {

  rowData = []

  totalPrice: Number = 0;

  gridOptions = {
    // // adds subtotals
    // groupIncludeFooter: true,
    // // includes grand total
    // groupIncludeTotalFooter: true,
    // // other grid options ...
}

  totalNumberOfFamilies;

  averagePrice = 0;

  colDefs = [
    {field: "apartmentName", checkboxSelection: true, headerCheckboxSelection: true},
    {field: "associationName"},
    {field: "numOfFamilies"},
    {field: "pricePerApartment"}
  ]
  defaultColDef = {
    sortable: true, filter: true, resizable: true, suppressColumnMoveAnimation: true, minWidth: 230, wrapText: true, autoHeight: true, suppressMovable: true, enableSorting: true, enableFilter: true,
  }

  constructor(public gridApi: GridApi, public db: ApartmentService) {
    db.getRecordList().valueChanges().subscribe(data => {
      this.rowData = data
    })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  public onFirstDataRedndered(event: FirstDataRenderedEvent){
    event.api.sizeColumnsToFit();
  }

  public onSearchChanged($event) {
    console.log('search')
    this.gridApi.setQuickFilter(
      ($event.target as HTMLInputElement).value
    )

  }

  onAveragePriceChanged($event) {
    this.averagePrice = $event.target.value
    let totalPrice:Number = 0;
    let totalNumberOfFamilies:Number = 0;
    let pricePerFamily:Number = 0;
    let selectedPrice: Number = 0;

    for (let apartment of this.rowData) {
      totalNumberOfFamilies += apartment.numOfFamilies
    }

    this.totalNumberOfFamilies = totalNumberOfFamilies

    totalPrice = this.averagePrice * this.rowData.length
    pricePerFamily = (Number(totalPrice) / Number(totalNumberOfFamilies))

    console.log(pricePerFamily)
    for (let apartment of this.rowData) {
      apartment['pricePerApartment'] = Math.round(Number(pricePerFamily) * Number(apartment.numOfFamilies))
    }

    // for (let apartment of this.gridApi.getSelectedRows()) {
    this.calculate()
    // }


    this.gridApi.refreshCells()
  }

  calculate() {
    console.log(this.gridApi.getSelectedRows())
    this.totalPrice = 0
    for (let apartment of this.gridApi.getSelectedRows()) {
      console.log(apartment.pricePerApartment)
      this.totalPrice += apartment.pricePerApartment
    }
  }

}
