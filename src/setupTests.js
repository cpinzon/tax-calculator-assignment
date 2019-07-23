// This module is needed to be able to use enzyme with Jest for the unit tests
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });