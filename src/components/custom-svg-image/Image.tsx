import {CustomImage, CustomText} from "../../interface/interface";
import React from 'react';

export function Image(props: CustomImage) {
    const {url, backgroundUrl} = props;

    return (
        <svg>
            <img src={url}></img>
            <image href={backgroundUrl}></image>
        </svg>
    )
}
