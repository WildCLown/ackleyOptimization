const a = 20;
const b = 0.2;
const c = 2 * Math.PI;
const d = 30;
function print(x){
    console.log(x);
}
function ackleyFit(x) {//x é um vetor
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
        population.push({'ind': x,'fitness':ackleyFit(x)});
    }
    return population;
}
function generateChildren(population){
    var newPop = []
    for(let i = 0; i< population.length; i++){
        var children = [];
        var parents = chooseParents(population);
        var father = parents[0];
        var mother = parents[1];
        //console.log(i);
        for(let j = 0; j<30; j++){
            children.push((father.ind[j]+mother.ind[j])/2)
        }
        newPop.push({'ind':children,'fitness':ackleyFit(children)});
    }
    return newPop;
}
function chooseParents(population){
    var father = Math.floor(generateNumber(0,population.length-1));
    var mother = Math.floor(generateNumber(0,population.length-1));
    return [population[father],population[mother]];
}
function mutate1(){

}
function mutate2(){

}
function mutate3(){
    
}
function main(){
    var population = generatePopulation(100);
    for(var i = 0; i<200000; i++){
        population = generateChildren(population);


        for(let inte in population){
            if(population[inte].fitness < 7){
                console.log("Best found in " + inte);
                return population;
            }
        }
    }
}
main();