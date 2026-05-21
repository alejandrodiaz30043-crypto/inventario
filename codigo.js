document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre');
    const cantidadInput = document.getElementById('cantidad');
    const precioInput = document.getElementById('precio');
    const imagenInput = document.getElementById('imagen');
    const btnAgregar = document.getElementById('btnAgregar');
    const tablaBody = document.querySelector('#tabla tbody');
    const totalGeneralContenedor = document.getElementById('totalGeneral');
    const jsonPreview = document.getElementById('json-preview');

    let inventario = [
        { producto: "Aceite 4T 10W-40 Premium (1L)", cantidad: 25, precio: 32000, imagen: "https://www.americanmotos.com/cdn/shop/files/MOTUL510010W-404T1L.jpg?v=1700286720  https://i.ibb.co/Xy13Q9H/oil-icon.png" },

        { producto: "Pastillas de Freno", cantidad: 15, precio: 60000, imagen: "https://auteco.vtexassets.com/arquivos/ids/198660/Pasta_de_freno_Nitrox_max_friccion_foto1.jpg?v=637439001463200000" },

        { producto: "Bujía Iridium", cantidad: 3, precio: 5000, imagen: "https://www.motosyrepuestos.com/wp-content/uploads/2022/03/IU24.jpg" },

        { producto: "Kit Arrastre", cantidad: 20, precio: 37500, imagen: "https://llantasyllantas.com/wp-content/uploads/2025/04/Kit-Arrastre-Narita-S-Gs-125-H-20528.webp" },

        { producto: "Kit Arrastre + Cadena Reforzada", cantidad: 3, precio: 75000, imagen: "https://http2.mlstatic.com/D_NQ_NP_837267-MCO81634801499_122024-O.webp" },

        { producto: "Llanta 110/70-17 Delantera", cantidad: 10, precio: 100000, imagen: "https://media.falabella.com/sodimacCO/689503/public" },

        { producto: "Llanta 140/70-17 Trasera", cantidad: 10, precio: 70000, imagen: "https://auteco.vteximg.com.br/arquivos/ids/359877-300-300/IRC-IZR.jpg?v=638737021314900000" },

       { producto: "Filtro de Aceite Sintético", cantidad: 10, precio: 22000, imagen: "https://i.ebayimg.com/images/g/lk4AAOSwFP1jJwRK/s-l500.jpg" },

        { producto: "Guaya de Acelerador Reforzada", cantidad: 2, precio: 15000, imagen: "https://stuntr21.com/cdn/shop/files/GuayaDeAceleradorDe1.4Azul.jpg?v=1738277383&width=1400" },

        { producto: "Espejos Retrovisores (Par)", cantidad: 5, precio: 48000, imagen: "https://img.kwcdn.com/product/fancy/1e1c8b65-fb56-4d40-9d8d-bced1fdfd501.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp" },

        { producto: "Bombillo H4 LED 6000K", cantidad: 10, precio: 30000, imagen: "https://http2.mlstatic.com/D_NQ_NP_635122-MCO95239629979_102025-O.webp" },

        { producto: "Bombillo H4 Halógeno", cantidad: 10, precio: 19000, imagen: "https://http2.mlstatic.com/D_NQ_NP_768203-MCO87107985224_072025-O.webp" }
    ];

    const actualizarInterfaz = () => {
        tablaBody.innerHTML = '';
        let acumuladoGeneral = 0;

        inventario.forEach((item, index) => {
            const subtotal = item.cantidad * item.precio;
            acumuladoGeneral = acumuladoGeneral + subtotal;

            let imgSrc = item.imagen;
            if (imgSrc === '') {
                imgSrc = "https://via.placeholder.com/40/2a2a32/ffffff?text=📦";
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${imgSrc}" class="prod-thumb"></td>
                <td>${item.producto}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio.toLocaleString()}</td>
                <td>$${subtotal.toLocaleString()}</td>
                <td><button class="btn-borrar" data-index="${index}">✕</button></td>
            `;

            tablaBody.appendChild(row);
        });

        totalGeneralContenedor.textContent = "Total general: $" + acumuladoGeneral.toLocaleString();
        jsonPreview.value = JSON.stringify(inventario, null, 4);
    };

    btnAgregar.addEventListener('click', () => {
        const producto = nombreInput.value;
        const cantidad = parseInt(cantidadInput.value);
        const precio = parseFloat(precioInput.value);
        const imagen = imagenInput.value;

        if (producto === '' || isNaN(cantidad) || isNaN(precio)) {
            alert('Por favor, rellene los campos.');
            return;
        }

        inventario.push({
            producto: producto,
            cantidad: cantidad,
            precio: precio,
            imagen: imagen
        });

        nombreInput.value = '';
        cantidadInput.value = '';
        precioInput.value = '';
        imagenInput.value = '';

        actualizarInterfaz();
    });

    tablaBody.addEventListener('click', (e) => {
        if (e.target.className === 'btn-borrar') {
            const index = e.target.getAttribute('data-index');
            inventario.splice(index, 1);
            actualizarInterfaz();
        }
    });

    actualizarInterfaz();
});