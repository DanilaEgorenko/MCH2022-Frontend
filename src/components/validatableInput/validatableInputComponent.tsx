import React, {
  FC,
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  InputHTMLAttributes,
  useState,
  useRef,
} from 'react';

import './validatableInput.scss';

type ConditionMessageT = {
  msgOnTrue: string,
  condition: (value: string) => boolean,
}

interface ValidatableInputPropsT extends InputHTMLAttributes<HTMLInputElement> {
  conditions: ConditionMessageT[],
  trimmed?: boolean,
  labelSign?: string,
  tooltipWidth?: string,
  tooltipErrorMessage?: string,
}

/**
 * Компонент input с условиями валидации. Внизу полоска с числом пройденных проверок
 * При хотя бы одной ошибке текст становится красным, а при наведении справа выпадает
 * тултип со списком ошибок
 * @param {ConditionMessageT[]} conditions, - массив условий, которые считаются ошибками,
 * и сообщений, которые им соответсвуют
 * @param {string} id, - если указан labelSign, то требуется указать и id
 * @param {string} labelSign, - подпись для label
 * @param {boolean} trimmed [= true] - если true, то текст, передаваемый на проверку триммируются,
 * @param {string} tooltipWidth [= '100px'], - ширина тултипа с подсказками
 * @param {string} tooltipErrorMessage [= 'Убедитесь, что выполнено:'], - заголовок перед списком ошибок на тултипе
 * @param {InputHTMLAttributes<HTMLInputElement>} ...rest, остальные атрбуты тега input
 * @return {JSX}
 */
const ValidatableInputComponent: FC<ValidatableInputPropsT> = ({
  conditions,
  id,
  labelSign,
  trimmed = true,
  tooltipWidth = '100px',
  tooltipErrorMessage = 'Убедитесь, что выполнено:',
  ...rest
}) => {
  if (labelSign && !id) {
    console.warn('ValidatableInputComponent: using labels requires setting an id');
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const [isOnceBlured, setIsOnceBlured] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [falseCondMsgs, setFalseCondMsgs] = useState([] as string[]);

  // в React onChange и onInput - одно и то же
  // onInput тупо не отслеживаем
  // https://stackoverflow.com/questions/38256332/in-react-whats-the-difference-between-onchange-and-oninput

  const handleChange: ChangeEventHandler<HTMLInputElement> =
  (e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    const value = trimmed ? e.currentTarget.value.trim() : e.currentTarget.value;
    let isValid = true;
    const falseCondMsgsLocal: string[] = [];

    conditions.forEach(({condition, msgOnTrue}) => {
      if (condition(value)) {
        falseCondMsgsLocal.push(msgOnTrue);
      }
    });

    if (value !== '' && falseCondMsgsLocal.length > 0) {
      isValid = false;
    }
    setIsValid(isValid);
    setFalseCondMsgs(falseCondMsgsLocal);

    // вызов функции пользователя
    if (rest.onChange) {
      rest.onChange(e as ChangeEvent<HTMLInputElement>);
    }
  };

  // const handleInput = (e: FormEvent<HTMLInputElement>) => {
  //   console.log('input:', e.currentTarget.value)
  //   // originalOnInput(e);
  // }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e: FocusEvent<HTMLInputElement>) => {
    setIsOnceBlured(true);
    // вызов функции пользователя
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };
  return (
    <div
      className={'input-field validatable-input ' +
      (isOnceBlured && !isValid && inputRef.current?.value ? 'invalid ' : '') +
      rest.className}
    >
      <input
        // https://stackoverflow.com/questions/31163693/how-do-i-conditionally-add-attributes-to-react-components
        id={id}  // если undefined, то это ок
        type="text"
        ref={inputRef}
        {...rest}
        onChange={handleChange}
        // onInput={handleInput}
        onBlur={handleBlur}
        className=''  // важно, чтобы был пустой класс
      >
      </input>
      <div className={'validatable-input__error-msg'} style={{width: tooltipWidth, right: '-' + tooltipWidth}}>
        <p>{tooltipErrorMessage}</p>
        {!(inputRef.current?.value) ? '' : falseCondMsgs.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <div className={'validatable-input__underline'}
        style={
          {
            '--validatable-input-error-percentage':
            Math.floor(falseCondMsgs.length * 100 / conditions.length) + '%',
            '--validatable-input-lines-offset': `${!falseCondMsgs.length ? 0 : 5}px`,
          } as React.CSSProperties
        }
      />
      {labelSign ? <label htmlFor={id}>{labelSign}</label> : ''}
      {/* debug */}
      {/* {!isOnceBlured ? <p>hidden</p> : (
        <>
          {
            !inputRef.current?.value ?
              <p>пусто</p> :
              <p>{Math.floor(falseCondMsgs.length * 100 / conditions.length)}% -&gt; {`${isValid}`}</p>
          }
          {!(inputRef.current?.value) ? '' : falseCondMsgs.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </>
      )} */}
    </div>
  );
};

export default ValidatableInputComponent;
