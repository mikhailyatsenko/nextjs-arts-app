import '@testing-library/jest-dom';
import 'whatwg-fetch';
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
