let LivingCreature = require('./livingCreature')

module.exports = class Tuyn extends LivingCreature{
    constructor(x,y){
    super(x, y);
        this.energy = 30;
        this.direction = []
    }

    getNewCoordinates() {
        this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		];
    }

    chooseCell(char1,char2){
        this.getNewCoordinates();
        return super.chooseCell(char1, char2);
    }

    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell ) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 4

            let ty = new Tuyn(newX, newY)

            tuynArr.push(ty)
        }
    }


    eat() {
        let foods = this.chooseCell(1,2)
        let food = foods[Math.floor(Math.random() * foods.length)]
        if (food) {
            this.energy++;

            matrix[this.y][this.x] = 0
          
          
            let newX = food[0]
            let newY = food[1]
           
           
            matrix[newY][newX] = 4


            for (var i in grassArray) {
                if (newX == grassArray[i].x && newY == grassArray[i].y) {
                    grassArray.splice(i, 1);
                    break;
                }
            }

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }


            if (this.energy >= 10) {
                this.mul()
            }



            this.x = newX
            this.y = newY
        }
    }

    


    die() {
        
        matrix[this.y][this.x] = 0;
        for (var i in tuynArr) {
            if (this.x == tuynArr[i].x && this.y == tuynArr[i].y) {
                tuynArr.splice(i, 1);
                console.log("die i mej", tuynArr);
                break;
            }
        }
    }
}