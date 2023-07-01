export function loadDragAndDropLibraryFunctions() {
    const containers = document.querySelectorAll('.column')
    const droppable = new Draggable.Droppable(containers, {
        draggable: '.task',
        droppable: '.column__taskList'
    });
    droppable.on('drag:start', () => console.log('drag:start'));
    droppable.on('droppable:over', () => console.log('droppable:over'));
    droppable.on('droppable:out', () => console.log('droppable:out'));
}
const tableContainer = document.getElementById('tableContainer');
const observer = new MutationObserver((mutationsList, observer) => {
    loadDragAndDropLibraryFunctions();
});
const observerOptions = {
    childList: true,
    subtree: false,
    characterData: false
};
observer.observe(tableContainer, observerOptions);