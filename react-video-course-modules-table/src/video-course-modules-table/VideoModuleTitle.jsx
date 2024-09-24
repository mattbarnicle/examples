import { useRef, useState } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import { useHover } from '../hooks/useHover.js';

export function VideoModuleTitle ({ videoModule }) {
  const [ isTitleHovered, setIsTitleHovered ] = useState(false);
  const hoverRef = useHover(setIsTitleHovered, true, false);
  const tooltipRef = useRef(null);

  return (
    <>
      <div ref={ tooltipRef } className="video-module-title">
        <span ref={ hoverRef }>
          <strong>{ videoModule.title }</strong>
        </span>
      </div>
      <Overlay
        target={ tooltipRef.current }
        show={ isTitleHovered }
        placement="bottom"
      >
        {(props) => (
          <Tooltip
            id={ `module-${videoModule._id}-description-tooltip` }
            { ...props }
          >
            { videoModule.description }
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}
