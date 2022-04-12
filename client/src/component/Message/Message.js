import React from 'react';

import './message.scss';

function Message ({message})  {
    return (
        <div>
            <h3 className='context_mess'>
                {message}
            </h3>
        </div>
    );
}

export default Message;
