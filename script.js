//Create a Program that can convert Roman Numerals to Arabic Number
//and Arabic Number to Roman Numerals

//Let's get the input field 
let inputField = document.querySelector(".romanOrNum");
//Let's get the answer field
let answerField = document.querySelector(".answer");
//Let's get the Calculate Button
let calculateBtn = document.querySelector(".calculate");
//Let's get the Clear Button
let clearBtn = document.querySelector(".clearBtn");

//Let's define some regExp to filter unwanted keys
let allowedChar = /[ivxlcdm]|[0-9]/i; 
let allowedKeys = /\b[8|16|17|93|18|38|40|37|39]\b|116/;

inputField.onkeydown = (event)=> {
    if (allowedChar.test(event.key) !== true && allowedKeys.test(event.keyCode) !== true) {
        event.preventDefault();
    }
    console.log(event.key + " => " + event.keyCode);
}

//Will be used to check if User's input contains both
//Arabic Numbers and Roman Numerals
let romanAndNum = /[a-z][0-9]|[0-9][a-z]/i;

//When the Calcuate Button is clicked.
calculateBtn.onclick = ()=> {
    //First of, check if the Input field is empty
    if (inputField.value === "") {
        //if it is, 
        //add the "error" class to the answerField
        answerField.classList.add("error");
        //and change the value to this.
        answerField.value = "Enter a value!";
    
    //But if it contains a value, 
    //check if it contains both a Roman Numeral
    //and an Arabic Number;
    } else if (romanAndNum.test(inputField.value) == true) {
        //if it does, 
        //add the "error" class to the answerField
        answerField.classList.add("error");
        //and change the value to this.
        answerField.value = "Wrong Format!";
    } else {
        //Else, remove the "error" class on it
        //if there is any,
        answerField.classList.remove("error");
        //and then remove the error message inside.
        answerField.value = "";

        //After that, run this function to convert
        //the String to either a Roman Numeral or Arabic Number
        convertString(inputField.value);
    }
}

//This function will be called to convert User's input
function convertString(romanOrArab) {
    //This object will hold our Roman Numerals equivalents
    var romanEquiv = {
        "I": "1",
        "V": "5",
        "X": "10",
        "L": "50",
        "C": "100",
        "D": "500",
        "M": "1000"
    };

    
    var romanToNum = [];
    var formmatedString = [];

    //If the User's input is a Roman Numeral, perform these actions
    //Note: the 'i' after this regExp is to make it case in-sensitive
    if (/[a-z]/i.test(romanOrArab) == true) {

        //Get the User's input, make it into an array with 
        //the split() method, reverse the order of the array,
        //and join the array elements into a string
        var romanArabReverse = romanOrArab.split("").reverse().join("");
        
        //Using this for (..of..) loop, iterate over
        //each element in the array above
        for (letter of romanArabReverse) {

            //If there is data in the romanToNum array,
            //perform these actions
            if (romanToNum.length >= 1) {
                //Get the equivalent (the Number form) of the Roman                
                //Numeral returned by our for (..of..) loop
                var valueInNum = Number(romanEquiv[letter.toUpperCase()]);
                //If the Number is greater than or equal to the
                //previous one,
                if (valueInNum >= romanToNum[romanToNum.length-1]) {
                    //push the current Number into the 
                    //formmatedString array, with a 
                    //plus in front of it
                    formmatedString.push("+" + romanEquiv[letter.toUpperCase()]);                    
                } 
                else {
                    //But if the current Number is less than 
                    //the previous one, push the current
                    //Number into the formmatedString array,
                    //with a minus in front of it
                    formmatedString.push("-" + romanEquiv[letter.toUpperCase()]);
                    
                }
                //After that, push the Number into the
                //romanToNum array
                romanToNum.push(Number(romanEquiv[letter.toUpperCase()]));
            
            //But if there's no data in the romanToNum array,
            } else {                
                //Push the Number into the formmatedString array
                //without any operator in front of it
                formmatedString.push(romanEquiv[letter.toUpperCase()]);
                //Push the Number the romanToNum array
                romanToNum.push(Number(romanEquiv[letter.toUpperCase()]));
        
            }
        }
        //Print the calculation process in the Console
        console.log(formmatedString.join(""));
        //Join the elements in the formmatedString array
        //into a string, evaluate it, and put the result
        //in the answer field for User to see 
        answerField.value = eval(formmatedString.join(""));
    
    //But if User's input is an Arabic Number,
    } else if (/[0-9]/.test(romanOrArab) == true) {
        //convert it to Roman Numeral
        
        //Will hold numbers converted to Roman Numerals
        var arabToRoman;
        //This will hold the equivalents of the Arabic
        //Numbers based on their decimal places
        var decimalPlaces = {
            units: {
                "0": "",
                "1": "I",
                "2": "II",
                "3": "III",
                "4": "IV",
                "5": "V",
                "6": "VI",
                "7": "VII",
                "8": "VIII",
                "9": "IX"
            },
            tens: {
                "00": "",               
                "10": "X",
                "20": "XX",
                "30": "XXX",
                "40": "XL",
                "50": "L",
                "60": "LX",
                "70": "LXX",
                "80": "LXXX",
                "90": "XC"                
            },
            hundreds: {
                "000": "",
                "100": "C",
                "110": "CX",
                "120": "CXX",
                "130": "CXXX",
                "140": "CXL",
                "150": "CL",
                "160": "CLX",
                "170": "CLXX",
                "180": "CLXXX",
                "190": "CXC",
                "200": "CC",
                "300": "CCC",
                "400": "CD",
                "500": "D",
                "600": "DC",
                "700": "DCC",
                "800": "DCCC",
                "900": "CM"
            },
            thousand: {
                "000": "",
                "1000": "M",
                "2000": "MM",
                "3000": "MMM",
                "4000": "MMMM",
                "5000": "MMMMM",
                "6000": "MMMMMM",
                "7000": "MMMMMMM",
                "8000": "MMMMMMMM",
                "9000": "MMMMMMMMM",
            },
            tensOfThousand: {                
                "10000": "MMMMMMMMM",
                "20000": "MMMMMMMMMM",
                "30000": "MMMMMMMMMMM",
                "40000": "MMMMMMMMMMMM",
                "50000": "MMMMMMMMMMMMM",
                "60000": "MMMMMMMMMMMMMM",
                "70000": "MMMMMMMMMMMMMMM",
                "80000": "MMMMMMMMMMMMMMMM",
                "90000": "MMMMMMMMMMMMMMMMM"
            },
            hundredsOfThousand: {                                
                "100000": "MMMMMMMMMMMMMMMMM",
                "200000": "MMMMMMMMMMMMMMMMMM",
                "300000": "MMMMMMMMMMMMMMMMMMM",
                "400000": "MMMMMMMMMMMMMMMMMMMM",
                "500000": "MMMMMMMMMMMMMMMMMMMMM",
                "600000": "MMMMMMMMMMMMMMMMMMMMMM",
                "700000": "MMMMMMMMMMMMMMMMMMMMMMM",
                "800000": "MMMMMMMMMMMMMMMMMMMMMMMM",
                "900000": "MMMMMMMMMMMMMMMMMMMMMMMMM"
            },
            million: {
                "1000000": "MMMMMMMMMMMMMMMMMMMMMMMMMM"
            }
        }

        //Will help us know if the input is in
        //Units or Tens or Hundreds or Thousands
        var length = romanOrArab.length;

        switch (length) {
            //If the Number is in Units
            case 1:
                //Store the equivalent of the Arabic Number
                //in the arabToRoman variable
                arabToRoman = decimalPlaces.units[romanOrArab];
                //Then join the elements in the arabToRoman array
                //into a string and put the result
                //in the answer field for User to see 
                answerField.value = arabToRoman;
                break;
            //If the Number is in Tens,
            case 2:
                //and the last letter of the input is a zero,
                //then use the equivalents in the 'tens' object 
                //inside the decimalPlaces object above
                if (romanOrArab[romanOrArab.length-1] == "0") {
                    //Follow the processes as above for 
                    //subsequent codes in this block
                    arabToRoman = decimalPlaces.tens[romanOrArab];
                    answerField.value = arabToRoman;
                //But if the last letter isn't a zero,
                } else {
                    //we will get the correct equivalent through these steps:
                    //1. Get the equivalent of the first letter, then that of the last letter.
                    //Note: we use index[0] to get the first item in a string,
                    //and index[1] to get the second one.
                    arabToRoman = decimalPlaces.tens[romanOrArab[0] + "0"] + decimalPlaces.units[romanOrArab[1]];
                    answerField.value = arabToRoman;
                }
                
                break;

            //If the Number is in Hundreds, perform these actions
            case 3:
                //Follow the process as above
                arabToRoman = decimalPlaces.hundreds[romanOrArab[0] + "00"] + decimalPlaces.tens[romanOrArab[1] + "0"] + decimalPlaces.units[romanOrArab[2]];
                answerField.value = arabToRoman;                
                
                break;

            //If the Number is in Thousand, perform these actions
            case 4:
                //Follow the process as above
                arabToRoman = decimalPlaces.thousand[romanOrArab[0] + "000"] + decimalPlaces.hundreds[romanOrArab[1] + "00"] + decimalPlaces.tens[romanOrArab[2] + "0"] + decimalPlaces.units[romanOrArab[3]];
                answerField.value = arabToRoman;                
                
                break;

            //If the Number is in Tens of Thousand, perform these actions
            case 5:
                //Follow the process as above
                arabToRoman = decimalPlaces.tensOfThousand[romanOrArab[0] + "0000"] + decimalPlaces.thousand[romanOrArab[1] + "000"] + decimalPlaces.hundreds[romanOrArab[2] + "00"] + decimalPlaces.tens[romanOrArab[3] + "0"] + decimalPlaces.units[romanOrArab[4]];
                answerField.value = arabToRoman;                
                
                break;

            //If the Number is in Hundreds of Thousand, perform these actions
            case 6:
                //Follow the process as above
                arabToRoman = decimalPlaces.hundredsOfThousand[romanOrArab[0] + "00000"] + decimalPlaces.tensOfThousand[romanOrArab[1] + "0000"] + decimalPlaces.thousand[romanOrArab[2] + "000"] + decimalPlaces.hundreds[romanOrArab[3] + "00"] + decimalPlaces.tens[romanOrArab[4] + "0"] + decimalPlaces.units[romanOrArab[5]];
                answerField.value = arabToRoman;                
                
                break;

            //If the Number is in Million, perform these actions
            case 7:
                //Follow the process as above
                arabToRoman = decimalPlaces.million[romanOrArab[0] + "000000"] + decimalPlaces.hundredsOfThousand[romanOrArab[1] + "00000"] + decimalPlaces.tensOfThousand[romanOrArab[2] + "0000"] + decimalPlaces.thousand[romanOrArab[3] + "000"] + decimalPlaces.hundreds[romanOrArab[4] + "00"] + decimalPlaces.tens[romanOrArab[5] + "0"] + decimalPlaces.units[romanOrArab[6]];
                answerField.value = arabToRoman;                
                
                break;
            
        }
    }
    
}

//When the Clear Button is pressed,
//perform these actions
clearBtn.onclick = ()=> {
    //Clear any string in the User input field
    inputField.value = "";
    //and that of the Answer field.
    answerField.value = "";

    //Remove the "error" class on the Answer field
    //if there is any,
    answerField.classList.remove("error");
    //and then remove the error message inside.
    answerField.value = "";
}


/*
    I am so happy to have finally completed this 
    app. It was fun developing it.
    
    Developer: Mark Friday Chimaobi
    Contact: +234 807 2157 818
    
    Started: Thurs. 10th March 2022
    Completed: Tues. 15th March, 2022
*/



