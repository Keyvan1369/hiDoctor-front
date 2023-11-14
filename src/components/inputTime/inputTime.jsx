import React, {useEffect, useRef, useState} from 'react';
import './inputTime.scss';


const InputTime = (props) => {
    const {value, setValue,classes,disabled} = props

    const [values, setValues] = useState(["0", "0", "0", "0"])
    const input1 = useRef(null);
    const input2 = useRef(null);
    const input3 = useRef(null);
    const input4 = useRef(null);
    const inputs = [input1, input2, input3, input4];

    function setValuesMiddle(values) {
        setValues(values)
        setValue(`${values[0]}${values[1]}:${values[2]}${values[3]}`);
    }

    function focusToNext(nextIndex) {
        if (nextIndex < inputs.length) {
            inputs[nextIndex].current?.setSelectionRange(0, 1);
            inputs[nextIndex].current?.focus();
        }
    }

    function setValuesFromValue() {
        if (!value)
            return setValues(["0", "0", "0", "0"]);
        // return setValues([pace ? "0" : "", "", "", ""]);
        const [hour, minutes] = value.split(":")

        const minDahgan = (Math.floor(+minutes / 10)).toString()
        const minYekan = (+minutes % 10).toString()

        const hourDahgan = (Math.floor(+hour / 10)).toString()
        const hourYekan = (+hour % 10).toString()

        if (values[0] === hourDahgan && values[1] === hourYekan && values[2] === minDahgan && values[3] === minYekan)
            return;
        setValues([hourDahgan, hourYekan, minDahgan, minYekan])
    }

    useEffect(() => {
        if (/\d{2}:\d{2}$/.exec(value || ""))
            setValuesFromValue()
        // else setValue("08:00")
    }, [value])


    function handleChangeInput(e, index, max) {

        function focusToSelf() {
            setTimeout(() => focusToNext(index), 5)
        }

        const {value} = e.target;
        const list = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (!list.includes(value)) return focusToSelf()
        if (index === 1 && values[0] === "2" && +value > 3) return focusToSelf()
        if (value === "") {
            values[index] = value;
            setValuesMiddle([...values]);
            return;
        }
        if (value.length > 1) return focusToNext(index + 1);
        if (+value > max) return focusToSelf()
        values[index] = value;
        setValuesMiddle([...values]);
        focusToNext(index + 1)
    }

    function handleKeyDown(e, number) {
        if (e.key === "Backspace" && e.currentTarget.value === "" && number !== 0) {
            inputs[number - 1].current?.focus();
        } else if (e.key === "ArrowRight" && number < inputs.length - 1)
            inputs[number + 1].current?.focus();
        else if (e.key === "ArrowLeft" && number > 0)
            inputs[number - 1].current?.focus();
        if (e.key === e.currentTarget.value)
            focusToNext(number + 1)
    }

    function onFocus(e) {
        e.target.setSelectionRange(0, 1);
    }

    return (
        <div className="inputTime">
            <div className={`inputTime__box ${classes?.box}`}>
                <input disabled={disabled} className={classes?.number} onFocus={onFocus} type={"tel"} ref={input1} value={values[0]}
                       onKeyUp={(e) => handleKeyDown(e, 0)}
                       onChange={(e) => handleChangeInput(e, 0, 2)}/>
                <input  disabled={disabled} className={classes?.number} onFocus={onFocus} type={"tel"} onKeyUp={(e) => handleKeyDown(e, 1)} value={values[1]}
                       ref={input2}
                       onChange={(e) => handleChangeInput(e, 1, 9)}
                />
            </div>
            <span className={classes?.seperator}>:</span>
            <div className={`inputTime__box ${classes?.box}`}>
                <input  disabled={disabled} className={classes?.number} onFocus={onFocus} type={"num"} onKeyUp={(e) => handleKeyDown(e, 2)} value={values[2]}
                       ref={input3}
                       onChange={(e) => handleChangeInput(e, 2, 5)}
                />
                <input  disabled={disabled} className={classes?.number} onFocus={onFocus} type={"tel"} onKeyUp={(e) => handleKeyDown(e, 3)} value={values[3]}
                       ref={input4}
                       onChange={(e) => handleChangeInput(e, 3, 9)}
                />
            </div>
        </div>
    );
};

export default InputTime;
