## 요구사항
### 구현기능
- [x] 텍스트 수정
- [x] 텍스트 MultiLine 지원
- [x] 텍스트 이동 및 회전
- [x] 이미지 프레임 영역 이미지 파일 업로드
- [x] 이미지 프레임 영역 이동 및 회전

### 주어진 시간내에 구현하지 못한 추가사항
- [ ] 텍스트 Style 변경 UI UX
- [ ] 결과물 SVG 영역 이미지 파일로 Export
- [ ] 로컬 파일을 Drag & Drop 하여 이미지 업로드


## 과제 구현 과정


### Angular와의 차이
React 로 native SVG 를 처음 다뤄봤는데 앵귤러로 제작 했을 때와는 다음과 같은 차이점이 있었습니다.
- 앵귤러는 Virtual DOM 을 사용하지 않고 상태 변화를 렌더링 하기 위해 ChangeDetection 과 Zone 을 사용하며
  직접적인 DOM 조작이 가능하기에 State 의 변경 감지가 필요한 영역과 그렇지 않은 영역을 쉽게 분리가 가능했지만
  리액트의 경우 SVG Element 를 렌더링 하기 위해 다른 컴포넌트와 마찬가지로 React.Component 를 사용했어야 했습니다.
  처음에 접근 한 방식은 다음 이미지와 같이 개별 Element 를 렌더링 하는 컴포넌트에서 개별 State 을 따로 두어 상태 관리를 하도록 했습니다.
  
  ![Image](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/43422c62-3da8-47de-9042-d5f00447a3ea/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210206T100239Z&X-Amz-Expires=86400&X-Amz-Signature=2f18737e0f9d1d690fd2435f80a4c560a076976145911a2debf2dbe70bdd0163&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
  
  하지만 이는 두번의 상태관리를 해야 한다는 것과 무엇보다 리액트의 Immutable State 관리를 위반하기 때문에 
  우선은 리액트의 principle 를 지켜  SVG 를 감싸고있는 컴포넌트에서 State 를 관리 하여 top-down data flow 로 변경하였습니다. 
  리액트의 경우 SVG Element 의 attribute 변경을 위해선 리액트 컴포넌트 의 지속적인 state 변경을 반영 해야 하는건데 이와 관련하여 리서치를 하며 구현 했습니다.
  그 중 [리액트의 공식 문서](https://reactjs.org/docs/reconciliation.html#tradeoffs)에 따르면 list 형식의 컴포넌트 렌더시
  그것의 권장사항(공식 문저 참조)을 지키면 '보통' 의 경우에는 heuristic diff algorithm 이 퍼포먼스에 큰 영향이 없을 것이라 하지만,
  SVG 를 감싸고있는 컴포넌트와 같이, 그것 내에서 지속적이고 반복적으로 interaction 을 요구하고 Large Dataset 을 필요로 하는경우, 
  이에 의존 해도되는지 그리고 더 나은 아키텍쳐는 없는지 좀더 심층적으로 리서치를 해야겠습니다.
  
주어진시간내에 과제를 완료 하기 위해 WebGL 이 아닌 경험이 있는 SVG 기반으로 제작했습니다.

과제 안내서에 'Figma Guide를 참고하여 335 x 596 사이즈의 Editor 화면을 구성' 이라고 되어있었으나 별도의 Figma 링크첨부가 안되어있어 출력물 예시를 기준으로 구현하였습니다.

주어진 시간내에 모든 영역을 SVG 로 만들고 싶었지만 구현하지 못한 기능도 있고 Workaround 도 있습니다.

과제를 하는 과정에서 몰랐던 것도 많이 알게되서 재밌는 과제였습니다.
