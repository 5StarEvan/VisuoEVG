import * as d3 from "d3";

const queue = [];

const containerDetails = { 
  width: 600,  
  height: 100,  
  maxWidth: 0,  
  strokeWidth: 10, 
  rectWidth: 60,  
  rectHeight: 60, 
  rectSpacing: 10,  
  leftPadding: 20, 
  rightPadding: 20 
};

function home() {
  window.location.href = "home";
}

function list() {
  window.location.href = "list";
}

function displayR(message, isSuccess = false) {
  const elementData = document.getElementById("addedElements");
  if (!elementData) return;
  
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

function reset() {
  queue.length = 0; 
  document.getElementById("Input-Value").value = "";
  displayR("Queue has been reset");
  display();
}

function addValue() {
  const inputElement = document.getElementById("Input-Value");
  const inputValue = inputElement.value.trim();

  if (inputValue === "") {
    displayR("Please enter a value!");
    return;
  }
  
  const numericValue = Number(inputValue);

  if (!isNaN(numericValue)) {
    queue.push(numericValue); 
    inputElement.value = ""; 
    displayR(`Added value ${numericValue} to the queue`, true);
  } else {
    displayR("Please enter a valid number!"); 
  }

  display(true); 
}

function removeValue() {
  if (queue.length > 0) {
    const dequeuedValue = queue.shift(); 
    displayR(`Value ${dequeuedValue} has been dequeued!`);
    display(false, dequeuedValue); 
  } else {
    displayR("Queue is empty!");
    display(); 
  }
}

let visualContainer;

function initDisplay(container) {
  visualContainer = container;
  display();
  window.addEventListener('resize', display);
}

function display(isEnqueue = false, dequeuedValue = null) {
  
  let container = document.getElementById("queue-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "queue-container";
    visualContainer.appendChild(container);
  }
  
  
  container.innerHTML = "";
  
  
  containerDetails.maxWidth = window.innerWidth * 0.75; 
  const requiredWidth = (queue.length * (containerDetails.rectWidth + containerDetails.rectSpacing)) + 
                        containerDetails.leftPadding + containerDetails.rightPadding;
  const containerWidth = Math.min(Math.max(600, requiredWidth), containerDetails.maxWidth);
  
  
  container.style.width = `${containerWidth}px`;
  container.style.height = `${containerDetails.height}px`;
  
  
  let Overflowing = requiredWidth > containerDetails.maxWidth;
  
  if (Overflowing) {
    const availableWidth = containerDetails.maxWidth - containerDetails.leftPadding - containerDetails.rightPadding;
    const totalItems = queue.length;
    const widthPerItem = availableWidth / totalItems;
    const scaleFactor = widthPerItem / (containerDetails.rectWidth + containerDetails.rectSpacing);
    containerDetails.rectWidth = Math.max(30, Math.floor(containerDetails.rectWidth * scaleFactor)); 
    containerDetails.rectSpacing = Math.max(5, Math.floor(containerDetails.rectSpacing * scaleFactor)); 
  }
  
  
  const exitLabel = document.createElement("div");
  exitLabel.textContent = "EXIT";
  exitLabel.style.position = "absolute";
  exitLabel.style.left = "-40px"; 
  exitLabel.style.color = "white";
  exitLabel.style.fontWeight = "bold";
  exitLabel.style.fontSize = "14px"; 
  container.appendChild(exitLabel);
  
  
  const entranceLabel = document.createElement("div");
  entranceLabel.textContent = "ENTRANCE";
  entranceLabel.style.position = "absolute";
  entranceLabel.style.right = "-80px"; 
  entranceLabel.style.color = "white";
  entranceLabel.style.fontWeight = "bold";
  entranceLabel.style.fontSize = "14px"; 
  container.appendChild(entranceLabel);
  
  
  const queueItemsWrapper = document.createElement("div");
  queueItemsWrapper.style.display = "flex";
  queueItemsWrapper.style.flexDirection = "row";
  queueItemsWrapper.style.justifyContent = "center"; 
  queueItemsWrapper.style.alignItems = "center"; 
  queueItemsWrapper.style.overflow = "hidden"; 
  queueItemsWrapper.style.width = "100%";
  queueItemsWrapper.style.height = "100%";
  queueItemsWrapper.style.position = "relative";
  container.appendChild(queueItemsWrapper);
  
  
  queue.forEach((value, index) => {
    const rect = document.createElement("div");
    rect.className = "queue-item";
    rect.textContent = value;
    rect.style.width = `${containerDetails.rectWidth}px`;
    rect.style.height = `${containerDetails.rectHeight}px`;
    
    
    if (index === 0 && queue.length > 0) {
      rect.style.border = "2px solid #FF9500"; 
      rect.style.boxShadow = "0 0 10px rgba(255, 149, 0, 0.6)"; 
    }
    
    
    if (isEnqueue && index === queue.length - 1) {
      rect.style.animation = "enqueueAnimation 0.5s ease-out";
    }
    
    queueItemsWrapper.appendChild(rect);
  });
  
  
  if (dequeuedValue !== null) {
    const dequeuedContainer = document.createElement("div");
    dequeuedContainer.style.position = "absolute";
    dequeuedContainer.style.left = "0";
    dequeuedContainer.style.top = "0";
    dequeuedContainer.style.width = `${containerWidth}px`; 
    dequeuedContainer.style.height = "100%";
    dequeuedContainer.style.display = "flex";
    dequeuedContainer.style.alignItems = "center"; 
    dequeuedContainer.style.overflow = "hidden"; 
    dequeuedContainer.style.pointerEvents = "none";
    dequeuedContainer.style.zIndex = "20"; 
    container.appendChild(dequeuedContainer);
    
    const dequeuedRect = document.createElement("div");
    dequeuedRect.className = "queue-item";
    dequeuedRect.textContent = dequeuedValue;
    dequeuedRect.style.width = `${containerDetails.rectWidth}px`;
    dequeuedRect.style.height = `${containerDetails.rectHeight}px`;
    dequeuedRect.style.backgroundColor = "#2980b9"; 
    dequeuedRect.style.position = "absolute";
    dequeuedRect.style.top = "50%";
    dequeuedRect.style.transform = "translateY(-50%)"; 
    dequeuedRect.style.left = `${containerDetails.leftPadding}px`; 
    dequeuedRect.style.border = "2px solid #FF9500"; 
    dequeuedRect.style.boxShadow = "0 0 10px rgba(255, 149, 0, 0.6)"; 
    dequeuedRect.style.animation = "improvedDequeueAnimation 1.2s ease-in-out forwards";  
    dequeuedContainer.appendChild(dequeuedRect);
    
    
    setTimeout(() => {
      if (container.contains(dequeuedContainer)) {
        container.removeChild(dequeuedContainer);
      }
    }, 1500);
  }
  
  
  if (queue.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.textContent = "Queue is empty";
    emptyMessage.style.padding = "8px"; 
    emptyMessage.style.color = "#ffffff";
    emptyMessage.style.fontStyle = "italic";
    emptyMessage.style.fontSize = "16px"; 
    queueItemsWrapper.appendChild(emptyMessage);
  }
}

export { initDisplay, addValue, removeValue, reset, home, list };