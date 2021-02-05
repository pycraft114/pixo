import React, {useEffect, useState} from 'react';
import styles from './SvgRenderer.module.css';
import {CustomImage, CustomSvgElement, CustomText, Point, SvgType} from "../../interface/interface";
import {Text} from "../custom-svg-text/Text";
import {CustomImageComponent} from "../custom-svg-image/Image";
import {getDegree} from "../../util/utils";

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

const images = [
    {
        type: SvgType.image,
        x: 137,
        y: 160,
        key: 'image2',
        degree: -4,
        width: 172,
        height: 216,
        className: 'background2'
    },
    {
        type: SvgType.image,
        x: 149,
        y: 90,
        key: 'image1',
        degree: 9,
        width: 172,
        height: 216,
        className: 'background1'
    }
] as CustomImage[]

export function SvgRenderer() {
    const [textElements, setTextElements] = useState<CustomText[]>([
        ...texts,
    ]);
    const [selectedElement, setSelectedElement] = useState<CustomSvgElement | null>(null);
    const [mouseDownPosition, setMouseDownPosition] = useState<{ x: number, y: number }>({x: 0, y: 0});
    const [isRotate, setRotateMode] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    const panElement = (evt: React.MouseEvent) => {
        const {x: mouseDownedX, y: mouseDownedY} = mouseDownPosition;
        const {x: prevX, y: prevY} = selectedElement!;
        const movementX = evt.clientX - mouseDownedX;
        const movementY = evt.clientY - mouseDownedY;
        setTextElements(prev => {
            return prev.map((element, idx) => {
                return element.key === selectedElement!.key ?
                    {...element, x: prevX + movementX, y: prevY + movementY} :
                    element;
            });
        });
    }

    const rotateElement = (evt: React.MouseEvent) => {
        const {x: mouseDownedX, y: mouseDownedY} = mouseDownPosition;
        const movementX = evt.clientX - mouseDownedX;
        const movementY = evt.clientY - mouseDownedY;
        // Svg 의 (0,0) Coordinate 은 좌측상단이기 때문
        const degree = getDegree(movementX, movementY);
        setTextElements(prev => {
            return prev.map((element, idx) => {
                return element.key === selectedElement!.key ?
                    {...element, degree: degree - 90} :
                    element;
            });
        });
    }

    const onMouseDown = (evt: React.MouseEvent) => {
        const target = evt.target as HTMLElement;
        const {clientX: x, clientY: y} = evt;
        setMouseDownPosition({x, y});
        setRotateMode(target.tagName === 'circle');
    }

    const onMouseMove = (evt: React.MouseEvent) => {
        const isDragging = evt.buttons === 1 && selectedElement;
        if (isDragging) {
            isRotate ? rotateElement(evt) : panElement(evt);
        }
    }

    const onSelect = (index: number) => {
        setSelectedElement(textElements[index]);
    }

    const getTextComponents = (elements: CustomText[]) => {
        return elements.map(({...rest}, idx) => {
            return <Text {...rest as CustomText} onSelect={onSelect} index={idx}/>
        })
    }

    const getImageComponents = (elements: CustomImage[]) => {
        return elements.map(({...rest}, idx) => {
            return <CustomImageComponent {...rest as CustomImage} onSelect={onSelect} index={idx}/>
        })
    }

    return (
        <div className="svg-renderer-component">
            <svg className={styles.svgContainer}
                 onMouseDown={onMouseDown}
                 onMouseMove={onMouseMove}
            >
                <foreignObject className={styles.foreignObject}>
                    {getImageComponents(images)}
                </foreignObject>
                {getTextComponents(textElements)}
            </svg>
        </div>
    );
}
