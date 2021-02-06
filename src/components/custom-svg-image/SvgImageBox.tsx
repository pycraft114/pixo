import { Bbox, CustomImage } from '../../interface/interface';
import React, { useEffect, useRef, useState } from 'react';
import styles from './SvgImageBox.module.css';
import { uploadFile } from '../../util/utils';
import { SvgBase } from '../custom-svg-element/SvgBase';

export function SvgImageBox(props: CustomImage) {
  const [image, setImage] = useState<string>('');
  const [bbox, setBbox] = useState<Bbox>({ x: 0, y: 0, width: 0, height: 0, cx: 0, cy: 0 });
  const [isDragged, setDraggedStatus] = useState<boolean>(false);
  const imageWrapperRef = useRef<any>(null);
  const { width, height, contextImageDegree, x, y } = props;

  useEffect(() => {
    if (imageWrapperRef) {
      const { width, height } = imageWrapperRef.current!.getBBox();
      const cx = x + width / 2;
      const cy = y + height / 2;
      setBbox({ x, y, width, height, cx, cy });
    }
  }, [imageWrapperRef, x, y]);

  const onChange = (evt: any) => {
    uploadFile(evt).then(res => setImage(res))
  }

  const onClick = (evt: any) => {
    isDragged && evt.preventDefault();
    setDraggedStatus(false);
  }

  const onMouseMove = (evt: any) => {
    setDraggedStatus(evt.buttons === 1);
  }

  return (
    <SvgBase {...props} bbox={bbox}>
      <g ref={imageWrapperRef}>
        <foreignObject width={width} height={height} onMouseMove={onMouseMove}>
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
              <label htmlFor={props.className} onClick={onClick}/>
            </div>
          </div>
        </foreignObject>
      </g>
    </SvgBase>
  )
}
