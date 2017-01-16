import React from 'react';
import List, { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import People from 'material-ui/svg-icons/social/people';
import Card from 'material-ui/Card';

const ReferralList = ({referrals}) => {
    console.log(referrals);
    return (
        <Card style={{width:'460px', margin:"3vh 180px"}}>
            <List style={{width:'430px'}}>
                <Subheader>YOUR REFERRALS</Subheader>
                { referrals.map((ref, i) => { 
                    return(<ListItem 
                            key={i}
                            primaryText={ref.email }
                            rightIcon={<People />}
                        />) 
                    }) 
                }
            </List>
        </Card>
    )
}

export default ReferralList;