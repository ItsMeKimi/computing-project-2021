// List of vars (Stores)


var store0 = {
    id: 0,
    storeId: '',
    storeName: "Cafe",
    storeDescription: "This store sells a variety of pastries and snacks.",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
    // Harder to implement ETA feature - possibly in an update?
    // ETA: 0,
};

var store1 = {
    id: 1,
    storeId: 'Store 1',
    storeName: "Chicken Rice",
    storeDescription: "This store primarily sells Chicken Rice, along with others like Chicken Porridge and Chicken Noodles.",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var store5 = {
    id: 5,
    storeId: 'Store 5',
    storeName: "Japanese Food",
    storeDescription: "This store sells popular Japanese meals.",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var store9 = {
    id: 9,
    storeId: 'Store 9',
    storeName: "Korean Food",
    storeDescription: "",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var store10 = {
    id: 10,
    storeId: 'Store 10',
    storeName: "Vegetarian Food",
    storeDescription: "",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var store11 = {
    id: 11,
    storeId: 'Store 11',
    storeName: "Thai Food",
    storeDescription: "",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var store12 = {
    id: 12,
    storeId: 'Store 12',
    storeName: "Western Food",
    storeDescription: "",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var store13 = {
    id: 13,
    storeId: 'Store 13',
    storeName: "Ah Ma Mixed Chinese Rice",
    storeDescription: "",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var store15 = {
    id: 15,
    storeId: 'Store 15',
    storeName: "Malay Food",
    storeDescription: "",
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

function getStore(id) {
    switch (id) {
        case '0':
            return store0;
            break;
        case '1':
            return store1;
            break;
        case '5':
            return store5;
            break;
        case '9':
            return store9;
            break;
        case '10':
            return store10;
            break;
        case '11':
            return store11;
            break;
        case '12':
            return store12;
            break;
        case '13':
            return store13;
            break;
        case '15':
            return store15;
            break;
        default:
            return;
    };
};

// Other Code

var dataModal = document.getElementById('Modal');
dataModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var internalData = button.getAttribute('data-bs-internalData');

    let storeData = getStore(internalData);

    var modalImg = dataModal.querySelector('#modalImg');
    var modalStoreName = dataModal.querySelector('.modal-title');
    var modalStoreDescription = dataModal.querySelector('#modalDescription');

    if (storeData.storeId != 0) {
        var storeString = ' (' + storeData.storeId + ')';
    } else {
        var storeString = ''
    }

    modalImg.src = storeData.img;
    modalStoreName.textContent = storeData.storeName + storeString;
    modalStoreDescription.textContent = storeData.storeDescription;

    var orderQuantity = dataModal.querySelector('#dishQty');

    // Add Event Listeners to both Add and Remove buttons

    var addButton = dataModal.querySelector('#addDishButton');
    var removeButton = dataModal.querySelector('#removeDishButton');
    var inputField = dataModal.querySelector('#dishQty');

    addButton.addEventListener('click', function (event) {
        orderQuantity.value++;
        ensureLegal();
        console.log(orderQuantity.value);
    });

    removeButton.addEventListener('click', function (event) {
        orderQuantity.value--;
        ensureLegal();
        console.log(orderQuantity.value);
    });

    inputField.addEventListener('change', updateValue);

    function updateValue(e) {
        orderQuantity.value = e.target.value;
        ensureLegal();
    };

    function ensureLegal() {
        if (orderQuantity.value > 10) {
            orderQuantity.value = 10;
        } else if (orderQuantity.value < 0) {
            orderQuantity.value = 0
        };
    };

    // To ensure that orders that are too long do not exist
})