// Other Other Code

class dish {
    constructor(name, description, price, image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.qty = 0;
    }

    addQty() {
        this.qty++;
        document.getElementById("dish-qty").innerHTML = this.qty;
        OpenPopup("add")
    }

    removeQty() {
        if (this.qty > 0) {
            this.qty--;
            document.getElementById("dish-qty").innerHTML = this.qty;
            OpenPopup("remove")
        } else {
            window.alert("No order to remove for this dish.")
        }
    }
}

var dishes = [];

const chickenRice = new dish('Chicken Rice', 'Chicken rice is a traditional hainanese dish that incorporates fragrant poached chicken and aromatic rice. Served with ginger chilli sauce on the side.', 3, 'https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg')
dishes.push(chickenRice)
const spicyChickenNoodle = new dish('Spicy Chicken Noodle', 'Spicy chicken noodle is a flavourful bowl of hot ramen soup with appetising chicken soup base. ', 4, 'https://raw.githubusercontent.com/ItsMeKimi/computing-project-2021/master/myapp/static/img/Hainanese_Chicken_Rice.jpg')
dishes.push(spicyChickenNoodle)

function disp(){
    /*dishes.forEach(function(dish, index) {
      if dish.qty != 0 {
        document.getElementById("dish-details").innerHTML += "<p>dish, dishQty</p>";
      }
    });*/
    var track = '<table style="width:100%">' + '<tr>' + '<th>Dish</th>' + '<th>Quantity</th>' + '<th>Price</th>' + '</tr>';// + '<tr>' + '<td>' + dishes[0].name + '</td>' + '<td>' + dishes[0].qty + '</td>' + '</tr>';
    
    var total_price = 0;/*var total-price = 0;*/
  
    /*document.getElementById("dish-details").innerHTML = 
    '<table style="width:100%">' + '<tr>' + '<th>Dish</th>' + '<th>Quantity</th>' + '</tr>'; 
  
    /*  document.getElementById("dish-details").innerHTML += '<tr><th>Dish</th><th>Quantity</th></tr>';document.getElementById("dish-details").innerHTML += '<th> Dish</th>';
    document.getElementById("dish-details").innerHTML += '<th> Quantity</th>';
    document.getElementById("dish-details").innerHTML += '<tr>';*/
  
    for (var i = 0; i < dishes.length; i++){
        if (dishes[i].qty != 0) {
            track += '<tr>' + '<td>' + dishes[i].name + '</td>' + '<td>' + dishes[i].qty + '</td>' + '<td>' + '$' + dishes[i].price * dishes[i].qty + '</td>' + '</tr>';
            total_price += dishes[i].qty * dishes[i].price;
            /*document.getElementById("dish-details").innerHTML += '<tr>';
            document.getElementById("dish-details").innerHTML += '<td>' + dishes[i].name + '</td>';
            document.getElementById("dish-details").innerHTML += '<td>' + dishes[i].qty + '</td>';
            document.getElementById("dish-details").innerHTML += '</tr>';*/
        }
    }
  
  
    /*  if (document.getElementById('dish-details').innerHTML === "") {
        document.getElementById("dish-details").innerHTML += '<p> None </p>';
        }*/
    track += '<tr>' + '<td style="text-align:center;"><b>Summary</b></td>' + '<td style="text-align: center;"><b>Net Total</b></td>' + '<td>' + '$' + total_price + '</td>' + '</tr>';
    document.getElementById("dish-details").innerHTML = track + '</table>' ;
    document.getElementById("order-modal").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function Closeordermodal() {
    //document.getElementById("generic-modal").innerHTML = " "
    //document.getElementById("dish-details").innerHTML = '';
    document.getElementById("order-modal").style.display = "none";
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownbtn() {
    document.getElementById("myDropdown").classList.toggle("show");
}

    // Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function OpenPopup(operation) {
    if (operation == "add") {    
        document.getElementById("popup").style.display = "flex";    
        document.getElementById("popup-text").innerHTML = "Successfully added";
        document.getElementById("popup").style.display = "flex";
        ClosePopup();
    } else if (operation == "remove") {
        document.getElementById("popup-text").innerHTML = "Successfully removed";
        document.getElementById("popup").style.display = "block";
        ClosePopup();
    }
}

function ClosePopup() {
    setTimeout(function() {document.getElementById("popup").style.display = "none"}, 2000);
  }
  

function OpenModal(dish) {
    document.getElementById("dish-image").src = dish.image;
    document.getElementById("dish-name").innerHTML = dish.name;
    document.getElementById("dish-description").innerHTML = dish.description;
    document.getElementById("dish-price").innerHTML = 'Price: $' + dish.price;
    document.getElementById("dish-qty").innerHTML = dish.qty;
    document.getElementById("dish-remove").onclick = function () { dish.removeQty() };
    document.getElementById("dish-add").onclick = function () { dish.addQty() };
    /*document.getElementById("dish-add").setAttribute("onclick",dish.addQty());*/
  
    /*document.getElementById("QtyStatus").innerHTML = */
    //document.getElementById("generic-modal").innerHTML = '<p>' + 'this' + '</p>';
  
    //document.getElementById("generic-modal").innerHTML = dish; /* original*/
  
    //document.getElementById("generic-modal").innerHTML = '</div>';
    document.getElementById("generic-modal").style.display = "block";
}

function CloseModal() {
    //document.getElementById("generic-modal").innerHTML = " "
    document.getElementById("generic-modal").style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.getElementById("generic-modal")) {
      document.getElementById("generic-modal").style.display = "none";
    }
    if (event.target == document.getElementById("order-modal")) {
      document.getElementById("order-modal").style.display = "none";
    }
}

function OpenCart() {
    window.open("Order-Summary.html", "_blank");
};