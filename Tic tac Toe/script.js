const block=document.getElementById("block")
const turn=document.getElementById("turn")
const reset=document.getElementById("reset")
const result=document.getElementById("result")


let currentplayer="X"

let state=Array(9).fill(null)

const winnincomb=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [2,4,6]
]

function createboard(){
    for(let i=0;i<9;i++){

        const cell=document.createElement("div")
        cell.classList.add("cell")
        cell.dataset.index=i;
        cell.addEventListener("click",handleclick)
        block.appendChild(cell)
        cell.style.fontSize="50px"
    }
}



function handleclick(event){
    const index=event.target.dataset.index
    if(state[index]!==null|| chekwinnerr()){
        return
    }
    state[index]=currentplayer
    event.target.textContent=currentplayer

    if(chekwinnerr()){
        result.textContent=`${currentplayer} is Winner 🎉🎉`
        // result.style.color="gold"

        // Change background color of winning cells
        winnincomb.forEach((combination) => {
            if (combination.every((index) => state[index] === currentplayer)) {
                combination.forEach((index) => {
                    block.children[index].style.backgroundColor = "lightgreen";
                });
            }
        });
    }
    else if(state.every((cell)=>cell!==null)){
        result.textContent="Draw"
        // result.style.color="white"
        turn.textContent="Try Again"
    }
    else{
        currentplayer=currentplayer==="X"?"O":"X";
        turn.textContent=`${currentplayer}'s Turn`
    }
}



function chekwinnerr(){

    return winnincomb.some((combination)=>{
        return combination.every((index)=>state[index]===currentplayer)
    })
}




function resetGame(){
    state.fill(null)
    currentplayer="X"
    Array.from(block.children).forEach((cell)=>{
        cell.textContent="";
        
        cell.style.backgroundColor = ""; // Reset background color
        cell.classList.remove('winner'); // Remove winner class

    })
    turn.textContent="X's Turn"
    result.textContent=""

}


createboard()
reset.addEventListener("click",resetGame)