import { table } from "../model/tableModel/tableInterface";
import { tableView } from "../model/tableModel/tableViewInterface";
import TableView from "../view/tableView";

export default class TableController {
    view: tableView;
    model: table;
    constructor(table: table) {
        this.model = table;
        this.view = new TableView();
    }
    show(): any {
        this.view.showTable([...this.model.columns])
    }
}