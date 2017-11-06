// Actions 

export class TableConstants {
    public static readonly ACTION_SEND_ORDER = 'SEND_ORDER';
	public static readonly ACTION_CANCEL_ORDER = 'CANCEL_ORDER';
	public static readonly ACTION_PRINT_BILL = 'PRINT_BILL';
	public static readonly ACTION_PAY = 'PAY';
	
	public static readonly STATUS_ORDER_SENT = 'Order Sent';
	public static readonly STATUS_AVAILABLE = 'Available';
	public static readonly STATUS_BILL_PRINTED = 'Bill Printed';
}

export interface OpenTable {
    type: string;
	tableNo: number;
}

export interface PrintTableBill {
    type: string;
	tableNo: number;
}

export interface CloseTable {
    type: string;
	tableNo: number;
}

export interface Pay {
	type: string;
	tableNo: number;
}

export type TableAction = OpenTable | CloseTable | PrintTableBill | Pay;

export function openTable(tableNo:number): OpenTable {
	return {
        type: TableConstants.ACTION_SEND_ORDER,
		tableNo: tableNo
    }
}

export function printTableBill(tableNo:number): PrintTableBill {
    return {
        type: TableConstants.ACTION_PRINT_BILL,
		tableNo: tableNo
    }
}

export function closeTable(tableNo:number): CloseTable {
    return {
        type: TableConstants.ACTION_CANCEL_ORDER,
		tableNo: tableNo
    }
}

export function pay(tableNo:number): Pay {
    return {
        type: TableConstants.ACTION_PAY,
		tableNo: tableNo
    }
}