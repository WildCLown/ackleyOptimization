const a = 20;
const b = 0.2;
const c = 2 * Math.PI;
const d = 30;
var minFound = Number.MAX_VALUE;
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
    minFound = Math.min(minFound,result);
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
    for(let i = 0; i< (7*population.length); i++){
        var children = [];
        var parents = chooseParents(population);
        var father = parents[0];
        var mother = parents[1];
        for(let j = 0; j<30; j++){
            children.push((father.ind[j]+mother.ind[j])/2)
        }
        newPop.push({'ind':children,'fitness':ackleyFit(children)});
    }
    newPop.sort((first,second) => (first.fitness > second.fitness) ? 1:-1);
    newPop = newPop.slice(0,population.length);
    return newPop;
}
function chooseParents(population){
    var father = Math.floor(generateNumber(0,population.length-1));
    var mother = Math.floor(generateNumber(0,population.length-1));
    return [population[father],population[mother]];
}
function mutate1(children){
    var startF = generateNumber(0,children.ind.length-1);
    var quantity = generateNumber(0,children.ind.length-1);
    for(let i = 0; i<quantity; i++){
        children.ind[(startF+i)%children.ind.length] = generateNumber(-15,14);
    }
    children.fitness = ackleyFit(children.ind);
    return children;
}
function mutate2(){

}
function mutate3(){
    
}
function myChernobyll(population){
    var mutants = population;
    var startF = Math.floor(generateNumber(0,population.length-1));
    var quantity = Math.floor(generateNumber(0,population.length-1));
    for(let i = 0; i<quantity;i++){
        mutants[(startF+i)%mutants.length] = mutate1(mutants[(startF+i)%mutants.length]);
    }
    return mutants;
}
function main(){
    var population = generatePopulation(100);
    var goodFit = 17;
    for(var i = 0; i<200000; i++){
        population = generateChildren(population);
        population = myChernobyll(population);

        for(let inte in population){
            if(population[inte].fitness < goodFit){
                console.log("Best found in " + population[inte].fitness);
                goodFit = population[inte].fitness-1;
            }
        }
    }
    console.log("Any moment, was found : " + minFound);
}
main();