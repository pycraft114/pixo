import {CustomImage} from "../../interface/interface";
import React, {useEffect, useRef, useState} from 'react';
import styles from "./image.module.css";
import {uploadFile} from "../../util/utils";

export function CustomImageComponent(props: CustomImage) {
    const [image, setImage] = useState<string>('');
    const onChange = (evt: any) => {
        uploadFile(evt).then(res => setImage(res))
    }
    return (
            <div className={`${styles.background} ${props.className}`}>
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
    )
}
