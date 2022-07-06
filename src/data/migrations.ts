import { BaseDatabase } from "./BaseDatabase"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

export class CreateTables extends BaseDatabase{
   createTables = () => this.getConnection().raw(`
   CREATE TABLE IF NOT EXISTS Usuarios (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
    );
    CREATE TABLE IF NOT EXISTS Bandas(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      music_genre VARCHAR(255) NOT NULL,
      responsible VARCHAR(255) UNIQUE NOT NULL 
    );
    CREATE TABLE IF NOT EXISTS Shows (
      id VARCHAR(255) PRIMARY KEY,
      week_day VARCHAR(255) NOT NULL,
      start_time INT NOT NULL,
      end_time INT NOT NULL,
      band_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(band_id) REFERENCES Bandas(id)
    )
      
   `)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

   closeConnection = () => {this.getConnection().destroy() }

}
const migrations = new CreateTables()

migrations.createTables()
   .finally(migrations.closeConnection)