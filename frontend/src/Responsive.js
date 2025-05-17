import { css } from 'styled-components';

export const Medium = (props) => {
  return css`
    @media screen and (max-width: 1280px) {
      ${props}
    }
  `;
};

export const TabVertical = (props) => {
  return css`
    @media screen and (max-width: 1199px) {
      ${props}
    }
  `;
};

export const Tablet = (props) => {
  return css`
    @media screen and (max-width: 992px) {
      ${props}
    }
  `;
};

export const Andriod = (props) => {
  return css`
    @media screen and (max-width: 767px) {
      ${props}
    }
  `;
};

export const Windows = (props) => {
  return css`
    @media screen and (max-width: 450px) {
      ${props}
    }
  `;
};

export const Ios = (props) => {
  return css`
    @media screen and (max-width: 340px) {
      ${props}
    }
  `;
};

export const LG = (props) => {
  return css`
    @media screen and (min-width: 1600px) {
      ${props}
    }
  `;
};
