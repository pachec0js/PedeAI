import bcrypt from 'bcrypt';

const senhaDigitada = 'senhalol';
const hashSalvo = '$2b$10$C9B6tlDSi8tynA/leoYfS.zzTkwHlGlsly4yWmPy5fvxmixS2hZBO';

const resultado = await bcrypt.compare(senhaDigitada, hashSalvo);

console.log('Senha correta?', resultado);
