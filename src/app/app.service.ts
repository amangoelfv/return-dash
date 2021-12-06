import { Injectable } from '@angular/core';
import { delay, map, Observable, of, Timestamp } from 'rxjs';
import { IReturn } from "./app.interface";
import { DatePipe, formatDate } from "@angular/common";

const data: IReturn[] = [
  {
    orderNo: '1uihiu',
    date: Date.now(),
    sku: ['iugwgi', 'ewjfhi'],
    reason: 'The order was not upto the mark',
    returnStatus: 'In transit',
    refundStatus: 'Approved',
  },
  {
    orderNo: '3oohoh',
    date: Date.now(),
    sku: ['augwgi', 'ewjfhi'],
    reason: 'Order was not upto the mark',
    returnStatus: 'Recieved',
    refundStatus: 'Refunded',
  },
  {
    orderNo: '2oho',
    date: Date.now(),
    sku: ['iugwgi', 'ewjfhi', 'kdwfgiwbrov'],
    reason: 'The order was not upto the mark and the following reasons to ',
    returnStatus: 'In transit',
    refundStatus: 'Approved',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  getReturnsData(startDate: any, endDate: any): Observable<IReturn[]> {
    const startDateInMS = Date.parse(startDate);
    const endDateInMS = Date.parse(endDate);
    console.log(startDateInMS, endDateInMS)
    return of(data).pipe(map((data) => data.map((value) => {
      return {
        ...value,
        date: formatDate(value.date, 'medium', 'en-IN', '+530'),
        sku: value.sku.join('\n'),
      };
    })
    ), delay(2000))
  }
}
