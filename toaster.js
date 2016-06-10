// Toaster
// By Seth Henderson

// You have a loaf of bread
const reader = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

let loaf = []
let toasts = []
let userQuit = false

const SIZE = 24, SPEED = 10
const BREAD = "bread", TOAST = "toast",
			BROWN = "brown", WHITE = "white", BLACK = "black",
			LIGHT = "light", DARK = "dark"
/*
 * Example of bread slice object
 * {
 * 	state: "bread",
 * 	darkness: "brown"
 * 	degree: dark
 * }
 */

for(let i = 0; i < SIZE; i++)
{
	loaf.push({
		state: BREAD,
		color: WHITE,
		degree: LIGHT
	});
}



function toaster(bread1, bread2, setting)
{
	let slices = 0;
	if(bread1 && bread2)
		slices = 2
	else if(bread1)
		slices = 1
	else if(bread2)
		slices = 1
	bread1 = !bread1 ? {} : bread1
	bread2 = !bread2 ? {} : bread2

	return new Promise((resolve) => {
		setTimeout(() => {
			setting = setting < 0 ? 0 - setting : setting
			setting = setting > 10 ? 10 : setting
			let myNum = randomInt(0, setting)
			switch (Math.floor(myNum / 3))
			{
				case 0:
						bread1.color = WHITE
						bread2.color = WHITE
						console.log("just normal bread, putting it back in the loaf")
					break;
				case 1:
						bread1.color = BROWN
						bread2.color = BROWN
						bread1.state = TOAST
						bread2.state = TOAST
					break;
				case 2:
						bread1.color = BLACK
						bread2.color = BLACK
						bread1.state = TOAST
						bread2.state = TOAST
					break;
			}
			if(Math.floor(myNum % 2) == 0)
			{
				bread1.degree = DARK
				bread2.degree = DARK
			}
			else
			{
				bread1.degree = LIGHT
				bread2.degree = LIGHT
			}
			console.log("\nding!")
			breadAndToast()
			resolve(bread1, bread2)
		}, SPEED * 60)
	})
}

function randomInt(low, high)
{
	return Math.floor(Math.random() * (high - low) + low)
}

function breadAndToast()
{
	console.log("You have " + loaf.length + " slices of bread left")
	console.log("You have " + toasts.length + " pieces of toast")
}

// ---- user interface code ----
reader.setPrompt("How much toast do you want to make? [0, 1, 2, exit]")
reader.prompt()
reader.on('line', (x) => {
	breadAndToast()
	let num = parseInt(x)
	if(x !== "exit")
	{
		let toast;
		if(num == 2)
			toast = toaster(loaf.shift(), loaf.shift(), 2)
		else if(num == 1)
			toast = toaster(loaf.shift(), null, 4)
			
		if(num != 0)
		{
			toast.then((slice1, slice2) => {
				if(slice1.state == TOAST)
					toasts.push(slice1)
				if(y == 2)
				{
					if(slice2.state == TOAST)
						toasts.push(slice2)
				}
				console.log("toaster done")
			})
		}
		else
			console.log("no toast")
		reader.prompt();
	}
	else
	{
		console.log("bye bye");
		reader.close();
	}
}).on('close', () => {process.close(0)})
