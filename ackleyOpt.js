const a = 20;
const b = 0.2;
const c = 2 * Math.PI;
const d = 30;
function print(x){
    console.log(x);
}
function calcAckley(x) {//x é um vetor
    var inF = 0;
    var inS = 0;
    for (var i = 0; i < d; i++) {
        inF += Math.pow(x[i],2);
        inS += Math.cos((c*x[i]));
    }
    inF= ((-b) * (Math.sqrt(inF)))
    inS = inS/d;
    var result = (-a * Math.exp(inF)) + a - Math.exp(inS) + Math.E;
    console.log(result);
    return result;
}
function generateNumber(min,max){
    var gen = Math.random() * (max - min + 1) + min
    //gen = gen.toFixed(4);
    return gen;
}
function generatePopulation(size){
    var population = [];
    for(var j = 0; j<size;j++){
        var x = [];
        for(var i = 0; i<d;i++){
            x.push(generateNumber(-15,14));
        }
        population.push(x);
    }
    //console.log(x);
    return population;
}


function main(){
    var population = generatePopulation(10);
    //console.log(population)
}
main();