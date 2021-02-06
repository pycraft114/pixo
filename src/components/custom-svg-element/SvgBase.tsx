import {Bbox, ChangeType, CustomSvgElement} from "../../interface/interface";
import React, {ReactNode, useRef, useState} from 'react';
import styles from "../custom-svg-text/SvgText.module.css";

interface CustomElementParam extends CustomSvgElement {
    children: ReactNode;
    bbox?: Bbox;
}

const BUFFER = 5;

export function SvgBase(props: CustomElementParam) {
    const {bbox, selected, onChange, elementKey, degree = 0, x = 0, y = 0} = props;
    const onMouseDown = (evt: React.MouseEvent) => {
        console.log('on mousedown', elementKey);
        onChange({type: ChangeType.select, key: elementKey, selected: true});
    }

    const selectedView = () => {
        if (bbox && selected) {
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

    return (
        <g transform={`translate(${x} ${y}) rotate(${degree} ${getCenter().x} 0)`}
           onMouseDown={onMouseDown}>
            {props.children}
            {selectedView()}
        </g>
    )
}
