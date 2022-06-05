

// Variables
const Products = [
    {
        IdProduct: 'P-001',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/001.jpg',
        Promotion: 'New',
        Color: 'primary',
        Price: '252.99'
    },
    {
        IdProduct: 'P-002',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/002.jpg',
        Promotion: 'Eco',
        Color: 'success',
        Price: '100.99'
    },
    {
        IdProduct: 'P-003',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/003.jpg',
        Promotion: '-10%',
        Color: 'danger',
        Price: '52.99'
    },
    {
        IdProduct: 'P-004',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/004.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
    {
        IdProduct: 'P-005',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/005.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
    {
        IdProduct: 'P-006',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/006.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
    {
        IdProduct: 'P-007',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/007.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
    {
        IdProduct: 'P-008',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/008.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
    {
        IdProduct: 'P-009',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/009.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
    {
        IdProduct: 'P-010',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/010.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
    {
        IdProduct: 'P-011',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/011.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
    {
        IdProduct: 'P-012',
        Name: 'Experia Tablet',
        Category: 'Electronic',
        Url: 'img/products/012.jpg',
        Promotion: '-10%',
        Color: 'warning',
        Price: '150.99'
    },
];

const ContainerProducts = document.getElementById('ContainerProducts');
// Eventos

document.addEventListener('DOMContentLoaded', () => {
    EventListenersCart();
    SetProducts();
    RenderProducts();
    GetAllObject('cart', CounterCart);
});

const EventListenersCart = () => {
    ContainerProducts.addEventListener('click', AddCart);
};

// Metodos

const SetProducts = () => {

    Products.forEach(Product =>
        AddObject('products', Product)
    );

};

const RenderProducts = (ResultProducts) => {

    RemoveAllChildNodes(ContainerProducts);

    ResultProducts.forEach(Product => {

        const TemplateItemString = `
        <div id="card" class="col-lg-4 col-md-12 mb-4">
            <div class="card">
                <div class="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                    <img src="${Product.Url}" class="w-100" />
                    <a href="#!">
                        <div class="mask">
                            <div class="d-flex justify-content-start align-items-end h-100">
                                <h5><span class="badge bg-${Product.Color} ms-2">${Product.Promotion}</span></h5>
                            </div>
                        </div>
                        <div class="hover-overlay">
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
                        </div>
                    </a>
                </div>
                <div class="card-body">
                    <a class="text-reset">
                        <h5 class="card-title mb-3"> ${Product.Name} </h5>
                    </a>
                    <a class="text-reset">
                        <p>${Product.Category}</p>
                    </a>
                    <h6 class="mb-3">${Product.Price} Bs.</h6>

                    <button
                        
                        IdProduct="${Product.IdProduct}"
                        Name="${Product.Name}"
                        Category="${Product.Category}"
                        Url="${Product.Url}"
                        Promotion="${Product.Promotion}"
                        Color="${Product.Color}"
                        Price="${Product.Price}"

                        type="button" class="BtnAddProduct btn btn-primary me-1 mb-1">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>`;

        let TemplateItem = new DOMParser().parseFromString(TemplateItemString, 'text/html').body.querySelector('#card');


        ContainerProducts.append(TemplateItem);

    });

};

GetAllObject('products', RenderProducts);

const AddCart = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('BtnAddProduct')) {

        let ProductInfo = {
            IdProduct: e.target.attributes['IdProduct'].value,
            Name: e.target.attributes['Name'].value,
            Category: e.target.attributes['Category'].value,
            Url: e.target.attributes['Url'].value,
            Promotion: e.target.attributes['Promotion'].value,
            Color: e.target.attributes['Color'].value,
            Price: e.target.attributes['Price'].value,
        };

        let CartInfoNew = {
            ...ProductInfo,
            Quantity: 1
        };

        AddObject('cart', CartInfoNew);
        ShowMessage('Producto agregado', 'success');
        GetAllObject('cart', CounterCart);
    };
};



const CounterCart = (ResultCart) => {

    const LabelCounterCart = document.getElementById('LabelCounterCart');
    let Counter = ResultCart.length || 0;
    LabelCounterCart.innerText = Counter;

};

GetAllObject('cart', CounterCart);

