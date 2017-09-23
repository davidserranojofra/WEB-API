# WebAPI NodePOP

### Requisitos previos
+ Se requiere tener instalado [***Node.js***](https://nodejs.org/es/) en la versión 8.4 o posterior
+ Una terminal.
+ Opcional instalar [***Nodemon***](https://github.com/remy/nodemon)


### Instalación:
1. Clonar el repo
2. Entrar dentro de la carpeta ***WEB-API*** a través de la terminal.
3. Ejecutar ***npm install*** para instalar todas las dependencias del proyecto.
4. Descargar ***mongoDb*** 
5. Crear una carpeta donde queramos guardar las bases de datos de mongo, por ejemplo dentro de la carpeta ***mongoDb*** creo una carpeta ***data*** y dentro otra carpeta ***db***
6. En el package.json modificar el ***arrancaDB*** con la primera ruta, que pertenecería a la carpeta mongoDb/bin/mongod (ej)***./../../mongodb/bin/mongod*** y la segunda ruta pertenecería a las carpetas de donde queremos guardar la base de datos (ej)***./../../mongodb/data/db*** 
7. ejecutar en la carpeta de ***WEB-API*** desde el terminal ***npm run arrancaDB***
8. Dejamos esa terminal en ejecución y abrimos otra.
9. Entramos en la carpeta ***WEB-API*** y ejecutamos ***Nodemon*** si lo tenemos instalado o npm start.

Con esto ya estaría funcionando, si ademas queremos cargar el anuncios.json para tener artículos de ejemplo, en otro terminal desde la carpeta ***WEP-API*** ejecutamos ***npm run installDB*** (¡¡Ojo primero borrara todo lo que se encuentre en la base de datos!!).



### Uso del API

#### Método GET

Acceder al API --> **localhost:3000/apiv1/anuncios**

En esta ruta devolverá todos los anuncios existentes ordenador por precio de menor a mayor.

Las búsquedas se realizarán mediante el método GET y a traves de queryString ej: **localhost:3000/apiv1/anuncios?nombre=bici&venta=true**

#### Filtros implementados:

Nombre --> ?nombre=
Tags ----> ?tags=
Precio --> ?precio=0-140    (pasándole dos valores de mínimo y máximo)
Saltar --> ?saltar=         (Se saltara x anuncios)
Mostrar -> ?mostrar=        (mostrara solo x anuncios)
Venta ---> ?venta=          (***true*** = mostrar anuncios "En venta", ***false*** = mostrara los anuncios "Se busca")


#### Método POST

Se podrán implementar inserciones a la base de datos a través de un envío POST url: **localhost:3000/apiv1/anuncios** con los siguientes campos:

{
    nombre: string,
    venta: boolean,
    precio: number,
    foto: string,
    tags: [string]
}


#### Método UPDATE

Se podrán implementar modificaciones a la base de datos a través de un envío PUT url: **localhost:3000/apiv1/anuncios/id** pasando solo los valores a modificar y su id en la url.


#### Método DELETE

Se podrá hacer borrado de los artículos a través del método DELETE a la url: **localhost:3000/apiv1/anuncios/id** pasándole en la url la id a borrar.