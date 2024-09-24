import { useContext } from 'react';
import Button from 'react-bootstrap/Button';

import {
  VideoCourseModulesTableContext
} from '../providers/VideoCourseModulesTableContext.js';
import { useHover } from '../hooks/useHover.js';

export function LockedButton ({ prerequisiteLevels }) {
  const { setPrereqLevels } = useContext(VideoCourseModulesTableContext);
  const hoverRef = useHover(
    setPrereqLevels, prerequisiteLevels, { allOf: [], oneOfEach: [] }
  );

  return (
    <Button
      className="btn-video-module btn-not-available"
      ref={ hoverRef }
      onClick={ () => {} }
    >
      Locked
    </Button>
  );
}
