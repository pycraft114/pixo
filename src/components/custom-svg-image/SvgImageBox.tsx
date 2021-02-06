import {Bbox, CustomImage} from "../../interface/interface";
import React, {useEffect, useRef, useState} from 'react';
import styles from "./SvgImageBox.module.css";
import {uploadFile} from "../../util/utils";
import {SvgBase} from "../custom-svg-element/SvgBase";


export function SvgImageBox(props: CustomImage) {
    const [image, setImage] = useState<string>('');
    const [bbox, setBbox] = useState<Bbox>({x: 0, y: 0, width: 0, height: 0});
    const imageWrapper = useRef<any>(null);

    useEffect(() => {
        if (imageWrapper) {
            const {clientWidth: width, clientHeight: height} = imageWrapper.current;
            console.dir(imageWrapper.current);
            setBbox({x: props.x, y: props.y, width, height});
        }
    }, [imageWrapper]);
    const onChange = (evt: any) => {
        uploadFile(evt).then(res => setImage(res))
    }
    return (
        <SvgBase {...props} bbox={bbox}>
            <foreignObject className={styles.foreignObject}>
                <div className={`${styles.background} ${props.className}`} ref={imageWrapper}>
                    {!!image ? <img src={image}
                                    style={{
                                        transform: `rotate(${props.degree}deg)`
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
        </SvgBase>
    )
}
