import * as d3 from 'd3';

function initDisplay(container) {
  visualContainer = container;
  display();
}

function displayR(message, isSuccess = false) {
    const elementData = document.getElementById("addedElements");
    elementData.textContent = message;
    elementData.style.display = "block";
    
    
    if (isSuccess) {
        elementData.style.borderColor = "#00CC66";
        elementData.style.backgroundColor = "rgba(0, 204, 102, 0.2)";
    } else {
        elementData.style.borderColor = "#FF9500";
        elementData.style.backgroundColor = "rgba(255, 149, 0, 0.2)";
    }
    
    
    elementData.style.animation = "none";
    setTimeout(() => {elementData.style.animation = "fadeIn 0.5s ease-in-out";}, 10);
}


const numValues =  64;

const dataset = Array.from({ length: numValues }, (_, i) => ({ value: i + 1 }));

let visualCanvas, twoDArr;



function startDFSAnimation(){

    const startValue = document.getElementById("Start-DFS-Value").value;
    const endValue = document.getElementById("End-DFS-Value").value;
    let speedValue = document.getElementById("Speed-DFS-Value").value;

    if(speedValue === ""){
        speedValue = 1;
    }

    if(startValue === "" || endValue === ""){
    
        displayR("Input Error"); 
    }else{

        let DFSresult = runDFS(Number(startValue), Number(endValue));
        animateDFS(DFSresult, Number(speedValue));
        console.log(DFSresult);
    }

}

function animateDFS(dfsOrder, speed) {

    twoDArr.selectAll("rect")
        .attr("fill", "#3498db");
        
    dfsOrder.forEach((value, index) => {
        setTimeout(() => {
            const rect = twoDArr.selectAll("rect")
                .filter((d) => d.value === value);
            rect.attr("fill", index === dfsOrder.length - 1 ? "#00CC66" : "#FF9500");
            displayR(`Step ${index + 1}: Visited ${value}`, index === dfsOrder.length - 1);
        }, index * 500 / speed); 

    });


}

function Reset (){
    window.location.reload();
}

function display() {    

    d3.select(".visual").selectAll("svg").remove();

    const visualContainer = document.querySelector(".visual");
    const visualWidth = visualContainer.clientWidth;
    const visualHeight = visualContainer.clientHeight;
    
    const numCol = Math.sqrt(numValues);
    const gridSize = 75;
    const gridW = numCol * gridSize;
    const gridH = Math.ceil(dataset.length / numCol) * gridSize;
    
    

    visualCanvas = d3.select(".visual")
        .append("svg")
        .attr("width", visualWidth)
        .attr("height", visualHeight)
        .style("position", "absolute")
        .style("display", "flex")
        .style("justify-content", "center")
        .style("align-items", "center");
    

    twoDArr = visualCanvas.append("g")
        .attr("transform", `translate(${(visualWidth - gridW) / 2}, ${(visualHeight - gridH) / 2})`);

    twoDArr.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => (i % numCol) * gridSize)
        .attr("y", (d, i) => Math.floor(i / numCol) * gridSize) 
        .attr("width", 60)
        .attr("height", 60) 
        .attr("fill", "#3498db")
        .attr("stroke", "navy")
        .attr("stroke-width", 2)
        .attr("rx", 5) 
        .attr("ry", 5);

    twoDArr.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", (d, i) => (i % numCol) *  gridSize + 30) 
        .attr("y", (d, i) => Math.floor(i / numCol) * gridSize+  30) 
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle") 
        .style("font-size", "16px")
        .style("fill", "white")
        .style("font-weight", "bold")
        .text(d => d.value);

}

function runDFS(startNum, endNum) {
    const ROW = Math.ceil(Math.sqrt(dataset.length));
    const COL = Math.ceil(dataset.length / ROW);

    let dRow = [0, 1, 0, -1];
    let dCol = [-1, 0, 1, 0];

    function isValid(vis, row, col) {
        if (row < 0 || col < 0 || row >= ROW || col >= COL) return false;
        if (vis[row][col]) return false;
        return true;
    }

    function DFS(row, col, vis) {
        let st = [];
        st.push([row, col]);

        let dfsOrder = [];  

        while (st.length !== 0) {
            let curr = st.pop();
            let row = curr[0];
            let col = curr[1];

            if (!isValid(vis, row, col)) { continue; }

            vis[row][col] = true;
            const index = row * COL + col;
            const cell = dataset[index];

            dfsOrder.push(cell.value);

            if (cell.value === endNum) {
                break;
            }

            for (let i = 0; i < 4; i++) {
                let adjx = row + dRow[i];
                let adjy = col + dCol[i];
    
                if (isValid(vis, adjx, adjy)) {
                    st.push([adjx, adjy]);
                }
            }
        }

        return dfsOrder;  
    }

    let startIndex = dataset.findIndex(item => item.value === startNum);
    let startRow = Math.floor(startIndex / COL);
    let startCol = startIndex % COL;

    let vis = Array.from(Array(ROW), () => Array(COL).fill(false));

    let result = DFS(startRow, startCol, vis);
    
    return result;  
}

window.onload = function() {
    display();
};

export { startDFSAnimation, Reset, display, initDisplay}
