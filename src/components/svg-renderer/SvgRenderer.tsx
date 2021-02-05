import React, {useState} from 'react';
import styles from './SvgRenderer.module.css';
import {CustomSvgElement, CustomText, SvgType} from "../../interface/interface";
import {Text} from "../custom-svg-text/Text";
import {CustomElement} from "../custom-svg-element/Element";

const texts = [
    {
        texts: ['2020'],
        type: SvgType.text,
        x: 149,
        y: 90,
        key: 'year'
    },
    {
        texts: ['Summer'],
        type: SvgType.text,
        x: 137,
        y: 160,
        key: 'summer'
    }

] as CustomText[];

export function SvgRenderer() {
    const [elements, setElements] = useState<CustomSvgElement[]>([
        ...texts
    ]);
    const [selectedElement, setSelectedElement] = useState<CustomSvgElement | null>(null);

    const onDrag = (index: number, x: number, y: number) => {
        setElements(prev => {
            return prev.map((element, idx) => {
                return idx === index ?
                    {...element, x, y} :
                    element;
            });
        })
        // elements[index] = {...elements[index], x, y};
    }

    const onSelect = (index: number) => {
        setSelectedElement(elements[index]);
        // setElements(prev => {
        //     return prev.map((element, idx) => {
        //         return {...element, selected: idx === index};
        //     });
        // })
    }

    const getCustomSvgElements = (elements: CustomSvgElement[]) => {
        return elements.map(({...rest}, idx) => {
            switch (rest.type) {
                // case SvgType.image:
                //     return;
                case SvgType.text:
                    return <CustomElement {...rest} onDrag={onDrag} onSelect={onSelect} index={idx}>
                        <Text {...rest as CustomText}/>
                    </CustomElement>

            }
        })
    }

    return (
        <div className="svg-renderer-component">
            <svg className={styles.svgContainer}>
                {getCustomSvgElements(elements)}
            </svg>
        </div>
    );
}
