// List of vars (dishs)


var dish0 = {
    id: 0,
    dishName: "Donut",
    price: '$1.50',
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
    // Harder to implement ETA feature - possibly in an update?
    // ETA: 0,
    // For dishes that require additional information on them
    // Note: ''
};

var dish1 = {
    id: 1,
    dishName: "French Toast",
    price: '$1.40',
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var dish2 = {
    id: 2,
    dishName: "Mac & Cheese",
    price: '$2',
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

var dish3 = {
    id: 3,
    dishName: "Croissant",
    price: '$1.70',
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
};

function getDishData(id) {
    switch (id) {
        case '0':
            return dish0;
            break;
        case '1':
            return dish1;
            break;
        case '2':
            return dish2;
            break;
        case '3':
            return dish3;
            break;
        default:
            return;
    };
};

// Other Code

var dataModal = document.getElementById('Modal');

// Since these values do not need to be declared everytime, 
// they will remain as global variables

var addButton = dataModal.querySelector('#addDishButton');
var removeButton = dataModal.querySelector('#removeDishButton');
var saveChangesButton = dataModal.querySelector('#saveChanges');

var bootstrapModal = bootstrap.Modal.getOrCreateInstance(dataModal);

// End global variables

var orderQuantity = dataModal.querySelector('#dishQty')

// Default blank order list
// Stored in the form of a Javascript Object with key-value pairs
// Key is the id of the dish
// Value is the Qty of the dish

var orders = {

};

// End default blank order list

function finaliseOrders() {
    let currentOrderQuantity = 
    closeModal();
};

function closeModal() {
    bootstrapModal.hide();
};

saveChangesButton.onclick = function () {
    finaliseOrders();
};

dataModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var internalData = button.getAttribute('data-bs-internalData');

    let dishData = getDishData(internalData);

    var modalImg = dataModal.querySelector('#modalImg');
    var modaldishName = dataModal.querySelector('.modal-title');
    var additionalNotes = dataModal.querySelector('#notes');

    function addPriceToTitle(price) {
        let _temp = ' (' + price + ')';

        return _temp
    };

    function ifAdditionalNotes() {
        let _temp = dishData['note'];
        if (_temp == undefined) {
            return
        } else {
            return 'Note: ' + _temp
        }
    }

    modalImg.src = dishData.img;
    modaldishName.textContent = dishData.dishName + addPriceToTitle(dishData.price);
    additionalNotes.textContent = ifAdditionalNotes();

    // Parts subject to change

    // Set value to 0 every time it is opened (assuming not saved)
    orderQuantity.value = 0;

    addButton.onclick = function () {
        orderQuantity.value++;
        ensureLegal();
    };
    
    removeButton.onclick = function () {
        orderQuantity.value--;
        ensureLegal();
    };
    
    orderQuantity.oninput = function (e) {
        updateValue(e);
    };

    function updateValue(e) {
        orderQuantity.value = e.target.value;
        ensureLegal();
    };

    function ensureLegal() {
        if (orderQuantity.value.length == 0) {
            orderQuantity.value = 0;
        } else if (orderQuantity.value.length >= 2) {
            if (orderQuantity.value != 10) {
                orderQuantity.value = 0;
            };
        } else {
            if (orderQuantity.value > 10) {
                orderQuantity.value = 10;
            } else if (orderQuantity.value < 0) {
                orderQuantity.value = 0;
            }
        }
    };
});

