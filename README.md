# Kan-Ban

Lista de caracteristicas:

* Poder crear tareas
* Poder editar las tareas
* Poder eliminar las tareas 
* Poder ver las tareas en su correspondiente columna
* Poder mover las tareas entre columnas
* Poder *archivar* las tareas que esten en la columna final  

## Arquitectura

## Dominio

Clase *Table* que se asocia con la clase *Column*. La clase *Column* se almacena en un arreglo.
Clase *Table* se compone con la clase *TableView*.
Clase *Table* implementa la interfaz *table*.

Clase *TableView* implementa la interfaz *tableView*.
Clase *TableView* depende de la clase *Table*.

Clase *Column* se asocia con la clase *Task*. La clase *Task* se almacena en un arreglo.
Clase *Column* se compone con la clase *ColumnView*.
Clase *Column* implementa la interfaz *column*.

Clase *ColumnVIew* implemente la interfaz *columnVIew*.
Clase *ColumnView* depende de la clase *Column*

Clase *Task* se compone con la clase *TaskView*.
Clase *Task* implementa la interfaz *task*.

Clase *TaskView* implementa la interfaz.
Clase *TaskView* depende de la clase *Task*.

## Diseño UI

![UI diseño](https://i.postimg.cc/QdbBwTm2/Kan-Ban-Desing.png)

[Figma](https://www.figma.com/file/0kf41Bkdv5guhAoJBRkgAn/Kan-Ban?type=design&node-id=1%3A5&t=9FKY6mhJblsCZ5iF-1)

### Prototipo

![UI prototipo diseño](https://i.postimg.cc/zvwMtxHC/Kan-Ban-Prototipe.png)