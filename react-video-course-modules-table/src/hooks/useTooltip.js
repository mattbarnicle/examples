import { useEffect } from 'react';

export function useTooltip (tooltipRef, hoverCondition, title, classes) {
  useEffect(
    () => {
      // const tooltipNode = tooltipRef.current;
      // const jQueryTooltipNode = jQuery(tooltipNode);

      // if (tooltipNode && jQueryTooltipNode.tooltip) {
      //   if (hoverCondition) {
      //     jQueryTooltipNode.tooltip({
      //       container: 'body',
      //       delay: { show: 0, hide: 0 },
      //       animation: false,
      //       template: `
      //         <div class="tooltip ${classes}" role="tooltip">
      //           <div class="arrow"></div>
      //           <div class="tooltip-inner"></div>
      //         </div>
      //       `,
      //       ...(title ? { title } : {}),
      //     });

      //     jQueryTooltipNode.tooltip('show');
      //   }
      //   else {
      //     jQueryTooltipNode.tooltip('hide');
      //   }

      //   return () => {
      //     jQueryTooltipNode.tooltip('dispose');
      //   };
      // }
    },
    [ hoverCondition ]
  );
}
