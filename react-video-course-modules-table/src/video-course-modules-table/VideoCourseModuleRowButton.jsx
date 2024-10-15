import { WatchButton } from './WatchButton.jsx';
import { LockedButton } from './LockedButton.jsx';
import { BuyButton } from './BuyButton.jsx';

export function VideoCourseModuleRowButton ({
  videoModule,
  isModulePurchased,
  isModuleUnlocked,
  prerequisiteLevels,
}) {
  if (isModulePurchased) {
    return <WatchButton />;
  }
  else if (!isModulePurchased && !isModuleUnlocked) {
    return <LockedButton prerequisiteLevels={ prerequisiteLevels } />;
  }
  else if (!isModulePurchased && isModuleUnlocked) {
    return <BuyButton videoModule={ videoModule } />;
  }
  else {
    return null;
  }
}
