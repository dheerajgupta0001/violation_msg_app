// https://react-bootstrap.github.io/components/modal/
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { useViolMsgAppReducer } from '../reducers/violMsgAppReducer';
import pageInitState from '../initial_states/violMsgAppInitState'
import { IUtilPnt } from '../typeDefs/utilPnt';
import { getViolationRowsAction } from '../actions/getViolationRowsAction';

function ViolMsgApp() {
    let [pageState, pageStateDispatch] = useViolMsgAppReducer(pageInitState);

    let [selConsList, setSelConsList] = useState([] as IUtilPnt[]);
    const onSelConsChange = (selectedOptions: IUtilPnt[]) => {
        setSelConsList(selectedOptions);
    }

    let [selGensList, setSelGensList] = useState([] as IUtilPnt[]);
    const onSelGensChange = (selectedOptions: IUtilPnt[]) => {
        setSelGensList(selectedOptions);
    }

    const onConsViolRowsUpdateClick = () => {
        pageStateDispatch(getViolationRowsAction(selConsList))
    }
    const onGensViolRowsUpdateClick = () => {
        pageStateDispatch(getViolationRowsAction(selGensList))
    }

    return (
        <>
            <h1>Violation Message Application</h1>
            <br />
            {/* <h3>Select Constituents</h3> */}
            <div>
                <Select options={pageState.ui.constituents}
                    isMulti
                    className="basic-multi-select"
                    closeMenuOnSelect={false}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.name}
                    onChange={onSelConsChange}
                    placeholder="Select Constituents"
                    classNamePrefix="select" />
                <button onClick={onConsViolRowsUpdateClick}>Update</button>
            </div>
            <br />
            {/* <h3>Select Generators</h3> */}
            <div>
                <Select options={pageState.ui.generators}
                    isMulti
                    className="basic-multi-select"
                    closeMenuOnSelect={false}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.name}
                    placeholder="Select Generators"
                    onChange={onSelGensChange}
                    classNamePrefix="select" />
                <button onClick={onGensViolRowsUpdateClick}>Update</button>
            </div>

            <pre>{JSON.stringify(pageState.ui.violInfoRows, null, 2)}</pre>
            {/* <pre>{JSON.stringify(pageState, null, 2)}</pre> */}
        </>
    );
}
export default ViolMsgApp;