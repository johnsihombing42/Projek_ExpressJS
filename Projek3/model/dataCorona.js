module.exports = {
  get: function (con, callback) {
    con.query("SELECT * FROM data_corona", callback);
  },

  getById: function (con, id, callback) {
    con.query(
      `SELECT * FROM data_corona WHERE id_data_corona = ${id}`,
      callback
    );
  },

  create: function (con, data, callback) {
    con.query(
      `INSERT INTO data_corona SET 
        hari = '${data.hari}', 
        jumlah_positif = '${data.jumlah_positif}', 
        jumlah_meninggal = '${data.jumlah_meninggal}'`,
      callback
    );
  },

  update: function (con, data, id, callback) {
    con.query(
      `UPDATE data_corona SET 
      hari = '${data.hari}', 
      jumlah_positif = '${data.jumlah_positif}', 
      jumlah_meninggal = '${data.jumlah_meninggal}'
      WHERE id_data_corona = ${id}`,
      callback
    );
  },

  destroy: function (con, id, callback) {
    con.query(`DELETE FROM data_corona WHERE id_data_corona = ${id}`, callback);
  },
};
