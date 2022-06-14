//Locate Files
let content = [
    "images/tux.png",
    "audio/music.wav",
    "font/puzzler.otf"
];

//Initialize Hexi and load files
let g = hexi(512, 512, setup, content);
g.fps = 60;
g.scaleToWindow("Red");
g.start();

//Declare variables
let tux, message;

function setup() {
	console.log("setup");

	//Create a Tux function
	pengs = g.group();
	let makeTux = (x, y) => {
		let tux = g.sprite("images/tux.png")
		tux.setPosition(x, y);
		g.breathe(tux, 2, 2, 20);
		g.pulse(tux, 10, 0.5);

		//Set the cat's velocity to a random number between -10 and 10
		tux.vx = g.randomInt(-10, 10);
		tux.vy = g.randomInt(-10, 10);

		pengs.addChild(tux);
	};

	//Text
	message = g.text("Tap for Tuxes!", "38px puzzler", "red");
	g.stage.putCenter(message);
	//Center Pivot Point
	message.pivotX = 0.5;
	message.pivotY = 0.5;

	//Pointer Function
	g.pointer.tap = () => {
		//Use pointer x and y
		makeTux(g.pointer.x, g.pointer.y);
		//Update Text
		message.content = `${pengs.children.length}`;
	};

	let music = g.sound("audio/music.wav")
	music.loop = true;
	music.play();

	g.state = play;
}

function play() {
	console.log("play");

	message.rotation += 0.1;

	pengs.children.forEach(tux => {
		let collision = g.contain(tux, g.stage, true);
		g.move(tux)
	});

}
