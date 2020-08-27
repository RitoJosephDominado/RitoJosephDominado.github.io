// import {Simulation} from 'Simulation.js';

class Painter extends p5{
    setSimulation(simulation){
        this.simulation = simulation;
    }

    drawSimulation(){
        let sim = this.simulation;
        let animal = null;
        let red = 0;
        let green = 0;
        let blue = 90;
        for(let column = 0; column < sim.numColumns; column++){
            for(let row = 0; row < sim.numRows; row++){
                if(sim.grid[column][row].animal == null){
                    this.fill(150, 150, 150);
                }else{
                    animal = sim.grid[column][row].animal;
                    red = animal.sex === "M" ? 255 : 0;
                    green = animal.sex === "M" ? 0 : 255;
                    this.fill(red, blue, green);
                }

                this.rect(column * sim.cellWidth, row * sim.cellHeight, sim.cellWidth, sim.cellHeight);
            }
        }
    }

    update(){
        this.drawSimulation();
      }
    
    startLoop(){
        this.draw = function(){
            this.simulation.update();
            this.update();
        }
    }
}

