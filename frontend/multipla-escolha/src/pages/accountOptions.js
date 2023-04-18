import React from 'react';
import AccountOptionsComponent from '../components/accountOptionsComponent';

import Navbar from '../components/navbar';

function AccountOptions() {
    return (
        <div>
            <Navbar />
            <div className="d-flex" style={{height: '80vh', minHeight: 700}}>
                <AccountOptionsComponent />
            </div>
        </div>
    );
}
export default AccountOptions;