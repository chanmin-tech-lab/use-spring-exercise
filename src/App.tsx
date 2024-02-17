import styled from "@emotion/styled";
import {
  animated,
  useSpring,
  useSpringRef,
  useTrail,
  useTransition,
} from "@react-spring/web";
import { useEffect, useState } from "react";

const DATA = Array(100)
  .fill(0)
  .map((_, index) => index);

const App = () => {
  const [transformed, setTransformed] = useState(false);
  const springRef = useSpringRef();
  const [items, setItems] = useState([]);

  const trails = useTrail(10, {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const [springs, api] = useSpring(() => ({
    ref: springRef,
    from: {
      // opacity: 0,
      // x: 100,
      // opacity: 0,
      x: transformed ? 100 : 0,
    },
    // delay: 2000,
  }));

  const transition = useTransition(transformed ? DATA : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    setTimeout(() => {
      setItems((e) => {
        return e.length
          ? []
          : [
              { x: 0, y: 0, delay: 100, fig: 1 },
              { x: 0, y: 0, delay: 200, fig: 2 },
              { x: 0, y: 0, delay: 300, fig: 3 },
              { x: 0, y: 0, delay: 400, fig: 4 },
            ];
      });
    }, 2000);
  }, [items]);

  const handleClick = () => {
    setTransformed((transformed) => !transformed);
    api.start({
      from: {
        // opacity: 0,
        x: transformed ? 100 : 0,
      },
      to: {
        // opacity: 1,
        x: transformed ? 0 : 100,
      },
    });
  };

  return (
    <div>
      <Button style={springs} onClick={handleClick}>
        버튼
      </Button>
      {
        <div>
          {transition((style, item) => {
            return <animated.div style={style}>{item}</animated.div>;
          })}
        </div>
      }
      {trails.map((style, index) => (
        <animated.div style={style} key={index}>
          찬민
        </animated.div>
      ))}
    </div>
  );
};

const Button = styled(animated.button)`
  padding: 20px;
  background-color: lightcyan;
`;

export default App;
