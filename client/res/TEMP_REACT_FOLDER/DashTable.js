const COLORS = ['blue','red','green','yellow','orange'];

class Node {
		constructor(id, color) {
				this.id = id;
				this.color = color;
		}
}

class DashTable {
    constructor(size=3) {
        this.size = size;
				this.nodes = {};
				for (let i=0; i<size*size;i++) {
				    this.nodes[i] = new Node(i,COLORS[Math.floor(Math.random()*4)]);
				}
    }
		
		updateColor(id, color) {
				this.nodes[id].color = color;
		}
}

export { DashTable };