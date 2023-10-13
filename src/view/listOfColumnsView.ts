
interface columnInListInformationForView {
    name: string;
    id: string;
}
type listOfColumns = columnInListInformationForView[];

export default class ListOfColumnsView {
    listOfColumns: listOfColumns;
    constructor(listOfColumns: listOfColumns) {
        this.listOfColumns = listOfColumns;
    }
    private getHTMLContainerElement(): HTMLElement {
        return document.querySelector<HTMLElement>('#columns')!;
    }
    private getHTMLColumnElement({ name, id }: columnInListInformationForView): HTMLElement {
        const columnElement: HTMLElement = document.createElement('LI')
        columnElement.classList.add('columns__column')
        columnElement.setAttribute('id', id)
        columnElement.innerHTML = `
            <p columnName="${name}">${name}</p>
            <footer id="${id}">
                <div id="${id}">
                    <button option="movePrev"> <- </button>
                    <button option="moveNext"> -> </button>
                </div>
                <div id="${id}">
                    <button option="edit">Editar</button>
                    <button option="delete">Eliminar</button>
                </div>
            </footer>
        `;
        return columnElement
    }
    show() {
        const listOfColumnsFragmentElement = document.createDocumentFragment()
        this.listOfColumns.forEach(column => {
            const columnElement = this.getHTMLColumnElement(column);
            listOfColumnsFragmentElement.appendChild(columnElement);
        })
        const listOfColumnsHTMLContainer = this.getHTMLContainerElement();
        listOfColumnsHTMLContainer.innerHTML = '';
        listOfColumnsHTMLContainer.appendChild(listOfColumnsFragmentElement);
    }
}