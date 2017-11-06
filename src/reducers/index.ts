// Reducers

import { TableAction, TableConstants } from '../actions';
import { TableViewState } from '../store';

/*

// Need to define the initial state in reducer, initial state defined in stores does not get passed in here at init
// Notes: https://stackoverflow.com/questions/36619093/why-do-i-get-reducer-returned-undefined-during-initialization-despite-pr
const NUMBER_OF_TABLES = 15;
var initTables:Table[] = [], n:number = 1;
while(n <= NUMBER_OF_TABLES) { 
	initTables.push({ tableNo: n, status: 'AVAILABLE' });
	n++;
}

const initialTableViewState: TableViewState = {
	tables: initTables,
	visibilityFilter: 'SHOW_ALL'
}
*/
const initialTableViewState: TableViewState = {tables:[]};

// Reducer for tables view
export function tablesReducer(state: TableViewState = initialTableViewState, action:TableAction): TableViewState{
	//alert('in reducer state = ' +JSON.stringify(state));
	//alert('in reducer action = ' +JSON.stringify(action));
	
	switch(action.type){
		case TableConstants.ACTION_SEND_ORDER:
			return {...state, tables: state.tables.map(
				(table) => {
					if (action.tableNo == table.tableNo){
						table.status = TableConstants.STATUS_ORDER_SENT;
					}
					return table;
				})
			}
			
		case TableConstants.ACTION_CANCEL_ORDER:
			return {...state, tables: state.tables.map(
				(table) => {
					if (action.tableNo == table.tableNo){
						table.status = TableConstants.STATUS_AVAILABLE;
					}
					return table;
				})
			}
			
		case TableConstants.ACTION_PRINT_BILL:
			return {...state, tables: state.tables.map(
				(table) => {
					if (action.tableNo == table.tableNo){
						table.status = TableConstants.STATUS_BILL_PRINTED;
					}
					return table;
				})
			}
			
		case TableConstants.ACTION_PAY:
			return {...state, tables: state.tables.map(
				(table) => {
					if (action.tableNo == table.tableNo){
						table.status = TableConstants.STATUS_AVAILABLE;
					}
					return table;
				})
			}
		
		default:
			return state;
	}
}