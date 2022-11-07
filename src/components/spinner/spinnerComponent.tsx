import React, {FC} from 'react';
import './spinner.scss';

export type SpinnerClassesT = 'offline' | 'online' | 'loading' | 'error';

interface spinnerProps {
  status: SpinnerClassesT;
}

const SpinnerComponent: FC<spinnerProps> = (props) => {
  return (
    <>
      <div className={`loader ${props.status}`}></div>
    </>
  );
};

export default SpinnerComponent;
