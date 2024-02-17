# react-spring

마운트 시점에 애니메이션을 트리거하는 형태(1)와 프로그래밍적으로 제어할 수 있는 형태(2)가 있다.

```
// 마운트 시점에 위임하기
const spring = useSpring(() => ({
  from: {
    // 아쉬운 점으로 from / to 속성은 object 타입이어서 CSS 속성들의 힌트가 제공되지 않는다.
    // https://react-spring.dev/docs/components/use-spring#reference
    opacity: 0
  },
  to: {
    opacity: 1
  }
}))


// framer-motion 의 motion.div 용법처럼 네이티브 요소들을 HOC로 감싼 animated 컴포넌트를 사용한다.
<animated.button style={spring}>버튼</animated.button>
```

```
// 프로그래밍적으로 제어하기
const [spring, api] = useSpring(() => ({
  from: {
    // 아쉬운 점으로 from / to 속성은 object 타입이어서 CSS 속성들의 힌트가 제공되지 않는다.
    // https://react-spring.dev/docs/components/use-spring#reference
    opacity: 0
  },
  to: {
    opacity: 1
  }
}))

const click = () => {
  api.start()
}

<animated.button style={spring} onClick={click}>버튼</animated.button>
```

다른 훅들은 이런 역할을 한다.

- `useTransition` : 엘리먼트가 마운트 - 언마운트될 때 애니메이션을 추가한다. (Vue의 `<Transition>` 컴포넌트를 생각하면 된다)
- `useChain` : 둘 이상의 spring, transition들을 차례로 실행할 때 사용한다. (Gsap의 timeline API를 생각하면 된다)
- `useTrail` : 둘 이상에 요소에 stagger 애니메이션을 추가할 때 사용한다.
  - `useTrail` 의 용법이 꽤나 특이했다.

```
import { useTrail, animated } from '@react-spring/web'

export default function MyComponent() {
  // 렌더할 요소의 개수를 미리 지정하면, 각 요소에 딜레이와 스프링이 부여된 배열을 리턴한다.
  const trails = useTrail(2, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <div>
      // stagger 애니메이션
      {trails.map(props => (
        <animated.div style={props}>Hello World</animated.div>
      ))}
    </div>
  )
}
```

## 추가로 해볼 것

- `use-gesture` 와 연계하기 좋을 것 같다는 생각이 들어, 위에서 아래로 스와이프할 수 있는 상단바 UI 등을 만들어보자.
