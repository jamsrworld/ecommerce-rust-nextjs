import { Link } from "@jamsr-ui/react";
import NextLink from "next/link";

type Props = {
  width?: number;
  height?: number;
  href?: string;
  color?: string;
  isMini?: boolean;
  className?: string;
};

const APP_NAME = "Mcart";

export const AppLogo = (props: Props) => {
  const {
    href = "/",
    width = 200,
    height = 40,
    color = "#0072f5",
    isMini,
    className,
  } = props;
  return (
    <Link className={className} as={NextLink} href={href}>
      <span className="sr-only">{APP_NAME}</span>
      <svg width={width} height={height} viewBox="0 0 370 70">
        <g
          transform="matrix(20.8768253326416,0,0,20.8768253326416,-17.202504397553326,-17.18162784063315)"
          fill={color}
        >
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M3.726,1.855C3.44,2.127,3.042,2.237,2.661,2.292c-0.34,0.05-0.695,0.071-0.999,0.203C1.344,2.634,1.144,2.864,1.16,3.22   c0.01,0.214,0.125,0.423,0.287,0.584C1.492,3.84,1.538,3.874,1.586,3.905C1.583,3.899,1.58,3.892,1.575,3.886   C1.382,3.621,1.232,2.862,2.242,2.697C2.445,2.664,2.648,2.63,2.85,2.584c0.178-0.041,0.496-0.141,0.531-0.16   c0.029-0.017-0.189,0.228-0.857,0.42C1.463,3.149,1.789,4.03,2.113,4.131C2.237,4.161,2.367,4.176,2.5,4.176   c0.926,0,1.677-0.75,1.677-1.676c0-0.333-0.097-0.643-0.264-0.903C3.868,1.695,3.805,1.779,3.726,1.855z" />
            <path d="M0.824,2.5c0,0.184,0.03,0.359,0.084,0.525c0.02-0.182,0.082-0.354,0.198-0.5c0.21-0.267,0.536-0.392,0.875-0.459   C2.319,2,2.679,1.992,3.026,1.908c0.192-0.046,0.387-0.121,0.542-0.244C3.697,1.56,3.757,1.402,3.623,1.255   C3.574,1.211,3.522,1.169,3.468,1.131c0.098,0.201,0.022,0.5-0.773,0.578C2.491,1.73,2.288,1.749,2.087,1.777   C2.028,1.785,1.955,1.796,1.88,1.809c0,0,0.066-0.082,0.532-0.188c0.958-0.216,0.779-0.633,0.495-0.748   c-0.13-0.032-0.267-0.05-0.407-0.05C1.574,0.824,0.824,1.574,0.824,2.5z" />
          </g>
        </g>
        {!isMini && (
          <g
            transform="matrix(2.3529410362243652,0,0,2.3529410362243652,92.11764630597243,1.1294127309197979)"
            fill={color}
          >
            <path d="M4.43 7.369999999999999 q-0.49 0.47 -1.17 0.47 t-1.18 -0.48 t-0.5 -1.14 t0.5 -1.13 t1.18 -0.47 t1.17 0.47 t0.49 1.13 q0 0.68 -0.49 1.15 z M4.78 19.9 q0 2.28 -1.1 3.23 t-3.26 0.95 q-0.52 0 -1.32 -0.2 l0.16 -2.54 q0.56 0.2 1.12 0.2 q0.64 0 0.95 -0.24 t0.38 -0.57 t0.07 -0.83 l0 -10.88 l3 0 l0 10.88 z M16.1 18.9 q-0.38 0.52 -1.31 0.93 t-2.03 0.41 q-1.7 0 -2.95 -0.76 t-1.91 -2.07 t-0.66 -2.91 t0.66 -2.91 t1.91 -2.07 t2.95 -0.76 q1.14 0 2.01 0.39 t1.33 0.99 l0 -1.14 l2.96 0 l0 11 l-2.96 0 l0 -1.1 z M15.399999999999999 12.25 q-0.82 -0.87 -2.2 -0.87 q-1.4 0 -2.21 0.87 t-0.81 2.25 q0 1.34 0.83 2.22 t2.19 0.88 q1.4 0 2.21 -0.83 t0.81 -2.27 q0 -1.38 -0.82 -2.25 z M38.43 10.04 q1.13 1.24 1.13 3.46 l0 6.5 l-3.02 0 l0 -6.5 q0 -1.18 -0.59 -1.7 t-1.55 -0.52 q-0.8 0 -1.44 0.6 t-0.66 2 l0 6.12 l-3.02 0 l0 -6.5 q0 -1.18 -0.59 -1.7 t-1.53 -0.52 q-0.86 0 -1.49 0.64 t-0.63 2.26 l-0.02 5.82 l-2.98 0 l0 -11 l2.98 0 l0 1 q0.58 -0.52 1.4 -0.86 t1.5 -0.34 q2.32 0 3.54 1.5 q0.62 -0.7 1.54 -1.1 t2 -0.4 q2.3 0 3.43 1.24 z M42.04 18.54 l1.56 -2.08 q0.72 0.5 1.68 0.84 t1.88 0.34 q0.68 0 1.13 -0.28 t0.45 -0.7 t-0.51 -0.59 t-0.99 -0.24 t-0.62 -0.09 q-1.2 -0.2 -2.07 -0.48 t-1.58 -1 t-0.71 -1.98 q0 -2.08 1.51 -2.78 t3.03 -0.7 q1.3 0 2.4 0.38 t2.18 1.2 l-1.56 2.04 q-0.78 -0.46 -1.54 -0.74 t-1.58 -0.28 q-0.5 0 -0.97 0.22 t-0.47 0.6 q0 0.48 0.65 0.68 t1.43 0.3 q1.4 0.24 2.24 0.5 t1.49 0.97 t0.65 2.01 q0 1.72 -1.18 2.65 t-3.34 0.93 q-3 0 -5.16 -1.72 z M59.339999999999996 11.87 q-0.86 0.21 -1.58 0.99 t-0.72 2.28 l0 4.86 l-2.98 0 l0 -11 l2.98 0 l0 1.46 q0.74 -0.98 1.81 -1.33 t1.95 -0.33 l0 2.92 q-0.6 -0.06 -1.46 0.15 z M61.760000000000005 9.04 l3.18 0 l1.84 4.88 l2.66 -5.48 l2.7 5.5 l1.9 -4.9 l3.16 0 l-4.72 11.42 l-3.04 -5.84 l-3 5.84 z M81.01 19.49 q-1.37 -0.77 -2.17 -2.09 t-0.8 -2.88 q0 -1.54 0.8 -2.86 t2.17 -2.09 t2.99 -0.77 t3 0.77 t2.19 2.09 t0.81 2.86 q0 1.56 -0.81 2.88 t-2.19 2.09 t-3 0.77 t-2.99 -0.77 z M82.48 11.83 q-0.7 0.41 -1.1 1.12 t-0.4 1.57 q0 0.9 0.39 1.61 t1.08 1.12 t1.55 0.41 q0.84 0 1.53 -0.41 t1.09 -1.13 t0.4 -1.6 q0 -0.86 -0.4 -1.57 t-1.09 -1.12 t-1.53 -0.41 q-0.82 0 -1.52 0.41 z M97.68 11.87 q-0.86 0.21 -1.58 0.99 t-0.72 2.28 l0 4.86 l-2.98 0 l0 -11 l2.98 0 l0 1.46 q0.74 -0.98 1.81 -1.33 t1.95 -0.33 l0 2.92 q-0.6 -0.06 -1.46 0.15 z M100.94000000000001 4.880000000000001 l3 0 l0 15.12 l-3 0 l0 -15.12 z M115.14 18.9 q-0.38 0.52 -1.31 0.93 t-2.03 0.41 q-1.7 0 -2.95 -0.76 t-1.91 -2.07 t-0.66 -2.91 t0.66 -2.91 t1.91 -2.07 t2.95 -0.76 q1.14 0 2.01 0.39 t1.33 0.99 l0 -5.26 l2.96 0 l0 15.12 l-2.96 0 l0 -1.1 z M114.44 12.25 q-0.82 -0.87 -2.2 -0.87 q-1.4 0 -2.21 0.87 t-0.81 2.25 q0 1.34 0.83 2.22 t2.19 0.88 q1.4 0 2.21 -0.83 t0.81 -2.27 q0 -1.38 -0.82 -2.25 z" />
          </g>
        )}
      </svg>
    </Link>
  );
};
