import emailData from '/data.js'
import convertToCamelCase from './utils.js'

const createEmailBtn = document.getElementById("createEmailBtn")
const overlay = document.getElementById("overlay") 
const overlayMessage = document.getElementById("overlayMessage")
const emailTypeSelector = document.getElementById("emailType")
const inputContainer = document.getElementById("inputContainer")

//change values based on selected input
emailTypeSelector.addEventListener("change", renderEmailType)
createEmailBtn.addEventListener("click", createEmail)

function renderEmailType(){
    //reset container html content
    inputContainer.innerHTML = ""
    
    //grab email value inputs from emailData
    const currentEmailType = emailData[emailTypeSelector.value]
    const currentInputs = currentEmailType.inputs
       
    //render inputs to the screen
    for(let input in currentInputs){
        let curInput = currentInputs[input]
        let curInputCamel = convertToCamelCase(curInput)
        // add in camelCase function here
        inputContainer.innerHTML += `<label for="${curInputCamel}">${curInput}</label>
                <input type="input" name="${curInputCamel}" id="${curInputCamel}" placeholder="type ${curInput} here">
                <br>`
    }
}

function createEmail(){
    // grab email data and inputs
    const currentEmailType = emailData[emailTypeSelector.value]
    const currentInputs = currentEmailType.inputs
    
    let replaceMatrix = []
    //[{searchText: '{email}', value: userInput}, {searchText: '{email}', value: userInput}, {searchText: '{email}', value: userInput}]
    
    //convert to camelCase
    let templateValues = []
    for(let input in currentInputs){
       templateValues.push(`${convertToCamelCase(currentInputs[input])}`)
    }
    console.log(templateValues)
    
    //grab values from user input
    let userInputs = []
    for(let input in templateValues){
        let currentValueHtml = document.getElementById(`${templateValues[input]}`)
        userInputs.push(currentValueHtml.value)
    }
    console.log(userInputs)
    
    //create email using user input values
    let currentEmailTemplate = currentEmailType.emailTemplate
    for(let i = 0; i < templateValues.length; i++){
     currentEmailTemplate = currentEmailTemplate.replaceAll(templateValues[i], userInputs[i])
     console.log(temp)
    
    }
    
    //loop over replaceMatrix
    // for(let i = 0; i < replaceMatrix.length; i++){
    //     const {searchText, value: v} = replaceMatrix[i]
    //     currentEmailTemplate = currentEmailTemplate.replaceAll(searchText, value)
    // }

}


// createEmailBtn.addEventListener("click", function(){
//     //get values from inputs
//     const email = document.getElementById("email").value
//     const firstName = document.getElementById("firstName").value
//     const lastName = document.getElementById("lastName").value
    
//     //create new CreateEmail instance
//     const positiveEmailOutput = new CreateEmail(email, firstName, lastName)
    
//     //active overlay
//     overlayMessage.innerHTML = `${positiveEmailOutput.positiveEmail()}`
//     overlay.style.display = "block"
// })
