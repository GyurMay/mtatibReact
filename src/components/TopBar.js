import {back} from "../Options";

function showMenu(){
	let menu = document.querySelector("#menu");
    let hidden = (menu.style.display == 'none') ? true : false;
    let svg = document.querySelectorAll('svg')[0].children;
	menu.style.display = hidden ? 'inline-block' : 'none';
}
const TopBar = props => {
	return (
		<div id="topBar" style={{width:'100%'}}>
		<svg aria-hidden='true' className='icon icon-arrow-left' height='170' id='back' onClick={() => back()} style={{margin:'3px', display:'none'}} viewBox='0 0 32 32' width='170'>
			<path d='M26.025 14.496l-14.286-.001 6.366-6.366L15.979 6 5.975 16.003 15.971 26l2.129-2.129-6.367-6.366h14.29z'></path>
		</svg>
		{/* <div  ><img height='1em' src='https://commons.wikimedia.org/wiki/File:DharmaWheelGIF.gif' width='1em'/></div> */}
		
		<svg id='load_icon' style={{display: 'none'}} width="600" height="600" className="circle_load">
			<circle id="diagram" r="150" cx="300" cy="300" className="svgCircle"></circle>
		</svg>
		
		<span id="langSelection" style={{display:'flex',
										 margin:'0.1em 0 0.5em 0.2em',
										 width: '80%',
										 float:'left' }}>
		བོད་ཡིག
		<button id="langToggle" style={{height: '8em',
									 	width: '20%',
									 	border: '1px gray solid',
									 	display: 'block',
									 	background: '#bcd7bb',
									 	borderRadius: '10em'}} >
		<img id="toggleIcon" alt="dot" src="https://www.pngkey.com/png/full/194-1942123_png-small-red-circle.png" style={{
			height: '6em', marginLeft: '-50%', transition: 'all 0.1s linear'}}></img>
		</button>
		  eng
		</span>
		<button id="menuButton" onClick={() => showMenu()} style={{
					margin:'0',
					float:'right',
					fontSize:'60%',
					padding:'0.1em 0.3em 0 0',
					background:'none',
					width:'15%'}}>
		<svg height="40" viewBox="0 0 100 80" width="40">
		<rect height="20" width="100"></rect>
		<rect height="20" width="100" y="30"></rect>
		<rect height="20" width="100" y="60"></rect>
		</svg>
		</button>
		<div id="menu" style={{display: 'none'}}>
			<ul id="menuUl">
				<li id="setHome"><button /*onClick={setHome()}*/>Set Home</button></li>
				<li>
					<button onClick={() => {document.location = document.location.origin +"?selectLines=t"}}>
						{ !document.URL.includes("selectLines=t") ? 'View All Nearby Trains' : "You're viewing all nearby trains" }
					</button>
				</li>
			</ul>
		</div>

		</div>
	);
};

export default TopBar;