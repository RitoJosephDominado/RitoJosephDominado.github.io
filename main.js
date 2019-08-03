window.onload = function(){
    const sim = new Simulation(15, 15);
    sim.addAnimal(new Animal('M', 150), 3, 3);
    sim.addAnimal(new Animal('M', 150), 3, 4);
    sim.addAnimal(new Animal('F', 150), 1, 1);
    sim.addAnimal(new Animal('F', 50), 3, 5);
    sim.addAnimal(new Animal('F', 10), 1, 2);
    sim.addAnimal(new Animal('F', 10), 1, 3);
    sim.addAnimal(new Animal('F', 10), 1, 4);
    sim.addAnimal(new Animal('F', 10), 1, 5);
    const painter = new Painter(function(p){
        p.setup = function(){
            let mainCanvas = p.createCanvas(600, 600);
            mainCanvas.parent('mainCanvasDiv');
            p.background(140, 100, 10);
            p.noLoop();
        }
    });

    painter.setSimulation(sim);
    painter.drawSimulation();
    // window.sim = sim;
    // window.painter = painter;

    document.querySelector("#btn_update").addEventListener('click', function(){
        sim.update();
        painter.update();
      });
      let simIntervalId = null;
      document.querySelector("#btn_startLoop").addEventListener('click', function(){
        if(simIntervalId === null){
          document.getElementById('btn_startLoop').innerHTML = "Stop loop";
          simIntervalId = window.setInterval(function(){
            sim.update();
            painter.update();
            
          }, 100);
        }else{
          document.getElementById('btn_startLoop').innerHTML = "Start loop";
          clearInterval(simIntervalId);
          simIntervalId = null;
        }
        
      });
}
