import React from 'react';

interface HeaderProps {
  className?: string;
  children?: JSX.Element | string;
}

export function H1({className, children}: HeaderProps): JSX.Element {
  return (
    <h1
      className={`${
        className ?? ''
      } px-4 py-3 font-bold text-3xl lg:text-4xl bg-gradient-to-r from-indigo-700/30 to-70% rounded-xl`}>
      {children}
    </h1>
  );
}

export function H2({className, children}: HeaderProps): JSX.Element {
  return (
    <h2
      className={`${
        className ?? ''
      } px-4 py-2 font-bold text-2xl lg:text-3xl bg-gradient-to-r from-indigo-700/30 to-60% rounded-xl`}>
      {children}
    </h2>
  );
}

export function H3({className, children}: HeaderProps): JSX.Element {
  return (
    <h3
      className={`${
        className ?? ''
      } px-4 py-2 font-bold text-xl lg:text-2xl bg-gradient-to-r from-indigo-700/30 to-50% rounded-xl`}>
      {children}
    </h3>
  );
}

export function H4({className, children}: HeaderProps): JSX.Element {
  return (
    <h4
      className={`${
        className ?? ''
      } px-4 py-2 font-bold text-lg bg-gradient-to-r from-indigo-700/30 to-40% rounded-xl`}>
      {children}
    </h4>
  );
}

export function H5({className, children}: HeaderProps): JSX.Element {
  return (
    <h5
      className={`${
        className ?? ''
      } px-4 py-2 font-bold text-md bg-gradient-to-r from-indigo-700/30 to-30% rounded-xl`}>
      {children}
    </h5>
  );
}
