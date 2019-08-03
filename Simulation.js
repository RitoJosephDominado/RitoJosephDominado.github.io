class Simulation{
    constructor(numColumns, numRows){
        this.numColumns = numColumns;
        this.numRows = numRows;
        this.cellWidth = 30;
        this.cellHeight = 30;
        this.grid = [];
        this.initGrid();
        this.animalArray = [];
        this.time = 0;
    }

    initGrid(){
        for(let column = 0; column < this.numColumns; column++){
            this.grid[column] = [];
            for(let row = 0; row < this.numRows; row++){
                this.grid[column][row] = new Tile();
            }
        }
    }

    addAnimal(animal, column, row){
        animal.init(column, row, this);
        this.grid[column][row].animal = animal;
        this.animalArray.push(animal);
      }
    
      syncGridWithAnimalArray(){
        for(let column = 0; column < this.numColumns; column++){
          for(let row = 0; row < this.numRows; row++){
            this.grid[column][row] = new Tile();
          }
        }
        let animal = null;
        for(let i = 0; i < this.animalArray.length; i++){
          animal = this.animalArray[i];
          this.grid[animal.column][animal.row].animal = animal;
        }
      }
    
      update(){
        for(let i = 0; i < this.animalArray.length; i++){
          this.animalArray[i].update();
        }
    
        this.animalArray = this.animalArray.filter(x => {return x.isAlive});
        this.syncGridWithAnimalArray();
        this.time++;
        document.getElementById('p_time').innerHTML = `Time: ${this.time}`;
        document.getElementById('p_animalArrayLength').innerHTML = `Num animals: ${this.animalArray.length}`;
      }
}