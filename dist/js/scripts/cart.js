// Variables
const ContainerProductsCart = document.getElementById('ContainerProductsCart');
const TimeImport = document.getElementById('TimeImport');
const TotalAmount = document.getElementById('TotalAmount');
// Eventos

document.addEventListener('DOMContentLoaded', () => {
    EventListenersCart();
    RenderProductsCard();
});

const EventListenersCart = () => {
    ContainerProductsCart.addEventListener('click', DeleteProductCart);
    ContainerProductsCart.addEventListener('change', DeleteProductCart);
};

// Metodos

const RenderProductsCard = (ResultProducts) => {

    RemoveAllChildNodes(ContainerProductsCart);

    ResultProducts.forEach(Product => {

        console.log(Product);

        let SubTotal = (Number(Product.Quantity) * Number(Product.Price)).toFixed(2);

        const TemplateItemString = `
        <div id="card" class="row border-bottom mb-5 mt-3">
            <div class="col-md-2 mb-4 mb-md-0">
                <div class="bg-image ripple rounded-5 mb-4 overflow-hidden d-block" data-ripple-color="light">
                    <img src="${Product.Url}"
                        class="w-100" alt="" />
                    <a href="#!">
                        <div class="hover-overlay">
                            <div class="mask" style="background-color: hsla(0, 0%, 98.4%, 0.2)">
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div class="col-md-8 mb-4 mb-md-0">
                <p class="fw-bold">${Product.Name}</p>
                <p class="mb-1">
                    <span class="text-muted me-2">Category:</span><span>${Product.Category}</span>
                </p>
                <p>
                    <span class="text-muted me-2">Promoción:</span><span>${Product.Promotion}</span>
                </p>

                <p class="mb-4">
                    <a IdCart="${Product.IdCart}" class="BtnDeleteProduct text-muted pe-3 border-end">
                        <small IdCart="${Product.IdCart}" class="BtnDeleteProduct">
                            <i class="fas fa-trash me-2"></i>Eliminar
                        </small>
                    </a>
                </p>
            </div>

            <div class="col-md-2 mb-4 mb-md-0">
                <div class="form-outline mb-4">
                    <input
                    type="number"
                    id="${Product.IdCart}"
                    IdProduct="${Product.IdProduct}"
                    Name="${Product.Name}"
                    Category="${Product.Category}"
                    Url="${Product.Url}"
                    Promotion="${Product.Promotion}"
                    Color="${Product.Color}"
                    Price="${Product.Price}"
                    Quantity="${Product.Quantity}"
                    class="InputQuantity form-control" value="${Product.Quantity}" min="1" />
                    <label class="form-label" for="${Product.IdCart}">Cantidad</label>
                </div>

                <h5 class="mb-2">
                    <span class="align-middle">${SubTotal} Bs.</span>
                    <input type="hidden" class="InputPrice" value="${SubTotal}"/>
                </h5>
            </div>
        </div>`;

        let TemplateItem = new DOMParser().parseFromString(TemplateItemString, 'text/html').body.querySelector('#card');


        ContainerProductsCart.append(TemplateItem);
        InitFormOutline();
    });

    CalculateAmount();

};

GetAllObject('cart', RenderProductsCard);


const DeleteProductCart = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('BtnDeleteProduct')) {
        
        let IdCart = e.target.attributes['IdCart'].value;

        DeleteObject('cart', Number(IdCart));
        ShowMessage('Producto eliminado', 'danger');
        GetAllObject('cart', RenderProductsCard);
        CalculateAmount();
    };

    if (e.target.classList.contains('InputQuantity')) {
        
        let IdCart = e.target.attributes['id'].value;
        let Quantity = Number(e.target.attributes['Quantity'].value);
        let NewQuantity = Number(e.target.value);

        if (Quantity !== NewQuantity) {
            
            let CartInfoNew = {
                IdCart: Number(IdCart),
                IdProduct: e.target.attributes['IdProduct'].value,
                Name: e.target.attributes['Name'].value,
                Category: e.target.attributes['Category'].value,
                Url: e.target.attributes['Url'].value,
                Promotion: e.target.attributes['Promotion'].value,
                Color: e.target.attributes['Color'].value,
                Price: e.target.attributes['Price'].value,
                Quantity: NewQuantity
            };
    
            UpdateObject('cart', Number(IdCart), CartInfoNew);
            GetAllObject('cart', RenderProductsCard);
        };


    };
};


const CalculateAmount = () => {
    let Total = 0;

    const InputPrice = document.getElementsByClassName('InputPrice');
    InputPrice.forEach(IPrice => Total += Number(IPrice.value));

    Total = Total.toFixed(2);

    TotalAmount.innerText = `${Total} Bs.`;
    TimeImport.innerText = `${Total} Bs.`;
};