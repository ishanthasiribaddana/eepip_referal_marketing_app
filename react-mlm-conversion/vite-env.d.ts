interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SSO_BASE_URL: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// CSS module declarations
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// React DOM client types (if @types/react-dom is not sufficient)
declare module 'react-dom/client' {
  export * from 'react-dom';
  export const createRoot: (container: Element | DocumentFragment) => import('react-dom/client').Root;
  export const hydrateRoot: (container: Element | DocumentFragment, initialChildren: import('react').ReactNode) => import('react-dom/client').Root;
}
