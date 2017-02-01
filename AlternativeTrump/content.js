/*

http://stackoverflow.com/questions/5797661/replace-text-in-website-with-chrome-content-script-extension

Earlier version contained no logic and was a simple 'brute force' which would break links and images that contained the targeted strings.

Current version serches for (all case insensitive):
	fox news, foxnews -> Der Stürmer
	donald, donald trump, donald j trump, donald j.trump -> Adolf, Adolf Hitler
	melania, melania trump -> Eva, Eva Braun
	trump - Hitler
	republican, conservative -> Nazi

Need to add:
	Link handling - just changing the visible text
		This is a pretty big one since many things online are links

Like to do:
	Clean up logic if possible, which it probably is, by concatenating if statements where possible

*/

var replaceTextInNode = function(parentNode) {
	for (var i = parentNode.childNodes.length-1; i >= 0; i--) {
		var node = parentNode.childNodes[i];
		
		if (node.nodeType == Element.TEXT_NODE) {

			/* Fox News */
			if (node.textContent.toLowerCase().match(/fox.{0,1}news/gi)) {
				node.textContent = node.textContent.replace(new RegExp("fox.{0,1}news", "gi"), "Der Stürmer");
			}
			
			/* Donald Trump */
			if (node.textContent.toLowerCase().match(/donald/gi)) {
				if (node.textContent.toLowerCase().match(/donald.{0,3}trump/gi)) {
					node.textContent = node.textContent.replace(new RegExp("donald.{0,3}trump", "gi"), "Adolf Hitler");
				} else {
					node.textContent = node.textContent.replace(new RegExp("donald", "gi"), "Adolf");
				}
			}
			
			/* Melania Trump */
			if (node.textContent.toLowerCase().match(/melania/gi)) {
				if (node.textContent.toLowerCase().match(/melania.{0,3}trump/gi)) {
					node.textContent = node.textContent.replace(new RegExp("melania.{0,3}trump", "gi"), "Eva Braun");
				} else {
					node.textContent = node.textContent.replace(new RegExp("melania", "gi"), "Eva");
				}
			}
			
			/* Trump */
			if (node.textContent.toLowerCase().match(/trump/gi)) {
				node.textContent = node.textContent.replace(new RegExp("trump", "gi"), "Hitler");
			}
			
			/* Republican / Conservative */
			if (node.textContent.toLowerCase().match(/republican/gi) || node.textContent.toLowerCase().match(/conservative/gi)) {
				if (node.textContent.toLowerCase().match(/republican/gi)) {
					node.textContent = node.textContent.replace(new RegExp("republican", "gi"), "Nazi");
				} else {
					node.textContent = node.textContent.replace(new RegExp("conservative", "gi"), "Nazi");
				}
			}

		} else if (node.nodeType == Element.ELEMENT_NODE) {
			replaceTextInNode(node);
		}
	}
};

replaceTextInNode(document.body);
