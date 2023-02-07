// ---------- DOM MANIPULATION ---------- // 
const buttons = document.getElementsByClassName("edit");
const materialesInputs = document.querySelectorAll(".material-input");
const pinturaInputs = document.querySelectorAll(".pintura-input");
const instalacionInputs = document.querySelectorAll(".instalacion-input");
const precioMaterialesSpan = document.querySelector("#precio-materiales");
const precioPinturaSpan = document.querySelector("#precio-pintura");
const precioInstalacionSpan = document.querySelector("#precio-instalacion");
const subtotalHTML = document.querySelector("#subtotal");
const calculateSub = document.querySelector("#calculate-subtotal");
const materialPorcentajes = document.querySelectorAll(".material-porcentaje");
const pinturaPorcentajes = document.querySelectorAll(".pintura-porcentaje");
const instalacionPorcentajes = document.querySelectorAll(".instalacion-porcentaje");


// ---------- GLOBAL CONST AND VARIABLES ---------- // 
const materialesUsados = {};
const pinturaUsada = {};
const instalacionUsada = {};

// ---------- FUNCTIONS ---------- // 
function priceArray(arr, objective){
    let precio = 0;

    const keys = Object.keys(arr);
    if(keys.length > 0){
        keys.forEach(key => {
            precio += (arr[key][0] * arr[key][1]);
    
            objective.innerHTML = precio;
        });
    } else {
        objective.innerHTML = precio;
    }
}

function calculatePrice(inputs, objetoMateriales, objective){
    inputs.forEach(inp => {
        inp.addEventListener("input", function(){
            if(inp.value != ""){
                let inp_number = parseInt(inp.value);
    
                if(inp_number >= 0){
                    objetoMateriales[inp.id][1] = inp_number;
    
                    priceArray(objetoMateriales, objective);
                }
            } else {
                objetoMateriales[inp.id][1] = 0;
    
                priceArray(objetoMateriales, objective);
            }
        })
    });
}

// ---------- MAIN ---------- // 
for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const btn_id = btn.id;
    btn.addEventListener("click", function(){
        const relatedBtns = document.querySelectorAll(".agregar-" + btn_id)
        let h_div = document.querySelector("." + btn_id);
        let hidden = h_div.hidden;
        let inputs = h_div.getElementsByTagName('input');

        if (hidden) {
            for (let i = 0; i < relatedBtns.length; i++) {
                const rBtn = relatedBtns[i];

                rBtn.innerHTML = "Quitar";
                rBtn.classList.remove("btn-danger");
                rBtn.classList.add("btn-dark");
            }
        
            switch(btn_id[0]){
                case "M":
                    Object.defineProperty(materialesUsados, btn_id, {
                        value: [parseFloat(btn.value), 0],
                        configurable: true,
                        enumerable: true,
                        writable: true
                    });

                    break;

                case "P":
                    Object.defineProperty(pinturaUsada, btn_id, {
                        value: [parseFloat(btn.value), 0],
                        configurable: true,
                        enumerable: true,
                        writable: true
                    });

                    break;

                case "I":
                    Object.defineProperty(instalacionUsada, btn_id, {
                        value: [parseFloat(btn.value), 0],
                        configurable: true,
                        enumerable: true,
                        writable: true
                    });

                    break;
            };

            for(var i = 0; i < inputs.length; i++) {
                const inp = inputs[i];
                inp.removeAttribute("disabled");
            }

            h_div.removeAttribute("hidden");
        } else {
            for (let i = 0; i < relatedBtns.length; i++) {
                const rBtn = relatedBtns[i];

                rBtn.innerHTML = "Agregar";
                rBtn.classList.remove("btn-dark");
                rBtn.classList.add("btn-danger");

                switch(btn_id[0]){
                    case "M":
                        delete materialesUsados[btn_id];
                        priceArray(materialesUsados, precioMaterialesSpan);
    
                        break;
    
                    case "P":
                        delete pinturaUsada[btn_id];
                        priceArray(pinturaUsada, precioPinturaSpan);
    
                        break;
    
                    case "I":
                        delete instalacionUsada[btn_id];
                        priceArray(instalacionUsada, precioInstalacionSpan);
    
                        break;
                };
            }

            inputs[0].value = 0

            for(var i = 0; i < inputs.length; i++) {
                const inp = inputs[i];
                inp.setAttribute("disabled", "disabled");
            }

            h_div.setAttribute("hidden", "hidden");
         }
    })
};

calculatePrice(materialesInputs, materialesUsados, precioMaterialesSpan);
calculatePrice(pinturaInputs, pinturaUsada, precioPinturaSpan);
calculatePrice(instalacionInputs, instalacionUsada, precioInstalacionSpan);

calculateSub.addEventListener("click", function(){
    let materiales_price = parseFloat(precioMaterialesSpan.innerHTML);
    let pintura_price = parseFloat(precioPinturaSpan.innerHTML);
    let instalacion_price = parseFloat(precioInstalacionSpan.innerHTML);

    let subtotal = materiales_price + pintura_price + instalacion_price;

    materialPorcentajes.forEach(porcentaje => {
        subtotal += materiales_price * (parseFloat(porcentaje.value) / 100);
    });

    pinturaPorcentajes.forEach(porcentaje => {
        subtotal += pintura_price * (parseFloat(porcentaje.value) / 100);
    });

    materialPorcentajes.forEach(porcentaje => {
        subtotal += instalacion_price * (parseFloat(porcentaje.value) / 100);
    });

    subtotalHTML.innerHTML = `<h5 class="mb-3 resaltar-rojo">SubTotal: $${subtotal}  mxn</h5>`;
})





