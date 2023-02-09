import {menuArray} from '/data.js'
const orderForm = document.getElementById("order-form")
const confimationBox = document.getElementById("confirmation-box")

let orderList = []


document.addEventListener("click", function(e){
    if (e.target.dataset.add) {
        addToCart(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        removeFromCart(e.target.dataset.remove)
    } else if (e.target.id === "shopping") {
        displayShoppingCart()
    } else if (e.target.id === "order-btn") {
         displayPaymentModal() 
    } else if (e.target.id === "modal-close-btn") {
        hidePaymentModal()
    }  
})

orderForm.addEventListener("submit", function(e) {
    e.preventDefault()
    hidePaymentModal()
    hideShoppingCart()
    displayOrderConfirmation()
})
        



function addToCart(itemId) {   
    const targetItem = menuArray.filter(function(item) {
        return item.id.toString() === itemId
    })[0]
    targetItem.amount ++
    if (orderList.includes(targetItem)) {        
    } else {
         orderList.push(targetItem)
    }
    renderOrderList()
    displayShoppingCart()
}


function removeFromCart(itemId) {
    const targetItem = menuArray.filter(function(item) {
        return item.id.toString() === itemId
    })[0]
    targetItem.amount--
    orderList = orderList.filter(function(item) {
        return item.amount > 0
    })
    
    renderOrderList()
}

function renderOrderList() {
   let orderListHtml = ""
    let totalPrice = 0
    let dollarSign = "$"
    
    orderList.forEach(function(item) {
        orderListHtml += `
        <div class="cart-item">
            <h3 class="cart-item-title"> ${item.name} <span class="item-amount">(${item.amount})</span></h3>
            <button class="remove-btn" id="remove-btn" data-remove="${item.id}">remove</button>
            <h4 class="cart-item-price">${dollarSign}${item.price*item.amount}</h4>
        </div>
        `
        totalPrice += item.price * item.amount
    }) 
    
    
    document.getElementById("cart-sum-total").textContent = totalPrice
    document.getElementById("cart-items-list").innerHTML = orderListHtml
}

function displayShoppingCart() {
    document.getElementById("shopping-cart").style.display = "flex"
    confimationBox.style.display = "none"
}

function hideShoppingCart() {
    document.getElementById("shopping-cart").style.display = "none"
}

function displayPaymentModal() {
    document.getElementById("modal").style.display = "inline"
    orderList = []
}

function hidePaymentModal() {
    document.getElementById("modal").style.display = "none"
    
}

function displayOrderConfirmation() {
    const orderFormData = new FormData(orderForm)
    const fullName = orderFormData.get('fullName')
    const tel = orderFormData.get('tel')
    
    
    confimationBox.style.display = "flex"
    confimationBox.innerHTML += `
    <div>
        Thanks <span class="orange-text">${fullName}</span>! <br>
        You order is being prepeared. We'll text you on <span class="orange-text">${tel}</span> when it's ready
    </div>`
    
}
    
function getMenuHtml() {
    let feedHtml = ""
    menuArray.forEach(function(item) {
        feedHtml += `
         <article>
         <div class="item">
            <img src="${item.image}" class="item-image">
            <div class="item-description">
                <h3 class="item-type">${item.name}</h3>
                <p class="item-ingredients">${item.ingredients}</p>
                <h3 class="item-price">€${item.price}</h3>
            </div>
            <i class="fa-light fa-plus add" data-add="${item.id}" id="add-btn"></i>
        </div>              
        </article>
        `
    })
    return feedHtml
}


function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHtml()
}

renderMenu()