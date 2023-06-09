import { CSSProperties } from "react";
import { CellState, GridState, PlayerColor, Position } from "../../types";
import { discColorClass } from "../../func/color";
import { prevent } from "../../func/dom";

type GridProps = {
  grid: GridState;
  color?: PlayerColor;
  onDrop?: (x: number) => void;
  winningPositions: Position[];
};

export function Grid({ grid, color, onDrop, winningPositions }: GridProps) {
  const cols = grid[0].length;
  const showColumns = color && onDrop;
  const isWinning = (x: number, y: number) =>
    !!winningPositions.find((p) => p.x === x && y === p.y);
  return (
    <div
      className="grid"
      style={{ "--rows": grid.length, "--cols": cols } as CSSProperties}
    >
      {grid.map((row, y) =>
        row.map((c, x) => (
          <Cell
            active={isWinning(x, y)}
            x={x}
            y={y}
            color={c}
            key={`${x}-${y}`}
          />
        ))
      )}
      {showColumns && (
        <div className="columns">
          {new Array(cols).fill(1).map((_, k) => (
            <Column onDrop={() => onDrop(k)} color={color} key={k} />
          ))}
        </div>
      )}
    </div>
  );
}

type CellProps = {
  x: number;
  y: number;
  color: CellState;
  active: boolean;
};

function Cell({ y, color, active }: CellProps) {
  return (
    <div
      style={{ "--row": y } as CSSProperties}
      className={discColorClass(color) + (active ? " disc-active" : "")}
    />
  );
}

type ColumnProps = {
  color: PlayerColor;
  onDrop: () => void;
};

function Column({ color, onDrop }: ColumnProps) {
  return (
    <button onClick={prevent(onDrop)} className="column">
      <div className={discColorClass(color)}></div>
    </button>
  );
}
