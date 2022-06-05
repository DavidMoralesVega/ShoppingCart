
// Variables
const Host = 'http://localhost/';


const HeaderRoute = `${Host}header.html`;
const FooterRoute = `${Host}footer.html`;

const Header = document.getElementById('Header');
const Footer = document.getElementById('Footer');


// Eventos

document.addEventListener('DOMContentLoaded', () => {
    RenderModule(HeaderRoute, Header);
    RenderModule(FooterRoute, Footer);
});


// Metodos

const RenderModule = async (Route, Element) => {
    try {
        let response = await fetch(Route);
        Element.innerHTML = await response.text();
    } catch (err) {
        console.log('Fetch error:' + err);
    }
};

const RemoveAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const ShowMessage = (Message, Type) => {

    // const colors = ['primary', 'warning', 'info', 'success', 'secondary', 'danger', 'light'];

    const alert = document.createElement('div');
    alert.innerHTML = `
                <div class="d-flex justify-content-between">
                    <p class="mb-0">${Message},
                        <a href="cart.html" class="alert-link">
                            ir al carrito.
                        </a>
                    </p>
                    <button
                        type="button"
                        class="btn-close"
                        data-mdb-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
                `;
    alert.classList.add('alert', 'fade');

    document.body.appendChild(alert);

    const alertInstance = new mdb.Alert(alert, {
        color: Type,
        position: 'bottom-right',
        hidden: true,
        delay: 7000,
        autohide: true,
        width: '600px',
        offset: 20,
        stacking: false,
        appendToBody: false,
    });

    alertInstance.show();
};


InitFormOutline = () => {
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).init();
    });

    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
};