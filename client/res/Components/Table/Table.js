import React from 'react';
import Cell from '../Cell/Cell';
import './Table.css';

const Table = ({table, colors}) => {
    let rows = Object.keys(table.nodes).map((v) => {
        return <Cell key={v} color={colors[table.nodes[v].color]} size={table.size} />
    });

    return (
        <div className="table">
            {rows}
        </div>
    );
}

export default Table;