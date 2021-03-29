const a = 20;
const b = 0.2;
const c = 2 * Math.PI;
const d = 30;
function calcAckley(x) {//x é um vetor
    var inF = 0;
    var inS = 0;
    for (var i = 0; i < d; i++) {
        inF += Math.pow(x[i],2);
        inS += Math.cos((x[i]*c));
    }
    // console.log(inF);
    // console.log(inS);
    inF = ((-b) * (Math.sqrt(inF)));
    inS = (inS/d);
    console.log("inF : " + inF);
    console.log("inS : " + inS);
    var fiSide = -a * Math.exp(inF);
    var secSide = Math.exp(inS) + a + Math.exp(1);
    console.log("fiSide : "+ fiSide)
    console.log("secSide : "+ secSide)
    var result = fiSide - secSide;
    var result = (-a * Math.exp(inF)) - Math.exp(inS) + a + Math.exp(1);
    console.log("Result : " + result)
    return result;
}
function makeX(){
    var fon = [];
    for(var i = 0; i<d;i++){
        fon.push(0);
    }
    return fon;
}
console.log(calcAckley(makeX()))