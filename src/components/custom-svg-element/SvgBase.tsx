import {Bbox, ChangeType, CustomSvgElement} from "../../interface/interface";
import React, {ReactNode} from 'react';
import styles from "../custom-svg-text/SvgText.module.css";

interface CustomElementParam extends CustomSvgElement {
    children: ReactNode;
    bbox: Bbox;
}

export function SvgBase(props: CustomElementParam) {
    const {bbox, selected, onChange, onSelect, elementKey, degree = 0, x = 0, y = 0} = props;

    const onMouseDown = () => {
        onChange({type: ChangeType.select, elementKey, selected: true});
        onSelect({elementKey, bbox});
    }

    const selectedView = () => {
        if (bbox && selected) {
            const {width, height} = bbox;
            const rotaterX = width / 2;
            return (
                <g>
                    <rect className={styles.selectedBox} width={width} height={height}/>
                    <circle r="6"
                            transform={`translate(${rotaterX})`}
                            strokeWidth={2}
                            fill="#ff8b3d"
                            stroke="#ffffff"/>
                </g>
            )
        }
    }

    return (
        <g transform={`translate(${x} ${y}) rotate(${degree} ${bbox.width / 2} ${bbox.height / 2})`}
           onMouseDown={onMouseDown}>
            {props.children}
            {selectedView()}
        </g>
    )
}
