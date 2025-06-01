import * as d3 from 'd3';

const dataset = [1];
let nodePositions = [];
let searchAnimationInProgress = false;
let searchAnimationTimer, visualContainer = null;

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
  setTimeout(() => {
    elementData.style.animation = "fadeIn 0.5s ease-in-out";
  }, 10);
}

function checkIndex(indexValue, maxIndex, allowEqual = false) {
  if (indexValue === undefined || indexValue === "") {
    return -1;
  }
  
  const index = Number(indexValue);
  
  if (isNaN(index)) {
    displayR("Please enter a valid index number!");
    return null;
  }
  
  if (!Number.isInteger(index)) {
    displayR("Index must be an integer!");
    return null;
  }
  
  const maxAllowed = allowEqual ? maxIndex : maxIndex - 1;
  if (index < 0 || index > maxAllowed) {
    displayR(`Index must be between 0 and ${maxAllowed} !`);
    return null;
  }
  
  return index;
}

function searchValue() {
  if (searchAnimationInProgress) {
    clearTimeout(searchAnimationTimer);
    searchAnimationInProgress = false;
    display();
  }

  const inputElement = document.getElementById("Input-Value");
  const indexElement = document.getElementById("Input-Index");
  
  const inputValue = inputElement.value.trim();
  const indexValue = indexElement.value.trim();
  
  if (inputValue === "") {
    displayR("Please enter a value!");
    return;
  }
  
  const numVal = Number(inputValue);

  if (isNaN(numVal)) {
    displayR("Please enter a valid number!");
    return;
  }

  if (indexValue !== "") {
    const index = checkIndex(indexValue, dataset.length);
    if (index === null) return;
    
    if (index !== -1) {
      d3.selectAll(".node rect").style("fill", "url(#squareGradient)");
      d3.selectAll(".node")
        .filter((d, i) => i === index)
        .select("rect")
        .style("fill", dataset[index] === numVal ? "#00CC66" : "#FF9500");
      
      if (dataset[index] === numVal) {
        displayR(`Index ${index} contains value ${numVal}: TRUE`, true);
      } else {
        displayR(`Index ${index} contains value ${numVal}: FALSE`);
      }
      return;
    }
  }
  
  const targetIndex = dataset.indexOf(numVal);
  
  animateSearch(0, numVal);
}

function animateSearch(currentIndex, targetValue) {
  searchAnimationInProgress = true;
  
  d3.selectAll(".node rect").style("fill", "url(#squareGradient)");
  
  if (currentIndex >= dataset.length) {
    displayR(`Value ${targetValue} not found in the dataset!`);
    searchAnimationInProgress = false;
    
    display();
    return;
  }
  
  d3.selectAll(".node").filter((d, i) => i === currentIndex).select("rect").style("fill", "#FF9500");
  
  displayR(`Searching at index ${currentIndex}...`);

  if (dataset[currentIndex] === targetValue) {
    setTimeout(() => {
      d3.selectAll(".node")
        .filter((d, i) => i === currentIndex)
        .select("rect")
        .style("fill", "#00CC66");
        
      displayR(`Found value ${targetValue} at index ${currentIndex} !`, true);
      searchAnimationInProgress = false;
    }, 500);
  } else {
    searchAnimationTimer = setTimeout(() => { animateSearch(currentIndex + 1, targetValue);}, 500);
  }
}

function addValue() {
  const inputElement = document.getElementById("Input-Value");
  const indexElement = document.getElementById("Input-Index");
  const inputValue = inputElement.value.trim();
  const indexValue = indexElement.value.trim();
  const numVal = Number(inputValue);

  if (inputValue === "") {
    displayR("Please enter a value!");
    return;
  }
  
  if (isNaN(numVal)) {
    displayR("Please enter a valid number!");
    return;
  }
  
  const index = checkIndex(indexValue, dataset.length, true);
  if (index === null) return;
  
  const visualWidth = visualContainer.clientWidth;
  const visualHeight = visualContainer.clientHeight;
  
  if (index === -1) {
    dataset.push(numVal);
    
    if (nodePositions.length > 0) {
      const lastPos = nodePositions[nodePositions.length - 1];
      nodePositions.push({ 
        x: lastPos.x + 100, 
        y: lastPos.y
      });
    } else {
      nodePositions.push({ x: visualWidth / 2, y: visualHeight / 2 });
    }
    
    displayR(`Added value ${numVal} to the end of the dataset at index ${dataset.length - 1}`, true);

  } else {
    
    dataset.splice(index, 0, numVal);
    
    let newPosition;
    
    if (nodePositions.length === 0) {
      newPosition = { 
        x: visualWidth / 2, 
        y: visualHeight / 2 
      };
    } else if (index === 0) {
      newPosition = { 
        x: nodePositions[0].x - 100, 
        y: nodePositions[0].y 
      };
    } else if (index === nodePositions.length) {
      newPosition = { 
        x: nodePositions[nodePositions.length - 1].x + 100, 
        y: nodePositions[nodePositions.length - 1].y 
      };
    } else {
      newPosition = { 
        x: (nodePositions[index - 1].x + nodePositions[index].x) / 2, 
        y: nodePositions[index].y 
      };
    }
    
    nodePositions.splice(index, 0, newPosition);
    
    displayR(`Added value ${numVal} at index ${index}`, true);
  }
  
  inputElement.value = "";
  indexElement.value = "";
  
  display();
}

function removeValue() {
  const inputElement = document.getElementById("Input-Value");
  const indexElement = document.getElementById("Input-Index");
  
  const inputValue = inputElement.value.trim();
  const indexValue = indexElement.value.trim();
  
  if (inputValue === "" && indexValue === "") {
    displayR("Please enter either a value or an index to remove!");
    return;
  }
  
  if (indexValue !== "") {
    const index = checkIndex(indexValue, dataset.length);
    if (index === null) return;
    
    if (index !== -1) {
      const removedValue = dataset[index];
      dataset.splice(index, 1);
      nodePositions.splice(index, 1);
      
      inputElement.value = "";
      indexElement.value = "";
      
      displayR(`Removed value ${removedValue} from index ${index}`, true);
      display();
      return;
    }
  }
  
  const numVal = Number(inputValue);

  if (!isNaN(numVal)) {
    const index = dataset.indexOf(numVal);

    if (index !== -1) {
      dataset.splice(index, 1);
      nodePositions.splice(index, 1);
      
      inputElement.value = "";
      indexElement.value = "";
      
      displayR(`Removed value ${numVal} from the dataset`, true);
    } else {
      displayR("The number is not in the dataset!");
    }
  } else {
    displayR("Please enter a valid number!");
  }

  display();
}

function reset() {
  nodePositions = [];
  location.reload();
}

function display() {
  if (!visualContainer) return;
  
  d3.select(visualContainer).selectAll("svg").remove();

  const visualWidth = visualContainer.clientWidth;
  const visualHeight = visualContainer.clientHeight;

  if (nodePositions.length === 0) {
    const centerX = visualWidth / 2;
    const centerY = visualHeight / 2;
    
    for (let i = 0; i < dataset.length; i++) {
      if (i === 0) {
        nodePositions.push({ x: centerX, y: centerY });
      } else {
        nodePositions.push({ 
          x: nodePositions[i-1].x + 70, 
          y: centerY 
        });
      }
    }
  }

  const visualCanvas = d3.select(visualContainer)
    .append("svg")
    .attr("width", visualWidth)
    .attr("height", visualHeight);

  const width = visualWidth;
  const height = visualHeight;

  const squarePositions = dataset.map((d, i) => ({
    x: nodePositions[i].x,
    y: nodePositions[i].y,
    value: d,
    id: i
  }));

  function updateLines() {
    visualCanvas.selectAll("line").remove();

    for (let i = 0; i < squarePositions.length - 1; i++) {
      visualCanvas.append("line")
        .attr("x1", squarePositions[i].x)
        .attr("y1", squarePositions[i].y)
        .attr("x2", squarePositions[i + 1].x)
        .attr("y2", squarePositions[i + 1].y)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .lower();
    }
  }

  const squareSize = 60;
  const padding = 10;
  const minX = padding + squareSize / 2;
  const maxX = width - squareSize / 2 - padding;
  const minY = padding + squareSize / 2;
  const maxY = height - squareSize / 2 - padding;

  function dragstarted(event, d) {
    d3.select(this).select("rect").style("cursor", "grabbing");
  }

  function dragged(event, d) {
    d.x = Math.max(minX, Math.min(maxX, event.x));
    d.y = Math.max(minY, Math.min(maxY, event.y));

    d3.select(this).attr("transform", `translate(${d.x}, ${d.y})`);

    nodePositions[d.id].x = d.x;
    nodePositions[d.id].y = d.y;

    updateLines();
  }

  function dragended(event, d) {
    d3.select(this).select("rect").style("cursor", "grab");
  }

  const nodes = visualCanvas.selectAll(".node")
    .data(squarePositions)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x}, ${d.y})`)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  updateLines();

  const defs = visualCanvas.append("defs");

  const gradient = defs.append("linearGradient")
    .attr("id", "squareGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#6CA6CD");
  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#36648B");

  nodes.append("rect")
    .attr("width", 40)
    .attr("height", 40)
    .attr("x", -20)
    .attr("y", -20)
    .style("fill", "url(#squareGradient)")
    .style("filter", "drop-shadow(0px 3px 5px rgba(0,0,0,0.3))")
    .attr("stroke", "#4682B4")
    .attr("stroke-width", 1.5)
    .style("cursor", "grab")
    .on("mouseover", function() {
      d3.select(this)
        .transition()
        .duration(150)
        .attr("width", 44)
        .attr("height", 44)
        .attr("x", -22)
        .attr("y", -22)
        .style("filter", "drop-shadow(0px 5px 8px rgba(0,0,0,0.4))");
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(150)
        .attr("width", 40)
        .attr("height", 40)
        .attr("x", -20)
        .attr("y", -20)
        .style("filter", "drop-shadow(0px 3px 5px rgba(0,0,0,0.3))");
    });

  nodes.append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", "white")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .style("pointer-events", "none")
    .text(d => d.value);

  nodes.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 30)
    .attr("fill", "white")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .text(d => `[${d.id}]`);
}

export {addValue, removeValue, searchValue, reset, display, initDisplay};