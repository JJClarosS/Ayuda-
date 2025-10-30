// pizzeria-backend/hash.js

const bcrypt = require('bcryptjs');

// La contraseña que quieres hashear
const plainPassword = 'Admin123'; 

// El número de rondas de salado (cost factor) que usa NestJS, comúnmente 10.
const saltRounds = 10; 

async function hashPassword() {
    console.log(`Contraseña a hashear: ${plainPassword}`);
    
    // 1. Generar el salt
    const salt = await bcrypt.genSalt(saltRounds);
    
    // 2. Hashear la contraseña usando el salt
    const hash = await bcrypt.hash(plainPassword, salt);
    
    console.log('\n=======================================');
    console.log('✅ HASH GENERADO (Copia y Pega esto):');
    console.log(hash);
    console.log('=======================================\n');

    // Opcional: Verifica que funciona antes de pegarlo en la DB
    const isMatch = await bcrypt.compare(plainPassword, hash);
    console.log(`Verificación de hash exitosa (debe ser 'true'): ${isMatch}`);
}

hashPassword();