import React from "react";

//interface - used to make a type of props, it makes easier to make the props pattern
interface IInputLoginProps {
    label: string;
    value: string;
    type?: string;

    //? make the prop optional
    onchange?: (newValue: string) => void;
    onPressEnter?: () => void;
}

//forwardRef - gives the power to create a internal ref to a custom component
export const InputLogin = React.forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {

    return (
        <label>
            <span>{props.label}: </span>
            <input ref={ref}
                value={props.value}
                onChange={e => props.onchange && props.onchange(e.target.value)}
                onKeyDown={e => e.key === 'Enter'
                    ? props.onPressEnter && props.onPressEnter()
                    : undefined}
                type={props.type} />
        </label>
    );
});