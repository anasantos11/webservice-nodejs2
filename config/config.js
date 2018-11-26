var mysql = require('mysql');
const mySqlConfig = require('./data.local');
const connection = mysql.createConnection(mySqlConfig);
const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        connection.end();
        return reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = {
  select: (query, res) => {
    executeQuery(query)
      .then(results => {
        res.send(results);
      })
      .catch(error => {
        console.error("Erro:  " + error.message);
        res.send("Erro:  " + error.message);
      })
  },
  insert: (query, entidade, res) => {
    executeQuery(query)
      .then(() => {
        res.send('Registro na tabela ' + entidade + ' adicionado com sucesso!');
      })
      .catch(error => {
        console.error("Erro:  " + error.message);
        res.send("Erro:  " + error.message);
      })
  }
}
