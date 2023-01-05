import {
  createRef,
  CSSProperties,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type tagSphereProps = {
  texts: (string | ReactNode)[];
  radius?: number;
  maxSpeed: number;

  initialSpeed: number;
  initialDirection: 135;
  keepRollingAfterMouseOut: boolean;
  className?: string;
  style?: CSSProperties;
  useContainerInlineStyles: boolean;
  fullWidth: boolean;
  fullHeight: boolean;
};

interface IItem {
  x: number;
  y: number;
  z: number;
  el: HTMLSpanElement;
  ref: MutableRefObject<null>;
}
const defaultStyles = {
  getContainer: (radius: number, fullWidth: boolean, fullHeight: boolean) =>
    ({
      position: "relative",
      width: fullWidth ? "100%" : `${2 * radius}px`,
      maxWidth: "100%",
      minHeight: `${2 * radius}px`,
      height: fullHeight ? "100%" : `${2 * radius}px`,
      touchAction: "none",
    } as CSSProperties),
};

const computeInitialPosition = (
  index: number,
  textsLength: number,
  size: number
) => {
  const phi = Math.acos(-1 + (2 * index + 1) / textsLength);
  const theta = Math.sqrt((textsLength + 1) * Math.PI) * phi;
  return {
    x: (size * Math.cos(theta) * Math.sin(phi)) / 2,
    y: (size * Math.sin(theta) * Math.sin(phi)) / 2,
    z: (size * Math.cos(phi)) / 2,
  };
};

const updateItemPosition = (item: any, sc: number[], depth: number) => {
  if (!sc[1] || !sc[0] || !sc[2] || !sc[3]) return item;
  const newItem = { ...item, scale: "" };
  const rx1 = item.x;
  const ry1 = item.y * sc[1] + item.z * -sc[0];
  const rz1 = item.y * sc[0] + item.z * sc[1];
  const rx2 = rx1 * sc[3] + rz1 * sc[2];
  const ry2 = ry1;
  const rz2 = rz1 * sc[3] - rx1 * sc[2];

  const per = (2 * depth) / (2 * depth + rz2); // todo
  newItem.x = rx2;
  newItem.y = ry2;
  newItem.z = rz2;

  if (newItem.x === item.x && newItem.y === item.y && newItem.z === item.z) {
    return item;
  }

  newItem.scale = per.toFixed(3);
  let alpha: number = per * per - 0.25;
  alpha = parseFloat((alpha > 1 ? 1 : alpha).toFixed(3));

  const itemEl = newItem.ref.current;

  const left = (newItem.x - itemEl.offsetWidth / 2).toFixed(2);

  const top = (newItem.y - itemEl.offsetHeight / 2).toFixed(2);
  const transform = `translate3d(${left}px, ${top}px, 0) scale(${newItem.scale})`;

  itemEl.style.WebkitTransform = transform;

  itemEl.style.MozTransform = transform;

  itemEl.style.OTransform = transform;

  itemEl.style.transform = transform;

  itemEl.style.filter = `grayscale(${(alpha - 1) * -8}) blur(${
    (alpha - 1) * -5 > 1 ? Math.floor((alpha - 1) * -8) : 0
  }px)`;
  itemEl.style.zIndex = Math.floor(alpha * 1000);
  itemEl.style.opacity = alpha;

  return newItem;
};

const createItem = (
  text: string | ReactNode,
  index: number,
  textsLength: number,
  size: number,
  itemRef: any
) => {
  const transformOrigin = "50% 50%";
  const transform = "translate3d(-50%, -50%, 0) scale(1)";
  const itemStyles = {
    willChange: "transform, opacity, filter",
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: index + 1,
    filter: "alpha(opacity=0)",
    opacity: 0,
    WebkitTransformOrigin: transformOrigin,
    MozTransformOrigin: transformOrigin,
    OTransformOrigin: transformOrigin,
    transformOrigin: transformOrigin,
    WebkitTransform: transform,
    MozTransform: transform,
    OTransform: transform,
    transform: transform,
  } as CSSProperties;
  const itemEl = (
    <span ref={itemRef} key={index} style={itemStyles}>
      {text}
    </span>
  );

  return {
    ref: itemRef,
    el: itemEl,
    ...computeInitialPosition(index, textsLength, size),
  };
};

let defaultState: tagSphereProps = {
  texts: [],
  maxSpeed: 7,
  initialSpeed: 20,
  initialDirection: 135,
  keepRollingAfterMouseOut: true,
  useContainerInlineStyles: true,
  fullWidth: false,
  fullHeight: false,
};

(async () => {
  const tagSphereData = await fetch(`/api/staticSkill`).then((res) =>
    res.json()
  );

  // `http://localhost:1337/api/skills?populate=*`,
  // {
  //   headers: {
  //     Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
  //   },
  // }

  defaultState = {
    ...defaultState,
    texts: tagSphereData.data.map((item: any) => (
      <img
        key={item.id}
        className="tag-sphere-image"
        height={
          window.innerWidth > 1440 ? 20 : window.innerWidth > 1020 ? 15 : 12
        }
        width={
          window.innerWidth > 1440 ? 75 : window.innerWidth > 1020 ? 50 : 40
        }
        src={item.image}
        alt={item.alt}
      />
    )),
  };
})();

const TagSphere = (props: any) => {
  const {
    maxSpeed,
    initialSpeed,
    initialDirection,
    texts,
    keepRollingAfterMouseOut,
    fullHeight,
    fullWidth,
    style,
    useContainerInlineStyles,
  }: tagSphereProps = { ...defaultState, ...props };
  const [screenWidth, setWidth] = useState(window.innerWidth);

  const TEXT_LENGTH_STANDARD = texts.length * 10;
  const sphereSize = {
    small: {
      radius: 7,
      size: 1.25 * TEXT_LENGTH_STANDARD,
    },
    medium: {
      radius: 10,
      size: 1.5 * TEXT_LENGTH_STANDARD,
    },
    large: {
      radius: 14,
      size: 2 * TEXT_LENGTH_STANDARD,
    },
  };

  const [size, setSize] = useState(
    screenWidth > 1440
      ? sphereSize.large.size
      : screenWidth > 1020
      ? sphereSize.medium.size
      : sphereSize.small.size
  );
  const depth = 1.5 * TEXT_LENGTH_STANDARD;

  let radius = props.radius;

  if (!radius) {
    radius =
      texts.length *
      (screenWidth > 1440
        ? sphereSize.large.radius
        : screenWidth > 1020
        ? sphereSize.medium.radius
        : sphereSize.small.radius);
  }

  useEffect(() => {
    const tagSphereItems = document.getElementsByClassName("tag-sphere-image");
    for (const item of tagSphereItems) {
      screenWidth > 1440
        ? (item.setAttribute("height", "20"), item.setAttribute("width", "75"))
        : screenWidth > 1020
        ? (item.setAttribute("height", "15"), item.setAttribute("width", "50"))
        : (item.setAttribute("height", "12"), item.setAttribute("width", "40"));
    }

    setSize(
      screenWidth > 1440
        ? sphereSize.large.size
        : screenWidth > 1020
        ? sphereSize.medium.size
        : sphereSize.small.size
    );
  }, [screenWidth]);

  const itemHooks = texts.map(() => createRef());
  const [items, setItems]: [IItem[], any] = useState([]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setItems(() =>
      texts.map((text, index) =>
        createItem(text, index, texts.length, size, itemHooks[index])
      )
    );
  }, [texts, size]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [firstRender, setFirstRender] = useState(true);
  const [lessSpeed, setLessSpeed] = useState(maxSpeed);
  const [active, setActive] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    setMouseX(() => (e.clientX - (rect.left + rect.width / 2)) / 5);
    setMouseY(() => (e.clientY - (rect.top + rect.height / 2)) / 5);
  };

  const checkTouchCoordinates = (e: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = e.targetTouches[0].clientX;
    const touchY = e.targetTouches[0].clientY;

    if (
      touchX > rect.left &&
      touchX < rect.right &&
      touchY < rect.bottom &&
      touchY > rect.top
    ) {
      return true;
    }

    return false;
  };

  //! I believe this is the problematic function
  const next = () => {
    setItems((items: IItem[]) => {
      if (lessSpeed == 0) return items;

      let a: number, b: number;
      if (!keepRollingAfterMouseOut && !active && !firstRender) {
        setLessSpeed((lessSpeedCurrent) => {
          const lessConstant = lessSpeed * (maxSpeed / 200);

          return lessSpeedCurrent - lessConstant > 0.01
            ? lessSpeedCurrent - lessConstant
            : 0;
        });

        a = -(Math.min(Math.max(-mouseY, -size), size) / radius) * lessSpeed;
        b = (Math.min(Math.max(-mouseX, -size), size) / radius) * lessSpeed;
      } else if (!active && !firstRender && keepRollingAfterMouseOut) {
        a =
          -(Math.min(Math.max(-mouseY, -size), size) / radius) *
          (maxSpeed * 0.5);
        b =
          (Math.min(Math.max(-mouseX, -size), size) / radius) *
          (maxSpeed * 0.5);
      } else {
        a = -(Math.min(Math.max(-mouseY, -size), size) / radius) * maxSpeed;
        b = (Math.min(Math.max(-mouseX, -size), size) / radius) * maxSpeed;
      }

      if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) return items; // pause

      // calculate offset
      const l = Math.PI / 180;
      const sc = [
        Math.sin(a * l),
        Math.cos(a * l),
        Math.sin(b * l),
        Math.cos(b * l),
      ];
      const updatedItems = items.map((item: IItem) => {
        return updateItemPosition(item, sc, depth);
      });
      return updatedItems;
    });
  };

  const init = () => {
    setActive(false);
    const mouseX0 = initialSpeed * Math.sin(initialDirection * (Math.PI / 180));
    const mouseY0 =
      -initialSpeed * Math.cos(initialDirection * (Math.PI / 180));
    setMouseX(() => mouseX0);
    setMouseY(() => mouseY0);
    next();
  };

  useEffect(() => {
    init();
    setItems((items: IItem[]) => [...items]);
  }, []);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(next);
    return () => cancelAnimationFrame(animationFrame);
  }, [mouseX, mouseY, lessSpeed, active, items, props.radius]);

  return (
    <div
      className={props.className}
      ref={containerRef}
      onMouseOver={() => {
        setActive(() => true);
        setFirstRender(() => false);
        setLessSpeed(() => maxSpeed);
      }}
      onMouseOut={() => {
        setActive(() => false);
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={() => {
        setActive(true);
        setLessSpeed(() => maxSpeed);
        setFirstRender(() => false);
      }}
      onTouchMove={(e) => {
        if (checkTouchCoordinates(e)) {
          handleMouseMove(e.targetTouches[0]);
        } else {
          setActive(false);
        }
      }}
      style={
        useContainerInlineStyles
          ? style || defaultStyles.getContainer(radius, fullWidth, fullHeight)
          : undefined
      }
    >
      {items?.map((item: any) => item?.el)}
    </div>
  );
};

export default TagSphere;
