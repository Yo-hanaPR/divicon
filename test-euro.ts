import tasasCambio from './src/services/tasas';

async function testIntegration() {
    console.log('--- Probando integración dinámica del Euro ---');
    console.log('Valor inicial (puede ser el default):', tasasCambio.euro_bcv);

    // Esperamos unos segundos a que la promesa interna se resuelva
    console.log('⏳ Esperando actualización...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('Valor final:', tasasCambio.euro_bcv);

    if (tasasCambio.euro_bcv !== 447) { // Asumiendo 447 es el default
        console.log('✅ El valor se actualizó correctamente.');
    } else {
        console.log('⚠️ El valor no cambió. Puede que la API haya devuelto el mismo valor o falló la actualización.');
    }
}

testIntegration();
