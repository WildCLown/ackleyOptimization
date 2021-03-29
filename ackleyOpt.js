const a = 20;
const b = 0.2;
const c = 2 * Math.PI;
const d = 30;
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
function makeX(){
    var fon = [];
    for(var i = 0; i<d;i++){
        fon.push(0);
    }
    return fon;
}
calcAckley(makeX())