const a = 20;
const b = 0.2;
const c = 2 * Math.PI;
const d = 30;
const t = 1 / Math.sqrt(d);
const t2 = 1 / Math.sqrt(2 * Math.sqrt(d));
const t2linha = 1 / Math.sqrt(2 * d)
////////////////////////////
const POPULATION = 200;
const POP_MUTATE = 25;
const OVERPARENTS = 20;
var STEP_MUTATION = .5;
var XY_QUANTITY = 1;
const ATTEMPTS = 200000;
const MINIMUM_MUTATED = POPULATION/4;


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
    return result;
}
function generateNumber(min,max){
    var gen = Math.random() * (max - min + 1) + min
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
    for(let i = 0; i< (OVERPARENTS*population.length); i++){
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
    newPop = newPop.slice(0,100);
    return newPop;
}
function chooseParents(population){
    var father = Math.floor(generateNumber(0,population.length-1));
    var mother = Math.floor(generateNumber(0,population.length-1));
    return [population[father],population[mother]];
}
function mutate1(children){
    var startF = Math.floor(generateNumber(0,children.ind.length-1));
    for(let i = 0; i<XY_QUANTITY; i++){
        let step = STEP_MUTATION;
        let currC = children.ind[(startF+i)%children.ind.length];
        let minimumMutation = currC - step;
        let maximumMutation = currC + step;
        if(minimumMutation < -15) minimumMutation = -15;
        if(maximumMutation > 14) maximumMutation = 14;
        let index = (startF+i)%children.ind.length
        children.ind[index] = generateNumber(minimumMutation,maximumMutation);
    }
    children.fitness = ackleyFit(children.ind);
    return children;
}

function calculateStd(list){
    let mean = list.reduce((total, value) => total+value/list.length, 0);
    let variance = list.reduce((total, value) => total + Math.pow(mean - value, 2)/list.length, 0);
    return Math.sqrt(variance);
}

function mutate2(child){ //mutação nao correlacionada 1 desvio
    var std = calculateStd(child.ind);
    std = std * Math.exp(t * Math.random());
    
    var mutatedChild = []
    for(var i = 0; i < child.ind.length; i++) {
        var mutatedStep = std * generateNumber(-1, 0);

        var mutatedGene = child.ind[i] + mutatedStep;
        
        if(mutatedGene > 15) {
            mutatedGene = 15;
        }else if(mutatedGene < -15) {
            mutatedGene = -15;
        }
        mutatedChild.push(mutatedGene);
    }

    var mutatedFitness = ackleyFit(mutatedChild);
    if(mutatedFitness < child.fitness) {
        child.ind = mutatedChild;
        child.fit = mutatedFitness;
    }

    return child;
}

function mutate3(child){// //mutação nao correlacionada n desvio
    var std = calculateStd(child.ind);
    std = std * Math.exp( (t2linha* Math.random()) + (t2 * Math.random()));

    mutatedChild = []
    for(var i = 0; i < child.ind.length; i++) {
        var mutatedStep = std * generateNumber(-1, 0);

        var mutatedGene = child.ind[i] + mutatedStep;
        
        if(mutatedGene > 15) {
            mutatedGene = 15;
        }else if(mutatedGene < -15) {
            mutatedGene = -15;
        }
        mutatedChild.push(mutatedGene);
    }

    var mutatedFitness = ackleyFit(mutatedChild);
    if(mutatedFitness < child.fitness) {
        child.ind = mutatedChild;
        child.fit = mutatedFitness;
    }

    return child;
    
}

function myChernobyll(population){
    var mutants = population;
    var startF = Math.floor(generateNumber(0,population.length-1));
    for(let i = 0; i<MINIMUM_MUTATED;i++){
        mutants[(startF+i)%mutants.length] = mutate1(mutants[(startF+i)%mutants.length]);
    }
    return mutants;
}
function main(){
    var population = generatePopulation(POPULATION);
    var goodFit = 17;
    var previewFit = goodFit;
    var demongorgon = 0;
    var bestChild;
    for(var i = 0; i<ATTEMPTS; i++){
        population = generateChildren(population);
        population = myChernobyll(population);

        for(let inte in population){
            if(population[inte].fitness < goodFit){
                bestChild = population[inte];
                bestChild.iteration = parseInt(i);
                //if(i > 20000)
                console.log(i + "-Best found in " + population[inte].fitness);
                goodFit = population[inte].fitness;
                //console.log(population[inte].ind);
                //0.00007
                //0.00001
            }
        }
        if(previewFit == goodFit){
            demongorgon++;
        }else{
            previewFit = goodFit;
            demongorgon = 0;
        }
        // if(demongorgon == 10000){
        //     //STEP_MUTATION = STEP_MUTATION + 0.2;
        //     XY_QUANTITY++;
        //     //console.log("NEW STEP IS : " + STEP_MUTATION);
        //     console.log("NEW XY IS : " + XY_QUANTITY);
        // }
        // if(demongorgon == 10000){
        //         STEP_MUTATION = STEP_MUTATION/10;
        //         console.log("NEW STEP IS : " + STEP_MUTATION);
        //         demongorgon = 0;
        // }
        // if(i%10000 == 0){
        //     console.log(goodFit+.02)
        // }
    }
    console.log(goodFit);
    return bestChild;
}
function statistics(tryes = 10){
    var toCalc = [];
    var bullseye = 0;
    var bullMean = 0;

    var bullseye3 = 0;
    var bullMean3 = 0;
    var bullseye2 = 0;
    var bullMean2 = 0;
    for(var i = 0; i< tryes; i++){
        console.log("############# ITERACTION " + (i+1) + " STARTED #############");
        toCalc.push(main());
        if(toCalc[i].fitness == 0){
            bullseye++;
            bullMean += toCalc[i].iteration;
        }
        if(toCalc[i].fitness <= 0.009999){
            bullseye3++;
            bullMean3 += toCalc[i].iteration;
        }
        if(toCalc[i].fitness <= 0.099999){
            bullseye2++;
            bullMean2 += toCalc[i].iteration;
        }
    }

    console.log(toCalc);
    console.log("Accuracy of : " + ((bullseye/tryes)*100) + "% aiming 0");
    console.log("Mean of converged Iterations : " + (bullMean/tryes) + " aiming 0");
    console.log("Accuracy of : " + ((bullseye3/tryes)*100) + "% aiming lesser than 0.009999");
    console.log("Mean of converged Iterations : " + (bullMean3/tryes) + " aiming lesser than 0.009999");
    console.log("Accuracy of : " + ((bullseye2/tryes)*100) + "% aiming lesser than 0.09999");
    console.log("Mean of converged Iterations : " + (bullMean2/tryes) + " aiming lesser than 0.09999");
}
statistics();
//main();