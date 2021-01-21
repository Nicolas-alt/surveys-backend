process.env.PORT = process.env.PORT || 3200;

// env
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let originDb;

if (process.env.NODE_ENV === 'dev') {
  originDb = 'mongodb://localhost:27017/surveys';
} else {
  process.env.origin;
}

process.env.URLDB = originDb;
