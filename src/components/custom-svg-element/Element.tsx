import {CustomSvgElement} from "../../interface/interface";
import React, {useRef, useState} from 'react';

interface CustomElementParam extends CustomSvgElement {
    children: any;
}

const CIRCLE_BUFFER = 5;

export function CustomElement(props: CustomElementParam) {
    return null;
    // const {selected, onSelect, index, degree = 0, x = 0, y = 0} = props;
    // const gTagRef = useRef<SVGGElement>(null);
    //
    // const onMouseDown = (evt: React.MouseEvent) => {
    //     onSelect(index);
    // }
    //
    // const selectedView = (selected: boolean) => {
    //     if (/*selected &&*/ gTagRef.current) {
    //         const {width} = gTagRef.current!.getBBox();
    //         return (
    //             <circle r="4"
    //                     transform={`translate(${width + CIRCLE_BUFFER} ${CIRCLE_BUFFER})`}
    //                     strokeWidth={2}
    //                     fill="#ff8b3d"
    //                     stroke="#ffffff"/>
    //         )
    //     }
    // }
    //
    // const getCenter = () => {
    //     console.log('get center', gTagRef);
    //     if(!gTagRef){
    //         return {
    //             x: 0,
    //             y: 0
    //         }
    //     }else{
    //         const gElement = gTagRef!.current as SVGGElement;
    //         const {width, height} = gElement.getBBox();
    //         return {
    //             x: width / 2,
    //             y: height / 2
    //         };
    //     }
    // }
    //
    // return (
    //     <g transform={`translate(${x} ${y}) rotate(${degree} ${getCenter().x} ${getCenter().y})`}
    //        onMouseDown={onMouseDown}>
    //         <g ref={gTagRef}>
    //             {props.children}
    //         </g>
    //         {selectedView(selected)}
    //     </g>
    // )
}
