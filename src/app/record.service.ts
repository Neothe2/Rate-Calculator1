import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private dbPath = '/users';
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
}
