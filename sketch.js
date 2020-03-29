function setup() {
  createCanvas(600, 500);
  slider=createSlider(0,PI,PI/2,PI/16);
}

function draw() {
  background(50);
  translate(width/2,height);
  frac_tree();
}

function frac_tree(n=10,length=200){
  if(n==0){
    return;
  }
  stroke(255);
  line(0,0,0,-length)
  translate(0,-length);
  push();
  rotate(slider.value());
  frac_tree(n-1,length*2/3);
  pop();
  push();
  rotate(-slider.value());
  frac_tree(n-1,length*2/3);
  pop();
}

  cells.push(grid[0][0]);
  grid[0][0].visited=true;
  grid[0][0].drawwalls();
}

function draw() {
    for(k=0;k<5000;k++){
    current=cells[cells.length-1];

    if(current && current.i==cols-1 && current.j==rows-1 && !found){
      arrayCopy(cells,0,path,0,cells.length);
    }

    if(cells.length==0){
      noLoop();
      for(i=0;i<path.length;i++){
        path[i].drawwalls(color(200,50,50));
      }
      console.log("finished");
      break;
    }else{
      next=random(current.neighbours());
      current.mark();
      if(next){
        next.visited=true;
        cells.push(next);
        removewalls(current,next);
      }else{
        current.drawwalls();
        cells.pop();
      }
    }
  }

  for(i=0;i<cells.length-1;i++){
    cells[i].drawwalls();
  }
}

function removewalls(a,b){
  if(a.i>b.i){
    a.walls[3]=false;
    b.walls[1]=false;
  }else if(a.i<b.i){
    a.walls[1]=false;
    b.walls[3]=false;
  }else if(a.j>b.j){
    a.walls[0]=false;
    b.walls[2]=false;
  }else if(a.j<b.j){
    a.walls[2]=false;
    b.walls[0]=false;
  }
}

class Cell{
  constructor(x,y){
    this.x=x*size+size/2;
    this.y=y*size+size/2;
    this.i=x;
    this.j=y;
    this.visited=false;
    // Top Right Bottom Left
    this.walls=[true,true,true,true];

    this.show = function(){
      ellipse(this.x,this.y,10);
    }

    this.neighbours = function(){
      let availables=[];
      if(this.j<rows-1 && !grid[this.i][this.j+1].visited){
        availables.push(grid[this.i][this.j+1]);
        //console.log("bottom");
        //grid[this.i][this.j+1].mark();
      }
      if(this.i<cols-1 && !grid[this.i+1][this.j].visited){
        availables.push(grid[this.i+1][this.j]);
        //console.log("right");
        //grid[this.i+1][this.j].mark();
      }
      if(this.j>0 && !grid[this.i][this.j-1].visited){
        availables.push(grid[this.i][this.j-1]);
        //console.log("top");
        //grid[this.i-1][this.j].mark();
      }
      if(this.i>0 && !grid[this.i-1][this.j].visited){
        availables.push(grid[this.i-1][this.j]);
        //console.log("left");
        //grid[this.i][this.j-1].mark();
      }

      return availables;
    }

    this.mark = function(){
      noStroke();
      fill(color(0,255,55));
      rect(this.x-size/2,this.y-size/2,size,size);
    }

    this.drawwalls = function(c=color(0,155,255)){

      if(this.visited){
        noStroke();
        fill(c);
        rect(this.x-size/2,this.y-size/2,size,size);
      }

      stroke(255);
      if(this.walls[0]){
        line(this.x+size/2,this.y-size/2,this.x-size/2,this.y-size/2)
      }
      if(this.walls[1]){
        line(this.x+size/2,this.y+size/2,this.x+size/2,this.y-size/2)
      }
      if(this.walls[2]){
        line(this.x+size/2,this.y+size/2,this.x-size/2,this.y+size/2)
      }
      if(this.walls[3]){
        line(this.x-size/2,this.y+size/2,this.x-size/2,this.y-size/2)
      }
    }
  }

}
