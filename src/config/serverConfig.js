process.env.PORT = process.env.PORT || 3200;

// env
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// TODO server vars

process.env.TOKEN = '72h';
process.env.SEED = process.env.SEED || 'temporal-seed';

// db
let originDb;

if (process.env.NODE_ENV === 'dev') {
  originDb = 'mongodb://localhost:27017/surveys';
} else {
  process.env.origin;
}

process.env.URLDB = originDb;
