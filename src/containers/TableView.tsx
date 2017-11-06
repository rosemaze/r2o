
import TableView from '../components/TableView';
import * as actions from '../actions';
import { State } from '../store/index';
import { connect, Dispatch } from 'react-redux';


interface DispatchFromProps {
  onOpenTable: (tableNo:number) => void;
  onCloseTable: (tableNo:number) => void;
  onPrintTableBill: (tableNo:number) => void;
  onPay: (tableNo:number) => void;
}


export function mapStateToProps(state: State){
	return {
		tables: state.tableView.tables
	}
}

export function mapDispatchToProps(dispatch: Dispatch<actions.TableAction>) {
  return {
    onOpenTable: (tableNo:number) => dispatch(actions.openTable(tableNo)),
    onCloseTable: (tableNo:number) => dispatch(actions.closeTable(tableNo)),
	onPrintTableBill: (tableNo:number) => dispatch(actions.printTableBill(tableNo)),
	onPay: (tableNo:number) => dispatch(actions.pay(tableNo))
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(TableView);
export default connect<any, DispatchFromProps, any>(
  mapStateToProps,
  mapDispatchToProps
)(TableView);

