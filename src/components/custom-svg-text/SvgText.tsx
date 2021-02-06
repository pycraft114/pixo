import { Bbox, CustomText } from '../../interface/interface';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './SvgText.module.css';
import { SvgBase } from '../custom-svg-element/SvgBase';

export function SvgText(props: CustomText) {
  const [bbox, setBbox] = useState<Bbox>({ x: 0, y: 0, width: 0, height: 0, cx: 0, cy: 0 });
  const { onChange, text, elementKey, fontSize, x, y } = props;
  const textTagRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textTagRef) {
        const { width, height } = textTagRef.current!.getBBox();
        const cx = x + width / 2;
        const cy = y + height / 2;
        setBbox({ x, y, width, height, cx, cy });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [textTagRef, text, fontSize, x, y]);

  const onTextEdit = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ elementKey, text: evt.target.value });
  }

  const getTspan = (text: string) => {
    return text.split(/\n/g).map((_text, idx) => {
      return (<tspan fontSize={fontSize} x={0} dy='1.2em' key={idx}>{_text}</tspan>)
    })
  }

  return (
    <SvgBase {...props} bbox={bbox}>
      <text className={styles.text} ref={textTagRef} fontStyle="Amiri">
        {getTspan(text)}
      </text>
      <foreignObject width={bbox.width} height={bbox.height}>
                    <textarea className={styles.textArea}
                              value={text}
                              onChange={onTextEdit}/>
      </foreignObject>
    </SvgBase>
  )
}
