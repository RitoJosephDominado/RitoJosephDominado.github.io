class Animal{
    constructor(sex, size){
        this.column = null;
        this.row = null;
        this.size = size;
        this.sex = sex;
        this.simulation = null;
        this.age = null;
        this.isAlive = true;
        this.deathRate = 0.01;
    }

    init(column, row, simulation){
        this.column = column;
        this.row = row;
        this.simulation = simulation;
    }

    getRandAdjacentCoord(oldColumn, oldRow){
        let direction = Math.floor(Math.random() * 4);
        let newColumn = oldColumn;
        let newRow = oldRow;
        switch(direction){
            case 0:
                newColumn++;
                break;
            case 1:
                newColumn--;
                break;
            case 2:
                newRow++;
                break;
            case 3:
                newRow--;
                break;
        }
        return [newColumn, newRow];
    }

    isInsideGrid(column, row){
        // return(column >= 0 && column < this.simulation.numColumns
        //         && row >= 0 && row < this.simulation.numRows);
        if( column >= 0 && column < this.simulation.numColumns
            && row >= 0 && row < this.simulation.numRows){
          return true;
        }else{return false;}
    }

    move(){
        let newCoords = this.getRandAdjacentCoord(this.column, this.row);
        let newColumn = newCoords[0];
        let newRow = newCoords[1];
        if( newColumn >= 0 && newColumn < this.simulation.numColumns
            && newRow >= 0 && newRow < this.simulation.numRows
            && this.simulation.grid[newColumn][newRow].animal == null
          ){
          this.simulation.grid[this.column][this.row].animal = null;
          this.simulation.grid[newColumn][newRow].animal = this;
          this.row = newRow;
          this.column = newColumn;
        }
    }

    tryToDie(){
        let randNum = Math.random();
        // console.log(`tried to die!`);
        // console.log(`died with rand: ${randNum}`);
        if(randNum < this.deathRate){
          this.isAlive = false;
        }
      }
    
      tryToMate(){
        let mateCoords = this.getRandAdjacentCoord(this.column, this.row);
        let mateColumn = mateCoords[0];
        let mateRow = mateCoords[1];
        let birthCoords = null;
        let birthColumn = null;
        let birthRow = null;
        if( this.isInsideGrid(mateColumn, mateRow)
          && this.simulation.grid[mateColumn][mateRow].animal != null
          && this.simulation.grid[mateColumn][mateRow].animal.isAlive
          && this.simulation.grid[mateColumn][mateRow].animal.sex === 'F'
        ){
          birthCoords = this.getRandAdjacentCoord(mateColumn, mateRow);
          birthColumn = birthCoords[0];
          birthRow = birthCoords[1];
          if(this.isInsideGrid(birthColumn, birthRow)
              && this.simulation.grid[birthColumn][birthRow].animal === null
          ){
            this.simulation.addAnimal(new Animal(Math.random() < 0.5? 'M': 'F', 100), birthColumn, birthRow);
            
          }
          
        }
      }
    
      update(){
        this.move();
        this.tryToDie();
        if(this.sex === 'M') this.tryToMate();
      }

}