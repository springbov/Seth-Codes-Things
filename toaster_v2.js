// Toaster v2, the better way
// By Seth Henderson

const reader = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

const SIZE = 24, SPEED = 10
const BREAD = "bread", TOAST = "toast",
			BROWN = "brown", WHITE = "white", BLACK = "black",
			LIGHT = "light", DARK = "dark"
/*
 * Example of bread slice object
 * {
 * 	state: "bread",
 * 	color: "brown"
 * 	degree: dark
 * }
 */

function toaster(breadSlices, setting)
{
	if(typeof(setting) !== 'undefined')
	{
		console.log("toaster doesn't care what you think")
	}
	return new Promise( (resolve) => {
		setTimeout(() => {
			let color = randomInt(1, 3)
			let degree = randomInt(1, 2)
			breadSlices
				.forEach((slice) => {
					switch(color)
					{
						case 1:
							slice.color = WHITE
							break;
						case 2:
							slice.color = BROWN
							break;
						case 3:
							slice.color = BLACK
							break;
					}
					switch(degree)
					{
						case 1:
							slice.degree = LIGHT
							break;
						case 2:
							slice.degree = DARK
							break;
					}
					if(slice.color !== WHITE)
					{
						slice.state = TOAST
					}
					else
					{
						slice.degree = LIGHT
					}
				})
			console.log("ding\n")
			resolve(breadSlices)
		}, 60 * 10)
	} )
}

function randomInt(low, high)
{
	return Math.floor(Math.random() * (high + 1 - low) + low )
}

// ----------------------

let loaf = []
let toasts = []

function breadAndToast()
{
	console.log("You have " + loaf.length + " slices of bread left")
	console.log("You have " + toasts.length + " pieces of toast")
}

for(let i = 0; i < SIZE; i++)
{
	loaf.push({
		state: BREAD,
		color: WHITE,
		degree: LIGHT
	});
}

breadAndToast()
reader.setPrompt("How many slices of bread do you want to put in the toaster? and at what setting?\n" + 
	"(example: '2 10', or '1 brown', or to exit 'exit'): \n")
reader.prompt()

reader.on("line", (line) => {
	let words = line.split(" ")
	if(line.toLowerCase() === "exit")
	{
		// do exiting code
	}
	else if(line === "")
	{
		reader.prompt()
	}
	else
	{
		let slices = []
		let num = parseInt(words[0])
		for(let i = 0; i < num; i++)
		{
			if(loaf.length > 0)
			{
				slices.push(loaf.shift())
			}
			else
				break;
		}
		if(slices.length != 0)
		{
			toaster(slices, words[1])
				.then((pieces) => {
					let feedback = "you got " + pieces.length + " slices of "
					if(pieces.length > 0)
					{
						feedback += pieces[0].degree + " " + pieces[0].color + " " + pieces[0].state
					}
					else
					{
						feedback += "anything"
					}
					feedback += "\n"
					console.log(feedback)
					pieces.forEach(toast => {
						if(toast.state === TOAST)
							toasts.push(toast)
						else
							loaf.push(toast)
					})
				reader.prompt()
				breadAndToast()
			})
		}
	}
})

