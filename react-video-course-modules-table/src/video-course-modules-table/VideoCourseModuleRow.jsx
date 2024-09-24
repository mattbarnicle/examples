import { useContext, useRef, useMemo, useCallback } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Fade from 'react-bootstrap/Fade';

import { UserContext } from '../providers/UserContext.js';
import {
  VideoCourseModulesTableContext
} from '../providers/VideoCourseModulesTableContext.js';
import { VideoModuleTitle } from './VideoModuleTitle.jsx';
import { VideoCourseModuleRowButton } from './VideoCourseModuleRowButton.jsx';

const TOOLTIP_CONFIG_FOR_ALL_OF = {
  title: 'Required training',
  backgroundColorCode: 0,
};

export function VideoCourseModuleRow ({ videoCourseModule }) {
  const { user } = useContext(UserContext);
  const {
    getLevelForVideoModule, prereqLevels
  } = useContext(VideoCourseModulesTableContext);
  const tooltipRef = useRef(null);
  const {
    videoModule, prerequisiteLevels, level: moduleLevel
  } = videoCourseModule;

  const isModulePurchased = useMemo(() => {
    return Boolean(user.products.find(up =>
      (
        up.type === 'video module'
        && up.videoModule._id === videoModule._id
      )
      || (
        up.type === 'video course'
        && up.videoCourse.groups.find(g => g.videoModule._id === videoModule._id)
      )
    ));
  }, [ user, videoModule ]);

  const isLevelPurchased = useCallback((level) => {
    return Boolean(user.products.find(up => (
      up.type === 'video module'
      && getLevelForVideoModule(up.videoModule) === level
    )));
  }, [ user, getLevelForVideoModule ]);

  const isModuleAvailable = useMemo(() => {
    return (
      prerequisiteLevels.allOf.every(level => isLevelPurchased(level))
      &&
      prerequisiteLevels.oneOfEach.every(
        levels => Boolean(levels.find(level => isLevelPurchased(level)))
      )
    );
  }, [ prerequisiteLevels, isLevelPurchased ]);

  const hoverCondition = useMemo(() => {
    return (
      prereqLevels !== null
      && !isModulePurchased
      && (
        Boolean(prereqLevels.allOf.find(level => level === moduleLevel))
        ||
        Boolean(prereqLevels.oneOfEach.find(
          levels => levels.find(level => level === moduleLevel)
        ))
      )
    );
  }, [ prereqLevels, isModulePurchased, moduleLevel ]);

  const getTooltipConfigForOneOfEach = useCallback(() => {
    const levels = prereqLevels.oneOfEach.find(
      levels => Boolean(levels.find(level => level === moduleLevel))
    );

    const numLevelsNotPurchased = (
      levels
        ? levels.reduce(
            (sum, level) => sum - (isLevelPurchased(level) ? 1 : 0),
            levels.length
          )
        : 0
    );

    return (
      numLevelsNotPurchased > 1
        ? {
          title: 'One of these is required',
          backgroundColorCode: (
            prereqLevels.oneOfEach.findIndex(
              levels => Boolean(levels.find(level => level === moduleLevel))
            )
          ) + 1
        }
        : TOOLTIP_CONFIG_FOR_ALL_OF
    );
  }, [ prereqLevels, moduleLevel, isLevelPurchased ]);

  const getTooltipConfig = useCallback(() => {
    return (
      prereqLevels.allOf.find(level => level === moduleLevel)
        ? TOOLTIP_CONFIG_FOR_ALL_OF
        : getTooltipConfigForOneOfEach()
    );
  }, [ prereqLevels, moduleLevel, getTooltipConfigForOneOfEach ]);

  const { title, backgroundColorCode } = getTooltipConfig();

  const tooltipClasses = useMemo(() => {
    return `module-block-buy-tooltip tooltip-bg-${backgroundColorCode}`;
  }, [ backgroundColorCode ]);

  return (
    <div className="row">
      <div className="mod-col col col-1">{ moduleLevel }</div>
      <div className="mod-col col col-7">
        <VideoModuleTitle videoModule={ videoModule } />
      </div>
      <div className="mod-col col col-4" ref={ tooltipRef }>
        <VideoCourseModuleRowButton
          videoModule={ videoModule }
          isModulePurchased={ isModulePurchased }
          isModuleAvailable={ isModuleAvailable }
          prerequisiteLevels={ prerequisiteLevels }
        />
      </div>
      <Overlay
        target={ tooltipRef.current }
        show={ hoverCondition }
        placement="left"
        transition={
          (props) => (
            <Fade in={ hoverCondition } timeout={ 0 }>
              { props.children }
            </Fade>
          )
        }
      >
        {(props) => (
          <Tooltip
            id={ `module-${videoModule._id}-button-tooltip` }
            className={ tooltipClasses }
            { ...props }
          >
            { title }
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}
