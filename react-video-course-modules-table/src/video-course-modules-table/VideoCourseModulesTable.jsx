import { useState, useCallback } from 'react';

import {
  VideoCourseModulesTableContext
} from '../providers/VideoCourseModulesTableContext.js';
import { VideoCourseModuleRow } from './VideoCourseModuleRow.jsx';

export function VideoCourseModulesTable ({ videoCourse }) {
  const [ prereqLevels, setPrereqLevels ] = useState({ allOf: [], oneOfEach: [] });

  const getLevelForVideoModule = useCallback((videoModule) => {
    return videoCourse.modules.find(
      m => m.videoModule._id === videoModule._id
    ).level;
  }, [ videoCourse ]);

  return (
    <VideoCourseModulesTableContext.Provider value={{
      getLevelForVideoModule, prereqLevels, setPrereqLevels
    }}>
      <div className="container-fluid video-course-modules-table">
        <div className="row header">
          <div className="col col-1">#</div>
          <div className="col col-7">Module Title</div>
          <div className="col col-4">Access</div>
        </div>
        { videoCourse.modules.map(m => (
          <VideoCourseModuleRow key={ m.videoModule._id } videoCourseModule={ m } />
        ))}
      </div>
    </VideoCourseModulesTableContext.Provider>
  );
}
