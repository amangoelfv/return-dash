export interface IReturn {
  orderNo: string;
  date: number | string;
  sku: any;
  reason: string;
  returnStatus: string;
  refundStatus: string;
}

export interface ITableColumn {
  columnName: string;
  columnHeader: string;
  isSort: boolean;
}
