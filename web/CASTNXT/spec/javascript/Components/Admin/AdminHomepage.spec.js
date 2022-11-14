import AdminHomepage from "../../../../app/javascript/components/Admin/AdminHomepage";
import renderer from 'react-test-renderer';
import { propsDefault, ROW_CURATED, ROWDATA_MOCKED } from '../../__mocks__/props.mock';
import axios from 'axios';

const mockTableContainer = jest.fn();
const mockButton = jest.fn();
const mockHeader = jest.fn()
jest.mock('axios');
const originalProperties = global.properties;
const mockedAxios = axios;


jest.mock('.../../../../app/javascript/components/Navbar/Header.js', () => (props) =>{
    mockHeader(props);
    return (<mock-header props={props}> props.children</mock-header>)
})
jest.mock('@mui/material/Paper')
jest.mock('@mui/material/TableContainer', ()=>(props)=>{
    mockTableContainer(props);
    return (<mock-TableContainer props={props}>{props.children}</mock-TableContainer>);
})

jest.mock('.../../../../app/javascript/components/Navbar/Header.js')
jest.mock('@mui/material/Button', ()=>(props)=>{
    mockButton(props);
    return (<mock-Button props={props}>{props.children}</mock-Button>);
})

beforeEach(() =>{
    global.properties = propsDefault.properties;
})

afterEach(() => {
    global.properties = originalProperties;
});

test('AdminHomepage Load test', ()=>{
    const component = renderer.create(
        <AdminHomepage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('AdminHomepage Load test: DELETED event', ()=>{
    const component = renderer.create(
        <AdminHomepage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

