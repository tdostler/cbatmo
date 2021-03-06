import React from 'react';
import { Alignment, Button, ButtonGroup, Colors } from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import ModuleLayout from "../layouts/ModuleLayout";
import { INetatmoNAModule4 } from "../models/NetatmoNAModule4";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";
import {Orientation} from "../store/application/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule4|undefined
    device_id: string|undefined
    selected_timelapse: '12h'|'1d'|'1m'
    temperature_ratio: string
    temperature_unit: string
    orientation: Orientation
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch extends WithTranslation {
    [key: string]: any
    fetchMeasure: typeof netatmoActions.fetchMeasure
    temperature_ratio: string
    t: i18next.TFunction
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

/** Outdoor module */
const NetatmoModuleIndoor: React.FunctionComponent<AllProps> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            last_seen={props.module_data?.last_seen}
            vertical_divider={props.orientation === 'landscape'}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="temperature" onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Temperature'], props.selected_timelapse)}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>{props.t('netatmo.temperature')}</div>
                        {props.module_data?.data?.temperature}<small>°{props.temperature_unit}</small>
                    </div>
                    <div className="humidity" onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Humidity'], props.selected_timelapse)}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.t('netatmo.humidity')}</div>
                        {props.module_data?.data?.humidity}<small>%</small>
                    </div>
                </div>
                <div className="row">
                    <div className="co2" onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['CO2'], props.selected_timelapse)}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>co2</div>
                        {props.module_data?.data?.co2}<small>ppm</small>
                    </div>

                </div>
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(NetatmoModuleIndoor)
