// Defining filter properties
let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit: "%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit: "%"
    },
   
    saturation:{
        value:100,
        min:0,
        max:200,
        unit: "%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit: "deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit: "px"

    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit: "%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit: "%"
    },
    opacity:{
        value:100,
        min:0,
        max:200,
        unit: "%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit: "%"
    },

}

// Selecting DOM elements
 const imageCanvas = document.querySelector("#image-canvas")
 const imaInput = document.querySelector("#image-input")
 const canvasCtx = imageCanvas.getContext("2d")
 const resetButton = document.querySelector("#reset-btn")
 const downloadButton = document.querySelector("#download-btn")
 const toast = document.querySelector("#toast")
 const presetsContainer = document.querySelector(".presets")
 let image = null
 let file = null

 const filtersContainer = document.querySelector(".filters")

// Helper: update range slider track progress (for CSS)
function updateRangeBackground(input){
    const min = Number(input.min) || 0
    const max = Number(input.max) || 100
    const val = Number(input.value) || 0
    const percent = ((val - min) / (max - min)) * 100

    // Pass percentage to CSS via custom property
    input.style.setProperty('--range-progress', `${percent}%`)
}

// Function to create filter UI elements
function createFilterElement(name, unit="%" , value, min, max){
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    // initial background for slider track
    updateRangeBackground(input)

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)


    input.addEventListener("input", (dets) => {
        filters[name].value = input.value
        updateRangeBackground(input)
        applyFilters()
    })

    return div







}
// Generating filter UI elements dynamically

function createFilters(){
    Object.keys(filters).forEach(key =>{
    const filterElement = createFilterElement(key, filters[key].unit,  filters[key].value, filters[key].min, filters[key].max )
    filtersContainer.appendChild(filterElement)
    
})
}

createFilters()

// Handling image upload
imaInput.addEventListener("change", (dets) => {
     file = dets.target.files[0]
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display = "none"
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () =>{
        image = img
       imageCanvas.width =img.width
       imageCanvas.height = img.height 
       canvasCtx.drawImage(img,0,0)
    }

  

})


// Applying filters to the image
function applyFilters(){
     canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})`.trim()
    canvasCtx.drawImage(image,0,0)

}

// Resetting filters to default values
resetButton.addEventListener("click", () => {
    filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit: "%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit: "%"
    },
    
    saturation:{
        value:100,
        min:0,
        max:200,
        unit: "%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit: "deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit: "px"

    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit: "%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit: "%"
    },
    opacity:{
        value:100,
        min:0,
        max:200,
        unit: "%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit: "%"
    },

    }
     applyFilters()
     filtersContainer.innerHTML =""
     createFilters()
})


// Downloading the edited image
downloadButton.addEventListener("click", (dets) => {
    // change button text while downloading
    const originalText = downloadButton.innerText
    downloadButton.innerText = "Downloading..."
    downloadButton.disabled = true

    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
 
    // show toast
    toast.classList.remove("hide")
    toast.classList.add("show")

    // auto hide after 3 sec
    setTimeout(() => {
        toast.classList.remove("show")
        toast.classList.add("hide")

        // reset button text after download feedback
        downloadButton.innerText = originalText
        downloadButton.disabled = false
    }, 3000)
})

// Predefined filter presets
const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  drama: {
    brightness: 105,
    contrast: 140,
    saturation: 130,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 95,
    contrast: 110,
    saturation: 80,
    hueRotation: 10,
    blur: 1,
    grayscale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    brightness: 90,
    contrast: 120,
    saturation: 70,
    hueRotation: 0,
    blur: 0,
    grayscale: 30,
    sepia: 60,
    opacity: 100,
    invert: 0,
  },

  blackAndWhite: {
    brightness: 100,
    contrast: 130,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 105,
    contrast: 110,
    saturation: 120,
    hueRotation: 10,
    blur: 0,
    grayscale: 0,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 100,
    contrast: 110,
    saturation: 90,
    hueRotation: 200,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  faded: {
    brightness: 110,
    contrast: 80,
    saturation: 70,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  horror: {
    brightness: 80,
    contrast: 150,
    saturation: 50,
    hueRotation: 180,
    blur: 1,
    grayscale: 20,
    sepia: 0,
    opacity: 100,
    invert: 10,
  },
  cinematic: {
    brightness: 105,
    contrast: 135,
    saturation: 110,
    hueRotation: 190,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  tealOrange: {
    brightness: 100,
    contrast: 140,
    saturation: 125,
    hueRotation: 200,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  moody: {
    brightness: 90,
    contrast: 150,
    saturation: 80,
    hueRotation: 0,
    blur: 0,
    grayscale: 15,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  softGlow: {
    brightness: 110,
    contrast: 95,
    saturation: 105,
    hueRotation: 0,
    blur: 2,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },
  sunsetGlow:{
    brightness: 115,
    contrast: 85,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,

  },
  blackAndWhite:{
     brightness: 115,
    contrast: 85,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },
  faceGlow:{
    brightness: 115,
    contrast: 85,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,

  },

  pastel: {
    brightness: 115,
    contrast: 85,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  retro: {
    brightness: 95,
    contrast: 120,
    saturation: 85,
    hueRotation: 15,
    blur: 1,
    grayscale: 10,
    sepia: 50,
    opacity: 100,
    invert: 0,
  },

  neon: {
    brightness: 110,
    contrast: 160,
    saturation: 160,
    hueRotation: 120,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  dreamy: {
    brightness: 115,
    contrast: 90,
    saturation: 105,
    hueRotation: 0,
    blur: 3,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  highKey: {
    brightness: 125,
    contrast: 105,
    saturation: 110,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  lowKey: {
    brightness: 80,
    contrast: 160,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 20,
    sepia: 0,
    opacity: 100,
    invert: 0,
  }
};


// Creating preset buttons dynamically
Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click", () => {
       const preset = presets[presetName]
       Object.keys(preset).forEach(filterName => {
        filters [filterName].value = preset [filterName]
       })

       applyFilters()
       filtersContainer.innerHTML =""
       createFilters()

    })



})













