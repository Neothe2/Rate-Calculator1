import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class GlobalPriceRangeService {
  dbPath = '/global-price-ranges';
  recordRef: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) {
    this.recordRef = db.collection(this.dbPath);
  }
  createRecord(record: any): void {
    this.recordRef.add({ ...record });
  }
  updateRecord(key: string, value: any): Promise<void> {
    return this.recordRef.doc(key).update(value);
  }
  deleteRecord(recordId: string): Promise<void> {
    return this.recordRef.doc(recordId).delete();
  }
  getRecordList(): AngularFirestoreCollection<any> {
    return this.recordRef;
  }
  getMinValue(): number {
    let a = 0;
    this.getRecordList()
      .valueChanges()
      .subscribe((list) => {
        a = list[1].value;
      });
    return a;
  }
  getMaxValue() {
    this.getRecordList()
      .valueChanges()
      .subscribe((list) => {
        console.log(list);
        console.log(list[0].value);
        return list[0].value;
      });
  }
}
