import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const ReferralsForm = ({onChange, errors, referral, onSubmit}) => {
    return (
        <form action="/" onSubmit={onSubmit}>
            <span style={{margin:'0 1vw 0 170px', fontSize: '14px'}}>SEND A REFERRAL:</span>
            <TextField
                floatingLabelText="Email address"
                errorText={errors.message}
                onChange={onChange}
                value={referral}
            />
            <span className="button-line">
                <RaisedButton type="submit" label="Submit" primary />
            </span>
        </ form>
    )
} 

export default ReferralsForm;