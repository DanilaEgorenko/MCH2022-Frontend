import React, {FC} from 'react';

import './tooltip.scss';


interface TooltipProps {
  text: string,
  children: React.ReactNode,
}

// TODO: переделать как обертку на материалайз
const TooltipComponent: FC<TooltipProps> = ({text, children}) => {
  return (
    <div className='tooltip'>
      <div className='tooltip__button'>
        {children}
      </div>
      <div className='tooltip__sign'>
        {text}
      </div>
    </div>
  );
};

export default TooltipComponent;
