import DatePickerWrapper from "../../../../app/javascript/components/Shared/DatePicker";
import renderer from 'react-test-renderer';

jest.mock('@mui/material/TextField', () => (props) => {
    jest.fn(props);
    return (<mockTextField props={props}>{props.children}</mockTextField>)
})

jest.mock('@mui/x-date-pickers/LocalizationProvider', () =>({
    LocalizationProvider: (props) => {
        jest.fn(props)
        return (<Mock-LocalizationProvider props={props}>{props.children}</Mock-LocalizationProvider>)
    } 
}))

jest.mock('@mui/x-date-pickers/DatePicker', () =>({
    DatePicker: (props) => {
        jest.fn(props)
        return (<Mock-DatePicker props={props}>{props.children}</Mock-DatePicker>)
    } 
}))

const onChange = jest.fn()
test('DatePicker Load Test', ()=>{
    const component = renderer.create(
        <DatePickerWrapper value={''} onChange={onChange} />
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
