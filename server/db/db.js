
import Environment from '../config/configurationDb';

class Database extends Environment {
  static dbConnection() {
    return Environment.dbConnection();
  }

  static async addUser(data) {
    const con = this.dbConnection();
    const newUser = await con.query(`
      insert into users (firstname, lastname, email, password) values(
        '${data.firstname}',
        '${data.lastname}',
        '${data.email}',
        '${data.password}')
       returning *`);
    await con.end();
    return newUser;
  }


  static async addEntry(data) {
    const con = this.dbConnection();
    const newEntry = await con.query(`
      insert into entries (CreatedOn, title, description) values(
        '${data.CreatedOn}',
        '${data.title}',
        '${data.description}')
       returning *`);
    await con.end();
    return newEntry;
  }

  static async selectAll(table) {
    const con = this.dbConnection();
    const result = await con.query(`SELECT * FROM ${table}`);
    await con.end();
    return result;
  }

  static async selectBy(table, column, value) {
    const con = this.dbConnection();
    const result = await con.query(`SELECT * FROM ${table} WHERE ${column}='${value}'`);
    await con.end();
    return result;
  }


  static async selectCount(table, column, value) {
    const con = this.dbConnection();
    const result = await con.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
    await con.end();
    return result;
  }

  static async deleteEntry(table, id) {
    const conn = this.dbConnection();
    const result = await conn.query(`DELETE from ${table} WHERE entryId = ${id};`);
    await conn.end();
    return result;
  }

  static async updateEntry(title, description, id) {
    const conn = this.dbConnection();
    const result = await conn.query(`
    UPDATE entries SET
    title = '${title}', 
    description ='${description}'
     WHERE entryId= ${id}`);
    await conn.end();
    return result;
  }


  static async createScripts() {
    const con = this.dbConnection();
    await con.query(`
        CREATE TABLE IF NOT EXISTS USERS (userId SERIAL,firstname VARCHAR(250),lastname VARCHAR(250),email VARCHAR(250), password VARCHAR(250), PRIMARY KEY(userId));
    
        CREATE TABLE IF NOT EXISTS ENTRIES(entryId SERIAL, CreatedOn TIMESTAMP, title VARCHAR(250), description VARCHAR(250), PRIMARY KEY(entryId));
         `);
    await con.end();
  }
}

export default Database;
