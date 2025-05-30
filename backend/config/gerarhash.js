const bcrypt = await import('bcrypt');
const hash = await bcrypt.default.hash('senha456', 10);
console.log(hash);
