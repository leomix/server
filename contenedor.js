"use strict";
const fs = require('fs').promises
class Contenedor{

    constructor(nombreArchivo){

        this.nombreArchivo = nombreArchivo
        this.lista = []
    }

    async save(objeto){

        this.lista = await this.#readFile()
        let ultimo = this.lista.slice(-1)[0]

        objeto.id = 1
        if(typeof ultimo?.id !== 'undefined')
            objeto.id += ultimo.id

        this.lista.push(objeto)

        await this.#writeFile()

        return objeto.id
    }
    //este getById me gusta mas lo malo que devuelve undefined en vez del requisito de null al no encontrar resultado
    // async getById(id){
        
    //     this.lista = await this.readFile()
    //     return this.lista.find(obj =>  obj.id === id)
    // }
    
    async getById(id){

        this.lista = await this.#readFile()
        let objeto = this.lista.find(obj =>  obj.id === id)
        let resultado = null
        
        if(typeof objeto !== 'undefined')
            resultado = objeto

        return resultado
    }

    async getAll(){

        return await this.#readFile()
    }

    async deleteById(id){

        this.lista = await this.#readFile()
        this.lista = this.lista.filter(obj =>  obj.id !== id)

        await this.#writeFile()
    }

    async getRandom(){
        this.lista = await this.#readFile()
        return  this.lista[Math.floor(Math.random() * this.lista.length)];
    }

    async deleteAll(){

        this.lista = []

        await this.#writeFile()
    }
    async #writeFile(){
        
        await fs.writeFile(this.nombreArchivo,JSON.stringify(this.lista)).catch(this.#handleError)
        
    }
    async #readFile(){

        try{

           let resultado =  await fs.readFile(this.nombreArchivo)
           return JSON.parse(resultado)
        }catch(e){

            return []
        }
    }

    #handleError(err) {
        console.log(err);
    }
    
}
module.exports = Contenedor;