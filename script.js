document.addEventListener('DOMContentLoaded', function () {
    const tipoUnidad = document.getElementById('tipo-unidad');
    const unidadOrigen = document.getElementById('unidad-origen');
    const unidadDestino = document.getElementById('unidad-destino');
    const valor = document.getElementById('valor');
    const resultado = document.getElementById('resultado');
    const convertir = document.getElementById('convertir');

    const unidades = {
        temperatura: ['Celsius', 'Fahrenheit', 'Kelvin'],
        longitud: ['Metros', 'Kilómetros', 'Millas', 'Pies'],
        // Puedes añadir más categorías y unidades aquí
    };

    const factoresConversion = {
        longitud: {
            Metros: 1,
            Kilómetros: 1000,
            Millas: 1609.34,
            Pies: 0.3048,
        },
        temperatura: {
            // No necesitas factores para temperatura porque se maneja por funciones
        },
    };

    // Actualizar las opciones de unidades según el tipo seleccionado
    tipoUnidad.addEventListener('change', function () {
        const tipo = tipoUnidad.value;
        unidadOrigen.innerHTML = '';
        unidadDestino.innerHTML = '';

        unidades[tipo].forEach(unidad => {
            const optionOrigen = document.createElement('option');
            optionOrigen.value = unidad;
            optionOrigen.textContent = unidad;
            unidadOrigen.appendChild(optionOrigen);

            const optionDestino = document.createElement('option');
            optionDestino.value = unidad;
            optionDestino.textContent = unidad;
            unidadDestino.appendChild(optionDestino);
        });
    });

    // Lógica de conversión
    convertir.addEventListener('click', function () {
        const tipo = tipoUnidad.value;
        const valorEntrada = parseFloat(valor.value);
        const unidadDe = unidadOrigen.value;
        const unidadA = unidadDestino.value;

        if (isNaN(valorEntrada)) {
            resultado.textContent = "Por favor, ingresa un valor numérico válido.";
            return;
        }

        let valorConvertido;

        if (tipo === 'longitud') {
            const factorOrigen = factoresConversion.longitud[unidadDe];
            const factorDestino = factoresConversion.longitud[unidadA];
            valorConvertido = valorEntrada * (factorOrigen / factorDestino);
        } else if (tipo === 'temperatura') {
            if (unidadDe === 'Celsius' && unidadA === 'Fahrenheit') {
                valorConvertido = (valorEntrada * 9/5) + 32;
            } else if (unidadDe === 'Fahrenheit' && unidadA === 'Celsius') {
                valorConvertido = (valorEntrada - 32) * 5/9;
            } else if (unidadDe === 'Celsius' && unidadA === 'Kelvin') {
                valorConvertido = valorEntrada + 273.15;
            } else if (unidadDe === 'Kelvin' && unidadA === 'Celsius') {
                valorConvertido = valorEntrada - 273.15;
            } else if (unidadDe === 'Fahrenheit' && unidadA === 'Kelvin') {
                valorConvertido = (valorEntrada - 32) * 5/9 + 273.15;
            } else if (unidadDe === 'Kelvin' && unidadA === 'Fahrenheit') {
                valorConvertido = (valorEntrada - 273.15) * 9/5 + 32;
            } else {
                valorConvertido = valorEntrada; // Misma unidad
            }
        } else {
            resultado.textContent = "Conversión no soportada para el tipo seleccionado.";
            return;
        }

        resultado.textContent = valorConvertido.toFixed(2);
    });

    // Dispara el evento change para inicializar las opciones de unidad
    tipoUnidad.dispatchEvent(new Event('change'));
});
