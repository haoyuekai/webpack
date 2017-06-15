import './css/common.css';
import Layer from './components/layer/layer.js';


const App = function(){
	var dom = document.getElementById("app");
	var layer = new Layer();
	dom.innerHTML = layer.tpl;
}

new App()
