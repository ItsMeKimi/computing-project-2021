// List of vars (dishs)


var dish0 = {
    id: 0,
    dishName: "Donut",
    price: '$1.50',
    img: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
    // Harder to implement ETA feature - possibly in an update?
    // ETA: 0,
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

function getdish(id) {
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
dataModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var internalData = button.getAttribute('data-bs-internalData');

    let dishData = getdish(internalData);

    var modalImg = dataModal.querySelector('#modalImg');
    var modaldishName = dataModal.querySelector('.modal-title');
    //var modaldishDescription = dataModal.querySelector('#modalDescription');

    function addPriceToTitle(price) {
        let _temp = ' (' + price + ')';

        return _temp
    }

    modalImg.src = dishData.img;
    modaldishName.textContent = dishData.dishName + addPriceToTitle(dishData.price);
    //modaldishDescription.textContent = dishData.dishDescription;

    var orderQuantity = dataModal.querySelector('#dishQty');

    // Add Event Listeners to both Add and Remove buttons

    var addButton = dataModal.querySelector('#addDishButton');
    var removeButton = dataModal.querySelector('#removeDishButton');
    var inputField = dataModal.querySelector('#dishQty');

    addButton.addEventListener('click', function (event) {
        orderQuantity.value++;
        ensureLegal();
    });

    removeButton.addEventListener('click', function (event) {
        orderQuantity.value--;
        ensureLegal();
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