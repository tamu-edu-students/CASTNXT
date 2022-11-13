import AdminCreateWithFilter from "../../../../app/javascript/components/Admin/AdminCreateWithFilter";
import renderer from 'react-test-renderer';
import { propsDefault, ROW_CURATED, ROWDATA_MOCKED } from '../../__mocks__/props.mock';


jest.mock('@rjsf/core')
const mockUserTableComponent = jest.fn();
const mockAdminCreateStack = jest.fn();
jest.mock("../../../../app/javascript/components/Admin/AdminUserTable", ()=>(props)=>{
    mockUserTableComponent(props);
    return <mock-AdminUserTable props={props}/>;
})

jest.mock("../../../../app/javascript/components/Admin/AdminCreateStack", ()=>(props)=>{
    mockAdminCreateStack(props);
    return <mock-AdminCreateStack props={props}/>;
})

test('Admin Create With Filter Load', ()=>{
    const component = renderer.create(
        <AdminCreateWithFilter properties={propsDefault.properties} />
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Admin Create on Row Click', ()=>{
    const component = renderer.create(
        <AdminCreateWithFilter properties={propsDefault.properties} />
    )

    let tree = component.toJSON();
    renderer.act(() => {
        tree[1].props.props.handleRowClick(ROWDATA_MOCKED);
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})


test('Admin Create With Row Curation', ()=>{
    const component = renderer.create(
        <AdminCreateWithFilter properties={propsDefault.properties} />
    )
    let tree = component.toJSON();
    renderer.act(() => {
        tree[2].props.props.onCurate(ROW_CURATED);
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})