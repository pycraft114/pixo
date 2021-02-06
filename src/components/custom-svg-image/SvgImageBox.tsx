import {Bbox, CustomImage} from "../../interface/interface";
import React, {useEffect, useRef, useState} from 'react';
import styles from "./SvgImageBox.module.css";
import {uploadFile} from "../../util/utils";
import {SvgBase} from "../custom-svg-element/SvgBase";

export function SvgImageBox(props: CustomImage) {
    const [image, setImage] = useState<string>('');
    const [bbox, setBbox] = useState<Bbox>({x: 0, y: 0, width: 0, height: 0, cx: 0, cy: 0});
    const imageWrapperRef = useRef<any>(null);
    const {width, height, contextImageDegree, x, y} = props;

    useEffect(() => {
        if (imageWrapperRef) {
            const {width, height} = imageWrapperRef.current!.getBBox();
            const cx = x + width / 2;
            const cy = y + height / 2;
            setBbox({x, y, width, height, cx, cy});
        }
    }, [imageWrapperRef]);

    const onChange = (evt: any) => {
        uploadFile(evt).then(res => setImage(res))
    }
    return (
        <SvgBase {...props} bbox={bbox}>
            <g ref={imageWrapperRef}>
                <foreignObject width={width} height={height}>
                    <div className={`${styles.background} ${props.className}`}>
                        {!!image ? <img src={image}
                                        style={{
                                            transform: `rotate(${contextImageDegree}deg)`
                                        }}
                                        width={172}
                                        height={216}/> : null}
                        <div className={styles.fileInput}>
                            <input type="file"
                                   className={styles.file}
                                   id={props.className}
                                   onChange={onChange}/>
                            <label htmlFor={props.className}/>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </SvgBase>
    )
}
