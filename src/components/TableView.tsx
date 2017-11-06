import React from 'react';
import { Table } from '../store';
import { TableConstants } from '../actions';


export interface ITableViewProps{
	tables: Table[];
	visibilityFilter: string;
	onOpenTable: (tableNo:number) => void;
    onCloseTable: (tableNo:number) => void;
	onPrintTableBill: (tableNo:number) => void;
	onPay: (tableNo:number) => void;
}

export interface ITableItemsState{
	show: boolean;
	tableNo: number;
	tableStatus: string;
}

class MapStatusToClass{
	public static values:Map<string, string> = new Map([
		[TableConstants.STATUS_ORDER_SENT, "green_ordersent"], 
		[TableConstants.STATUS_AVAILABLE, "grey_available"], 
		[TableConstants.STATUS_BILL_PRINTED, "blue_billprinted"]]
	);
}

class TableItemsModal extends React.Component<any, ITableItemsState>{
	constructor(props: any){
		super(props);
		
		this.state = {
			show : false,
			tableNo: 0,
			tableStatus: ''
		};
		
		this.handleHideTableModalClick = this.handleHideTableModalClick.bind(this);
		this.callParent_addOrder = this.callParent_addOrder.bind(this);
		this.callParent_cancelOrder = this.callParent_cancelOrder.bind(this);
		this.callParent_printBill = this.callParent_printBill.bind(this);
		this.callParent_pay = this.callParent_pay.bind(this);
	}
	componentWillReceiveProps(nextProps: any){
		this.setState({
			show: nextProps.show,
			tableNo: nextProps.tableNo,
			tableStatus: nextProps.tableStatus
		});
	}
	public handleHideTableModalClick(){
		this.setState({
			show: false
		});
	}
	public callParent_addOrder(){
		this.props.openTable(this.state.tableNo);
	}
	public callParent_cancelOrder(){
		if ( (this.state.tableStatus==TableConstants.STATUS_ORDER_SENT || this.state.tableStatus==TableConstants.STATUS_BILL_PRINTED) &&
			 confirm('There are unfinished transactions for Table '+this.state.tableNo+'. Confirm cancel?') ){
			this.props.closeTable(this.state.tableNo);
		}
	}
	public callParent_printBill(){
		if (this.state.tableStatus==TableConstants.STATUS_ORDER_SENT){
			this.props.printBill(this.state.tableNo);
		}
	}
	public callParent_pay(){
		if ( this.state.tableStatus==TableConstants.STATUS_BILL_PRINTED &&
			 confirm('Pay $44.20 for this table?') ) {
			this.props.pay(this.state.tableNo);
		}
	}
	
	render(){
		// Button css logic
		var displayObj: {display: string} = {
			display: (this.state.show) ? 'block' : 'none'
		}
		var disablebutton: string = (this.state.tableStatus==TableConstants.STATUS_ORDER_SENT || this.state.tableStatus==TableConstants.STATUS_BILL_PRINTED) ? '' : 'grey_disablebutton ';
		var displaypaybutton: string = (this.state.tableStatus==TableConstants.STATUS_BILL_PRINTED) ? 'showpaybutton' : '';
		
		return(
			<div id="myModal" className="modal" style={displayObj}>
			 
			  <div className="modal-content">
				<div className="myModal-header">
					<div className="row row1">
						<h1>Table Summary</h1>
						<div className="close" onClick={this.handleHideTableModalClick}>&times;</div>
					</div>
					<div className="row row2">
						<div>
							<div className={"modal-circle-tableno " + MapStatusToClass.values.get(this.state.tableStatus)}>{this.state.tableNo}</div>
						</div>
						<div className="col-9 modal-subheader">
							<h2>{this.state.tableStatus}</h2>
							<h3>Last transaction at 18:33 by Mei</h3>
						</div>
					</div>
				</div>
				<div className="myModal-content">
					<table>
						<tbody>
							<tr>
								<td>Coca-cola</td>
								<td>2</td>
								<td>4.00</td>
							</tr>
							<tr>
								<td>Weiss Wein - Chardonnay 175ml</td>
								<td>1</td>
								<td>6.70</td>
							</tr>
							<tr>
								<td>Schnitzel mit Pommes</td>
								<td>1</td>
								<td>14.50</td>
							</tr>
							<tr>
								<td>Spaetzler mit Eierschwammel</td>
								<td>1</td>
								<td>14.50</td>
							</tr>
							<tr>
								<td>Gurke Salat</td>
								<td>1</td>
								<td>4.50</td>
							</tr>
							<tr>
								<td></td>
								<td><b>Total</b></td>
								<td><b>$44.20</b></td>
							</tr>
						  </tbody>
					</table>
				</div>
				<div className="modal-tableaction-buttoncontainer">
					<button className={disablebutton + ' ' + displaypaybutton + ' cancelorder red_cancelorder'} onClick={this.callParent_cancelOrder}>
						CANCEL ORDER
					</button>
					<button className={displaypaybutton + ' sendorder green_sendorder'} onClick={this.callParent_addOrder}>
						SEND ORDER
					</button>
					<button className={disablebutton + ' ' + displaypaybutton + ' printbill blue_printbill'} onClick={this.callParent_printBill}>
						PRINT BILL
					</button>
					<button className={displaypaybutton + ' pay yellow_pay'} onClick={this.callParent_pay}>
						PAY
					</button>
					
				</div>
			  </div>
			  
			</div>
		);
	}
}



//function TableView ({tables, visibilityFilter = 'SHOW_ALL', onOpenTable, onCloseTable}:Props){
class TableView extends React.Component<ITableViewProps, any>{
	constructor(props: any){
		super(props);
		
		this.state = {
			showTableItemModal: false,
			selectedTableNo: 0,
			selectedTableStatus: ''
		};
		
		this.handleShowTableModalClick = this.handleShowTableModalClick.bind(this);
		this.openTableSelected = this.openTableSelected.bind(this);
		this.closeTableSelected = this.closeTableSelected.bind(this);
		this.printBillFromTableSelected = this.printBillFromTableSelected.bind(this);
		this.payTableSelected = this.payTableSelected.bind(this);
	}
	
	public handleShowTableModalClick(tableNo:number, tableStatus:string): void{
		this.setState({
			showTableItemModal: true, 
			selectedTableNo: tableNo,
			selectedTableStatus: tableStatus
		});
	}
	
	public openTableSelected(){
		const { onOpenTable } = this.props;
		
		onOpenTable(this.state.selectedTableNo);
		
		this.setState({ showTableItemModal: false });
	}
	
	public closeTableSelected(){
		const { onCloseTable } = this.props;
		
		onCloseTable(this.state.selectedTableNo);
		
		this.setState({ showTableItemModal: false });
	}
	
	public printBillFromTableSelected(){
		const { onPrintTableBill } = this.props;
		
		onPrintTableBill(this.state.selectedTableNo);
		
		// Change state so that modal rerenders
		this.setState({ selectedTableStatus: TableConstants.STATUS_BILL_PRINTED});
	}
	
	public payTableSelected(){
		const { onPay } = this.props;
		
		onPay(this.state.selectedTableNo);
		
		this.setState({ showTableItemModal: false });
	}
	
	render(){
		//const { tables, visibilityFilter = 'SHOW_ALL', onOpenTable, onCloseTable } = this.props;
		const { tables } = this.props;
		var index: number = 0;
		
		return(
			<div>
				<table id="legendTable">
					<tbody>
						<tr>
							<td><div className='legendcolor grey_available'></div></td>
							<td>Available</td>
						</tr>
						<tr>
							<td><div className='legendcolor green_sendorder'></div></td>
							<td>Order Sent</td>
						</tr>
						<tr>
							<td><div className='legendcolor blue_billprinted'></div></td>
							<td>Bill Printed</td>
						</tr>
					</tbody>
				</table>
				<ul className='tableContainer'>
					{tables.map( table => (
						<li className={'table '+MapStatusToClass.values.get(table.status)} onClick={() => this.handleShowTableModalClick(table.tableNo, table.status)} key={index++}>
							{table.tableNo}
						</li>
					))}
				</ul>
				
				<TableItemsModal show={this.state.showTableItemModal} 
					tableNo={this.state.selectedTableNo} 
					tableStatus={this.state.selectedTableStatus}
					openTable={this.openTableSelected} 
					closeTable={this.closeTableSelected}
					printBill={this.printBillFromTableSelected}
					pay={this.payTableSelected}
				/>
			</div>
		);
	}
}

export default TableView;