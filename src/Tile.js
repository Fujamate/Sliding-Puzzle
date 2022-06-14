import React from "react";
import {
  getFakePosition,
  getVisualPosition,
  TILE_COUNT,
  GRID_SIZE,
  BOARD_SIZE,
} from "./helpers";

function Tile(props) {
  const { tile, index, width, height, handleTileClick, imgUrl } = props;
  const { row, col } = getFakePosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_SIZE * 1.25}px`,
    backgroundPosition: `${(100 / GRID_SIZE) * (tile % GRID_SIZE)}% ${
      (100 / GRID_SIZE) * Math.floor(tile / GRID_SIZE)
    }%`,
  };

  return (
    <li
      style={{
        ...tileStyle,
        transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
        // Check for last tile
        opacity: tile === TILE_COUNT - 1 ? 0 : 1,
      }}
      className="tile"
      onClick={() => handleTileClick(index)}
    >
      {!imgUrl && `${tile + 1}`}
    </li>
  );
}

export default Tile;
