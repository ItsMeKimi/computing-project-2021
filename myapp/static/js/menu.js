// List of Consts (Stores)

const store0 = {
    id: 0,
    storeName: "Cafe",
    storeDescription: "This store sells a variety of pastries and snacks.",
    // Harder to implement ETA feature - possibly in an update?
    // ETA: 0,
};

const store1 = {
    id: 1,
    storeName: "Chicken Rice",
    storeDescription: "This store primarily sells Chicken Rice, along with others like Chicken Porridge and Chicken Noodles."
};

const store5 = {
    id: 5,
    storeName: "Japanese Food",
    storeDescription: "This store sells popular Japanese meals."
};

const store9 = {
    id: 9,
    storeName: "Korean Food",
    storeDescription: ""
};

const store10 = {
    id: 10,
    storeName: "Vegetarian Food",
    storeDescription: ""
};

const store11 = {
    id: 11,
    storeName: "Thai Food",
    storeDescription: ""
};

const store12 = {
    id: 12,
    storeName: "Western Food",
    storeDescription: ""
};

const store13 = {
    id: 13,
    storeName: "Ah Ma Mixed Chinese Rice",
    storeDescription: ""
};

const store15 = {
    id: 15,
    storeName: "Malay Food",
    storeDescription: ""
};

// Other Code

function getModal(id) {
    if (id == '0') {
        return store0
    }
};

function chooseModal(id) {
    value = getModal(id);

    this.id = value.id;
    this.storeName = value.storeName;
    this.storeDescription = value.storeDescription;

    document.getElementById('')
};