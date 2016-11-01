import React, { Components } from 'react';
import Table from './Components/Table/Table';
import { DashTable } from './DashTable';

const SIZE = 12;
const COLORS = ['blue','red','green','yellow','orange'];

var App = React.createClass({
		getInitialState() {
				return {size: SIZE, dashTable: new DashTable(), colors: COLORS};
		},
		
		render() {
				return React.createElement('div',null,'Table ${this.state.table, this.state.colors, this.state.size}');
						/*
						<div classname="content">
								<Table table={this.state.table} colors={this.state.colors} size={this.state.size}/>
						</div>
						*/
		}
});

/*
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size = SIZE,
            dashTable: new DashTable(),
            colors: COLORS,
				}
		}
		
    render() {
        return (
				    <div classname="content">
                <Table table= {this.state.table} colors={this.state.colors} size={this.state.size}/>
            </div>
				)
    }
}

export default App;
*/