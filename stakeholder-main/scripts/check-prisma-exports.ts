
import * as PrismaClientPkg from '@prisma/client';
console.log('Available exports from @prisma/client:');
console.log(Object.keys(PrismaClientPkg).filter(k => !k.startsWith('_')));
