# Kan-Ban

Kan-Ban es un aplicación web que permite utilizar un tablero Kanban virtual con tres columnas basicas, la aplicación no cuenta con ningun sistema de almacenamiento y por ende los datos se pierden al cerrarce la pestaña.

Lista de caracteristicas **implementadas**:

* Poder crear tareas
* Poder editar las tareas
* Poder eliminar las tareas 
* Poder ver las tareas en su correspondiente columna
* Poder mover las tareas entre columnas 

Lista de caracteristicas a implementar:

* Poder *archivar* las tareas para que apartadas del tablero sin ser eliminadas  

## Arquitectura
<br/>

### Relación entre clases

Clase *Task* implementa la interfaz *task*.<br/>
Clase *Task* se compone con la clase *DefaultTaskView*.

Clase *DefaultTaskView* implementa la interfaz *taskView*.<br/>
Clase *DefaultTaskView* depende de la clase *Task*.

Clase *Column* implementa la interfaz *column*.<br/>
Clase *Column* se compone con la clase *ColumnView*.<br/>
Clase *Column* agrega a la clase *Task*. La clase *Task* se almacena en un arreglo.

Clase *ColumnVIew* implemente la interfaz *columnVIew*.<br/>
Clase *ColumnView* depende de la clase *Column*.

Clase *Table* implementa la interfaz *table*.<br/>
Clase *Table* se compone con la clase *TableView*.<br/>
Clase *Table* agrega a la clase *Column*. La clase *Column* se almacena en un arreglo.

Clase *TableView* implementa la interfaz *tableView*.<br/>
Clase *TableView* depende de la clase *Table*.

El archivo *tableManager.ts* provee una función para acceder a la unica instancia de la clase *Table* que existe.

```typescript
    const table: table = getTable();
```

## Diagrama de dependencia entre componentes

[...]

## Diseño de la interfaz grafica

![UI diseño](https://i.postimg.cc/Z5BNX8vn/Kanban-Board.png)

[Figma](https://www.figma.com/file/0kf41Bkdv5guhAoJBRkgAn/Kan-Ban?type=design&node-id=1%3A5&t=9FKY6mhJblsCZ5iF-1)

### Prototipo de la interfaz grafica

![UI prototipo diseño](https://i.postimg.cc/zvwMtxHC/Kan-Ban-Prototipe.png)