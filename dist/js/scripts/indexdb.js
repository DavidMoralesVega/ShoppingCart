// Variables

let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
const DataBaseName = 'ecommerce';

// Metodos

// Inicializar la DataBase
const ConnectDB = (Fallback) => {

    // Crear o abrir la base de datos
    let request = indexedDB.open(DataBaseName, 2);

    // Cuando la tarea tenga un error
    request.onerror = LogError;

    // Cuando la tarea sea exitosa
    request.onsuccess = () => {
        Fallback(request.result);
    };

    request.onupgradeneeded = (e) => {
        // console.log('running onupgradeneeded');
        let db = e.currentTarget.result;

        // uncomment if we want to start clean
        // if(Db.objectStoreNames.contains(StoreName)) Db.deleteObjectStore('note');

        // Create store
        if (!db.objectStoreNames.contains('products')) {
            let store = db.createObjectStore('products', { keyPath: 'IdProduct' });
            // store.createIndex('NameIndex', ['name.last', 'name.first'], { unique: false });
        };

        if (!db.objectStoreNames.contains('cart')) {
            let store = db.createObjectStore('cart', { keyPath: 'IdCart', autoIncrement: true });
            // store.createIndex('NameIndex', ['name.last', 'name.first'], { unique: false });
        };

        ConnectDB(Fallback);
    }
}

// Obtener un elemento
const GetOneObject = (Object, IdObject, Fallback) => {
    ConnectDB((db) => {
        let transaction = db.transaction([Object], 'readonly').objectStore(Object).get(IdObject);
        transaction.onerror = LogError;
        transaction.onsuccess = () => {
            Fallback(transaction.result ? transaction.result : -1);
        };
    });
}

// Obtener todos los elementos
const GetAllObject = (Object, Fallback) => {
    ConnectDB((db) => {

        let Rows = [];
        let store = db.transaction([Object], 'readonly').objectStore(Object);

        if (store.mozGetAll)
            store.mozGetAll().onsuccess = function (e) {
                Fallback(e.target.result);
            };
        else
            store.openCursor().onsuccess = function (e) {
                let cursor = e.target.result;
                if (cursor) {
                    Rows.push(cursor.value);
                    cursor.continue();
                }
                else {
                    Fallback(Rows);
                }
            };
    });
}

// Agregar un elemento
const AddObject = (Object, Data, Info) => {

    Info = typeof Info !== 'undefined' ? false : true;

    ConnectDB((db) => {

        let transaction = db.transaction([Object], 'readwrite');
        let objectStore = transaction.objectStore(Object);
        let objectStoreRequest = objectStore.add(Data);

        objectStoreRequest.onerror = LogError;

        objectStoreRequest.onsuccess = () => {
            if (Info) { console.log('Exitoso'); }
            else { console.log('Actualizado'); }
            // console.log(objectStoreRequest.result);
        };

    });
}

// Eliminar un elemento
const DeleteObject = (Object, IdObject, Info) => {

    Info = typeof Info !== 'undefined' ? false : true;

    ConnectDB((db) => {

        let transaction = db.transaction([Object], 'readwrite');
        let objectStore = transaction.objectStore(Object);
        let objectStoreRequest = objectStore.delete(IdObject);
        objectStoreRequest.onerror = LogError;

        objectStoreRequest.onsuccess = () => {
            if (Info)
                console.log('Eliminado', IdObject);
        }
    });
}


const LogError = (error) => {

    console.log(error);

};

// Actualizar un elemento
const UpdateObject = (Object, IdObject, NewData) => {

    DeleteObject(Object, Number(IdObject));
    AddObject(Object, NewData);

}

