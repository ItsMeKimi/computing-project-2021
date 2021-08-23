(function ($) {
    "use strict";
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


})(jQuery);


/*

function popupMenu(id, name, description, img) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.img = img;
    this.qty = 0

    this.addQty = function () {
        this.qty ++;
        document.getElementById("dish-qty").innerHTML = this.qty;
        //this.loadQty();
    };
    
    this.removeQty = function () {
        if (this.qty > 0) {
          this.qty --;
          document.getElementById("dish-qty").innerHTML = this.qty;
        } else {
          window.alert("No order to remove for this dish.")
        }
    };
}

*/