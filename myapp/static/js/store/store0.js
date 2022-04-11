// List of vars (dishs)

// Start

var DishID1 = {
    DishID: 1,
    DishName: "Donut",
    ImgURL: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
    Price: '$1.50',
};

var DishID2 = {
    DishID: 2,
    DishName: "French Toast",
    ImgURL: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
    Price: '$1.40',
};

var DishID3 = {
    DishID: 3,
    DishName: "Mac & Cheese",
    ImgURL: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
    Price: '$2.00',
};

var DishID4 = {
    DishID: 4,
    DishName: "Croissant",
    ImgURL: "https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg",
    Price: '$1.70',
};

function getDishData(id) {
    switch (id) {
        case 'DishID1':
            return DishID1;
            break;
        case 'DishID2':
            return DishID2;
            break;
        case 'DishID3':
            return DishID3;
            break;
        case 'DishID4':
            return DishID1;
            break;
        default:
            return;
    };
};

// End

// Other Code

var dataModal = document.getElementById('Modal');

// Since these values do not need to be declared everytime, 
// they will remain as global variables

var addButton = dataModal.querySelector('#addDishButton');
var removeButton = dataModal.querySelector('#removeDishButton');
var saveChangesButton = dataModal.querySelector('#saveChanges');
var orderQuantityBox = dataModal.querySelector('#dishQty')

var bootstrapModal = bootstrap.Modal.getOrCreateInstance(dataModal);

// End global variables

// Default blank order list
// Stored in the form of a Javascript Object with key-value pairs
// Key is the id of the dish
// Value is the Qty of the dish

var orderArray = []

// End default blank order list

function closeModal() {
    bootstrapModal.hide();
};

// 1 Nov 12.29am | Perhaps move these into the modal below to get the internalData,
// then follow up by adding to orders list in key, value pair of [ID, # to buy]

$('#Modal').on('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var internalData = button.getAttribute('data-bs-internalData');

    let dishData = getDishData(internalData)

    var modalImg = dataModal.querySelector('#modalImg');
    var modaldishName = dataModal.querySelector('.modal-title');
    // var additionalNotes = dataModal.querySelector('#notes');

    function addPriceToTitle(price) {
        let _temp = ' (' + price + ')';

        return _temp
    };

    modaldishName.textContent = dishData.DishName + addPriceToTitle(dishData.Price);
    modalImg.src = dishData.ImgURL;
    // additionalNotes.textContent = ifAdditionalNotes();

    // For the modal's buttons and qty display


    if (orderArray.length > 0) {
        var _exists = false;
        for (index in orderArray) {
            var _singleOrder = orderArray[index];
            if (_singleOrder[0] == dishData.DishName) { // Order exists in Array
				orderQuantityBox.value = _singleOrder[1];
				var orderQuantity = _singleOrder[1];
                _exists = true;
			}

            if (_exists == true) {
                break;
            }
        }

        if (_exists = true) {
            console.log('Found order in orderArray');
        } else {
            console.log('orderArray is non-empty but order does not exist');
        }
    } else {
        orderQuantityBox.value = 0;
        var orderQuantity = 0;
    }

    addButton.onclick = function () {
        orderQuantity++;
		ensureLegal();
		updateOrderQuantityBox();
    };
    
    removeButton.onclick = function () {
        orderQuantity--;
		ensureLegal();
		updateOrderQuantityBox();
    };

	function ensureLegal() {
        if (orderQuantity > 10) {
            orderQuantity = 10;
        } else if (orderQuantity < 0) {
            orderQuantity = 0;
        } else if (Number(orderQuantity) == NaN) {
            orderQuantity = 0;
        };
    };

	function updateOrderQuantityBox() {
		orderQuantityBox.value = orderQuantity; // Could be valueAsNumber ?
        console.log('OrderQuantity: ' + orderQuantity)
        console.log('orderQuantityBox: ' + orderQuantityBox.value)
	}

	// Submit button stuff

	function finaliseCurrentOrder() {
		let _key = dishData.DishName
		let _value = orderQuantity
		// Ignore those with 0 value
		if (_value > 0) {
			let order = [_key, _value]
			orderArray.push(order)
		}
		closeModal()
	}

	saveChangesButton.onclick = function () {
		finaliseCurrentOrder();
	};
});