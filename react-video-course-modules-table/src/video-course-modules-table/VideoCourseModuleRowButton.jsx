import { WatchButton } from './WatchButton.jsx';
import { LockedButton } from './LockedButton.jsx';
import { BuyButton } from './BuyButton.jsx';

export function VideoCourseModuleRowButton ({
  videoModule,
  isModulePurchased,
  isModuleAvailable,
  prerequisiteLevels,
}) {
  if (isModulePurchased) {
    return <WatchButton />;
  }
  else if (!isModulePurchased && !isModuleAvailable) {
    return <LockedButton prerequisiteLevels={ prerequisiteLevels } />;
  }
  else if (!isModulePurchased && isModuleAvailable) {
    return <BuyButton videoModule={ videoModule } />;
  }
  else {
    return null;
  }
}
