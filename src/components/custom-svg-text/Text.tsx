import {CustomText} from "../../interface/interface";
import React, {useEffect, useRef, useState} from 'react';
import styles from './text.module.css';
import {CustomElement} from "../custom-svg-element/Element";

const BUFFER = 5;

export function Text(props: CustomText) {
    const [bbox, setBbox] = useState<any>({x: 0, y: 0, width: 0, height: 0});
    const {onChange, text, elementKey} = props;
    const textTagRef = useRef<any>(null);

    useEffect(() => {
        if (textTagRef) {
            setBbox(textTagRef.current!.getBBox());
        }
    }, [textTagRef, text]);

    const onTextEdit = (evt: any) => {
        onChange({key: elementKey, text: evt.target.value});
    }

    const getTspan = (text: string) => {
        return text.split(/\n/g).map((_text, idx) => {
            return (<tspan x={0} dy='1.2em' key={idx}>{_text}</tspan>)
        })
    }

    return (
        <CustomElement {...props} bbox={bbox}>
            <text className={styles.text} ref={textTagRef} fontStyle="Amiri">
                {getTspan(text)}
            </text>
            <foreignObject width={bbox.width} height={bbox.height}>
                    <textarea className={styles.textArea}
                              value={text}
                              onChange={onTextEdit}/>
            </foreignObject>
        </CustomElement>
    )
}
