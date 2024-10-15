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
  const { user: { products: userProducts } } = useContext(UserContext);
  const {
    getLevelForVideoModule, prereqLevels
  } = useContext(VideoCourseModulesTableContext);
  const tooltipRef = useRef(null);
  const {
    videoModule, prerequisiteLevels, level: moduleLevel
  } = videoCourseModule;

  const isLevelPurchased = useCallback((level) => {
    return Boolean(userProducts.find(up => (
      up.type === 'video module'
      && getLevelForVideoModule(up.videoModule) === level
    )));
  }, [ userProducts, getLevelForVideoModule ]);

  const isModulePurchased = useMemo(() => {
    return Boolean(userProducts.find(up =>
      (
        up.type === 'video module'
        && up.videoModule._id === videoModule._id
      )
      || (
        up.type === 'video course'
        && up.videoCourse.groups.find(g => g.videoModule._id === videoModule._id)
      )
    ));
  }, [ userProducts, videoModule ]);

  const isModuleUnlocked = useMemo(() => {
    return (
      prerequisiteLevels.allOf.every(level => isLevelPurchased(level))
      &&
      prerequisiteLevels.oneOfEach.every(
        levels => Boolean(levels.find(level => isLevelPurchased(level)))
      )
    );
  }, [ prerequisiteLevels, isLevelPurchased ]);

  const shouldShowTooltip = useMemo(() => {
    const oneOfEachLevels = prereqLevels.oneOfEach.find(
      levels => Boolean(levels.find(level => level === moduleLevel))
    ) || [];

    const numOneOfEachLevelsPurchased = oneOfEachLevels.reduce(
      (sum, level) => sum + (isLevelPurchased(level) ? 1 : 0),
      0
    );

    return (
      !isModulePurchased
      && (
        Boolean(prereqLevels.allOf.find(level => level === moduleLevel))
        ||
        (oneOfEachLevels.length > 0 && numOneOfEachLevelsPurchased === 0)
      )
    );
  }, [ prereqLevels, moduleLevel, isModulePurchased, isLevelPurchased ]);

  const getTooltipConfigForOneOfEach = useCallback(() => {
    return {
      title: 'One of these is required',
      backgroundColorCode: (
        prereqLevels.oneOfEach.findIndex(
          levels => Boolean(levels.find(level => level === moduleLevel))
        )
      ) + 1
    };
  }, [ prereqLevels, moduleLevel ]);

  const getTooltipConfig = useCallback(() => {
    return (
      prereqLevels.allOf.find(level => level === moduleLevel)
        ? TOOLTIP_CONFIG_FOR_ALL_OF
        : getTooltipConfigForOneOfEach()
    );
  }, [ prereqLevels, moduleLevel, getTooltipConfigForOneOfEach ]);

  const { title, backgroundColorCode } = (
    shouldShowTooltip ? getTooltipConfig() : {}
  );

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
          isModuleUnlocked={ isModuleUnlocked }
          prerequisiteLevels={ prerequisiteLevels }
        />
      </div>
      <Overlay
        target={ tooltipRef.current }
        show={ shouldShowTooltip }
        placement="left"
        transition={
          (props) => (
            <Fade in={ shouldShowTooltip } timeout={ 0 }>
              { props.children }
            </Fade>
          )
        }
      >
        {(props) => (
          <Tooltip
            id={ `module-${videoModule._id}-button-tooltip` }
            className={
              `module-block-buy-tooltip tooltip-bg-${backgroundColorCode || 0}`
            }
            { ...props }
          >
            { title }
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}
