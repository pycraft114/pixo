import {CustomText} from "../../interface/interface";
import React, {useEffect, useRef, useState} from 'react';
import styles from './text.module.css';

const BUFFER = 5;

export function Text(props: CustomText) {
    const {onChange, text, elementKey, degree = 0, x = 0, y = 0} = props;
    const [bbox, setBbox] = useState<any>({x: 0, y: 0, width: 0, height: 0});
    const textTagRef = useRef<any>(null);

    useEffect(() => {
        if (textTagRef) {
            setBbox(textTagRef.current!.getBBox());
        }
    }, [textTagRef, text]);

    const selectedView = () => {
        if (bbox && props.selected) {
            const {x, y, width, height} = bbox;
            return (
                <g>
                    <rect className={styles.selectedBox} x={x} y={y} width={width} height={height}/>
                    <circle r="4"
                            transform={`translate(${width + BUFFER} ${BUFFER})`}
                            strokeWidth={2}
                            fill="#ff8b3d"
                            stroke="#ffffff"/>
                </g>
            )
        }
    }

    const getCenter = () => {
        if (!bbox) {
            return {
                x: 0,
                y: 0
            }
        } else {
            const {x, y, width, height} = bbox;
            return {
                x: x + width / 2,
                y: y + height / 2
            };
        }
    }

    const onTextEdit = (evt: any) => {
        onChange({key: elementKey, text: evt.target.value});
    }

    const onSelect = () => {
        onChange({key: elementKey, selected: true})
    }

    const getTspan = (text: string) => {
        return text.split('\n').map((_text, idx) => {
            return (<tspan x={0} dy='1.2em' key={idx}>{_text}</tspan>)
        })
    }

    return (
        <g transform={`translate(${x} ${y}) rotate(${degree} ${getCenter().x} 0)`}
           onMouseDown={onSelect}>
            <text className={styles.text} ref={textTagRef} fontStyle="Amiri">
                {getTspan(text)}
            </text>
            <foreignObject width={bbox.width} height={bbox.height}>
                    <textarea className={styles.textArea}
                              value={text}
                              onChange={onTextEdit}/>
            </foreignObject>
            {selectedView()}
        </g>
    )
}
