//This plugin resizes text to fit in its textbox

// show form
figma.showUI(__html__, { width: 400, height: 580 });

figma.ui.onmessage = msg => {
  // Extract font size constraints if provided
  const minFontSize = msg.minFontSize !== null ? msg.minFontSize : undefined;
  const maxFontSize = msg.maxFontSize !== null ? msg.maxFontSize : undefined;
  
  if (msg.type === 'selection'){
    const nodes = figma.currentPage.selection
    const totalNodes = nodes.filter(node => node.type === 'TEXT').length
    let processedNodes = 0
    
    // Send initial progress update
    figma.ui.postMessage({ 
      type: 'progress-update', 
      percent: 0,
      status: `Processing 0/${totalNodes} text elements...`
    })
    
    // Process each node and update progress
    const processNodes = async () => {
      for (const node of nodes) {
        if (node.type === 'TEXT'){
          await loadFont(node.fontName)
          resizeText(node, minFontSize, maxFontSize)
          
          // Update progress
          processedNodes++
          const percent = Math.round((processedNodes / totalNodes) * 100)
          figma.ui.postMessage({ 
            type: 'progress-update', 
            percent: percent,
            status: `Processing ${processedNodes}/${totalNodes} text elements...`
          })
        }
      }
      
      // Send completion message
      figma.ui.postMessage({ 
        type: 'progress-update', 
        percent: 100,
        status: `Completed! Processed ${processedNodes} text elements.`
      })
    }
    
    processNodes()
  }
  else if (msg.type === 'text')
  {
    const tIds = msg.textIds.split(',')
    const nodes: SceneNode[] = figma.currentPage.findAll(node => node.type === "TEXT" && tIds.includes(node.name))
    const totalNodes = nodes.length
    let processedNodes = 0
    
    // Send initial progress update
    figma.ui.postMessage({ 
      type: 'progress-update', 
      percent: 0,
      status: `Processing 0/${totalNodes} text elements...`
    })
    
    // Process each node and update progress
    const processNodes = async () => {
      for (const node of nodes) {
        if (node.type === 'TEXT'){
          await loadFont(node.fontName)
          resizeText(node, minFontSize, maxFontSize)
          
          // Update progress
          processedNodes++
          const percent = Math.round((processedNodes / totalNodes) * 100)
          figma.ui.postMessage({ 
            type: 'progress-update', 
            percent: percent,
            status: `Processing ${processedNodes}/${totalNodes} text elements...`
          })
        }
      }
      
      // Send completion message
      figma.ui.postMessage({ 
        type: 'progress-update', 
        percent: 100,
        status: `Completed! Processed ${processedNodes} text elements.`
      })
    }
    
    processNodes()
  }
  else if (msg.type === 'quartermaster')
  {
    // Process each preset
    const presets = msg.presets;
    
    // Calculate total nodes to process
    let totalNodesCount = 0;
    let processedNodesCount = 0;
    let currentPresetIndex = 0;
    
    // First count all nodes across all presets
    for (const preset of presets) {
      const textName = preset.name;
      const nodes = figma.currentPage.findAll(node => 
        node.type === "TEXT" && node.name === textName
      );
      totalNodesCount += nodes.length;
    }
    
    // Send initial progress update
    figma.ui.postMessage({ 
      type: 'progress-update', 
      percent: 0,
      status: `Processing preset 1/${presets.length}: 0/${totalNodesCount} text elements...`
    });
    
    // Process each preset sequentially to ensure fonts are loaded properly
    const processPresets = async () => {
      for (const preset of presets) {
        currentPresetIndex++;
        const textName = preset.name;
        const minFontSize = preset.minFontSize !== null ? preset.minFontSize : undefined;
        const maxFontSize = preset.maxFontSize !== null ? preset.maxFontSize : undefined;
        
        // Find nodes matching the name
        const nodes: SceneNode[] = figma.currentPage.findAll(node => 
          node.type === "TEXT" && node.name === textName
        );
        
        // Process each node
        for (const node of nodes) {
          if (node.type === 'TEXT') {
            await loadFont(node.fontName);
            resizeText(node, minFontSize, maxFontSize);
            
            // Update progress
            processedNodesCount++;
            const percent = Math.round((processedNodesCount / totalNodesCount) * 100);
            figma.ui.postMessage({ 
              type: 'progress-update', 
              percent: percent,
              status: `Processing preset ${currentPresetIndex}/${presets.length}: ${processedNodesCount}/${totalNodesCount} text elements...`
            });
          }
        }
      }
      
      // Send completion message
      figma.ui.postMessage({ 
        type: 'progress-update', 
        percent: 100,
        status: `Completed! Processed ${processedNodesCount} text elements across ${presets.length} presets.`
      });
      
      // Notify user when all presets are processed
      figma.notify(`Processed ${presets.length} preset groups with ${processedNodesCount} text elements`);
    };
    
    // Start processing presets
    processPresets();
  }
  else if (msg.type === 'cancel') {
    figma.closePlugin()
  }
}



async function loadFont(fontName){
  await figma.loadFontAsync(fontName)
}



function resizeText(node: TextNode, minFontSize?: number, maxFontSize?: number){
  const _height = node.height
  node.textAutoResize = "HEIGHT"
  var _currentHeight = node.height
  if (_currentHeight > _height){
    shrinkText(node, _height, minFontSize)
  }
  else{
    growText(node, _height, maxFontSize)
  }
  node.textAutoResize = "NONE"
  node.resize(node.width, _height)
}

function shrinkText(node: TextNode, desiredHeight: number, minFontSize?: number){
  var currentHeight = node.height

  while (currentHeight > desiredHeight){
    if (typeof(node.fontSize) === "number"){
      // Check if we've reached the minimum font size
      if (minFontSize !== undefined && node.fontSize <= minFontSize) {
        break;
      }
      // Use 0.5pt increments instead of 1.0pt
      node.fontSize -= 0.5
    }
    currentHeight = node.height
  }
}

function growText(node: TextNode, desiredHeight: number, maxFontSize?: number){
  var currentHeight = node.height
  var hitMaxSize = false

  while (currentHeight < desiredHeight){
    if (typeof(node.fontSize) === "number"){
      // Check if we've reached the maximum font size
      if (maxFontSize !== undefined && node.fontSize >= maxFontSize) {
        hitMaxSize = true;
        break;
      }
      // Use 0.5pt increments instead of 1.0pt
      node.fontSize += 0.5
    }
    currentHeight = node.height
  }
  
  // Only decrease font size if we didn't hit the max size constraint
  // This allows text to go exactly up to the max size if specified
  if (!hitMaxSize && typeof(node.fontSize) === "number"){
    node.fontSize -= 0.5
  }
}